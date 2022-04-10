// Get elements by CSS selector:
function qs(selector, scope) {
  return (scope || document).querySelector(selector)
}
function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector)
}

function extend(source, destination) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key]
    }
  }
  return destination
}

function createInterval(
  fn,
  delay,
  thisVal /* , argumentToPass1, argumentToPass2, etc. */,
) {
  var argsToPass = Array.prototype.slice.call(arguments, 3),
    id,
    obj = {
      going: false,
      start: function start() {
        if (this.going) return
        repeater()
        this.going = true
      },
      stop: function stop() {
        clearTimeout(id)
        this.going = false
      },
    }
  function repeater() {
    fn.apply(thisVal, argsToPass)
    id = setTimeout(repeater, delay)
  }
  return obj
}

// Create an interval:
//
// var frameRefresher = createInterval(refreshFrame, 100, this);
//
//
// Start it:
//
// frameRefresher.start();
//
//
// Stop it:
//
// frameRefresher.stop();
// Game constructor:
var Game = function (options) {
  // options will override the following defaults if set
  var offset = extend(
    options,
    extend(
      {
        moveables: {
          player: {
            pos: {
              top: 0,
              left: 0,
              bottom: 24,
              right: 24,
            },
          },
        },
        fps: 100,
      },
      this,
    ),
  )

  // start listening to user events
  this.init()

  // Setup interval. Delay controlls frame rate:
  this.frameRefresher = createInterval(
    function () {
      this.movTick()
    },
    1000 / this.fps,
    this,
  )

  this.frameRefresher.start()
}

var keys = {
  left: false,
  right: false,
  up: false,
  down: false,
}
// Update player direction and speed on keypress
Game.prototype.init = (function () {
  // Which keys are pressed:

  var keyCodeMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  }

  function updatePlayerVector() {
    // get new direction
    var deltaX = 0
    var deltaY = 0
    if (keys.up) {
      deltaY -= 1
    }
    if (keys.down) {
      deltaY += 1
    }
    if (keys.left) {
      deltaX -= 1
    }
    if (keys.right) {
      deltaX += 1
    }

    // stop moving if there's no position change
    var player = this.moveables.player
    player.moving = !!(deltaY || deltaX)

    if (player.moving) {
      player.direction = (Math.atan2(deltaY, deltaX) * 180) / Math.PI
    }
  }

  return function () {
    var updateVector = updatePlayerVector.bind(this)
    this.keys = keys

    document.body.addEventListener('keydown', function (event) {
      // update player vector if an arrow key was pressed
      if (
        Object.keys(keyCodeMap).some(function (keyCode) {
          if (event.keyCode === +keyCode) {
            var key = keyCodeMap[keyCode]
            if (keys[key] === true) return
            keys[key] = true
            return true
          }
        })
      )
        updateVector()
    })

    document.body.addEventListener('keyup', function (e) {
      // update player vector if an arrow key was released
      if (
        Object.keys(keyCodeMap).some(function (keyCode) {
          if (event.keyCode === +keyCode) {
            var key = keyCodeMap[keyCode]
            if (keys[key] === false) return
            keys[key] = false
            return true
          }
        })
      )
        updateVector()
    })
    ;['left', 'right', 'up', 'down'].forEach(function (elt) {
      document.getElementById(elt).addEventListener('mouseup', function () {
        keys[elt] = false
        updateVector()
      })
      document.getElementById(elt).addEventListener('mousedown', function () {
        keys[elt] = true
        updateVector()
      })

      document.getElementById(elt).addEventListener('touchcancel', function () {
        keys[elt] = false
        updateVector()
      })

      document.getElementById(elt).addEventListener('touchend', function () {
        keys[elt] = false
        updateVector()
      })

      document.getElementById(elt).addEventListener('touchstart', function () {
        keys[elt] = true
        updateVector()
      })
    })
  }
})()

// Checks if an element is inside its viewport:
Game.prototype.insideGameArea = function (offset) {
  return !(
    offset.left < 0 ||
    offset.top < 0 ||
    offset.right > this.viewport.width ||
    offset.bottom > this.viewport.height
  )
}

// Checks if rectangle a overlaps rectangle b
Game.prototype.overlaps = function (a, b) {
  // no horizontal overlap
  if (a.left >= b.right || b.left >= a.right) return false

  // no vertical overlap
  if (a.top >= b.bottom || b.top >= a.bottom) return false

  return true
}

// Checks if rectangle a touches rectangle b
Game.prototype.touches = function (a, b) {
  // has horizontal gap
  if (a.left > b.right || b.left > a.right) return false

  // has vertical gap
  if (a.top > b.bottom || b.top > a.bottom) return false

  return true
}

Game.prototype.getNewPosition = function (moveable) {
  if (!moveable.moving) return null

  // get player speed in "pixels per frame" by dividing their speed in "pixels per second" by the game fps
  var stepRadius = moveable.pixelsPerSecond / this.fps
  var stepAngle = (moveable.direction / 180) * Math.PI
  var deltaX = stepRadius * Math.cos(stepAngle)
  var deltaY = stepRadius * Math.sin(stepAngle)

  function removeMagnitude(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0
  }

  var xIncrement
  var yIncrement
  var numIterations = 0
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    xIncrement = removeMagnitude(deltaX)
    yIncrement = (xIncrement / deltaX) * deltaY
    numIterations = deltaX / xIncrement
  } else {
    yIncrement = removeMagnitude(deltaY)
    xIncrement = (yIncrement / deltaY) * deltaX
    numIterations = deltaY / yIncrement
  }

  // get farthest valid step within deltaX, deltaY:
  var validStep = moveable.pos
  var stepped = false
  for (var i = 0; i < numIterations; i++) {
    var nextStep = {
      top: validStep.top + yIncrement,
      left: validStep.left + xIncrement,
      bottom: validStep.bottom + yIncrement,
      right: validStep.right + xIncrement,
    }
    if (this.isValidPlayerPosition(nextStep)) {
      validStep = nextStep
      stepped = true
    } else {
      Object.keys(nextStep).forEach(function (key) {
        nextStep[key] = Math.floor(nextStep[key])
      })
      if (this.isValidPlayerPosition(nextStep)) {
        validStep = nextStep
        stepped = true
      }
      break
    }
  }

  return stepped ? validStep : null
}

Game.prototype.isValidPlayerPosition = function (sidePositions) {
  // Ensure move is inside the game area:
  if (!this.insideGameArea(sidePositions)) return false

  // Ensure we're not entering a solid:
  if (
    [].some.call(
      this.solids,
      function (solidPos, i) {
        return this.overlaps(sidePositions, solidPos)
      },
      this,
    )
  )
    return false

  return true
}

// Move one pixel for each direction and check if move is valid.
Game.prototype.movTick = function () {
  // ensure player position changed
  var player = this.moveables.player
  var newPos = this.getNewPosition(player)
  if (!newPos) return

  // Touchable collisions:
  Object.keys(this.touchables).forEach(function (name) {
    var touchable = this.touchables[name]
    var positions = touchable.positions
    for (var i = 0; i < positions.length; i++) {
      if (this.touches(newPos, positions[i])) {
        touchable.onTouch.call(this, positions[i], i)
      }
    }
  }, this)

  // update player position
  player.move.call(this, newPos)
  player.pos = newPos
}
// Create a game:
var game = (function () {
  // Viewport element & style:
  var viewportEl = qs('.game')
  var cs = getComputedStyle(viewportEl)

  // Grab necessary game elements:
  var playerEl = qs('.player', viewportEl)
  var scoreEls = [].slice.call(qsa('.score', viewportEl))
  var cornEls = [].slice.call(qsa('.corn', viewportEl))
  var santaEls = [].slice.call(qsa('.santa', viewportEl))

  // Get element position:
  function getOffset(el) {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      bottom: el.offsetTop + el.offsetHeight,
      right: el.offsetLeft + el.offsetWidth,
    }
  }

  // Create game passing initial state
  return new Game({
    score: 0,
    finished: false,
    viewport: {
      width: parseInt(cs.width, 10),
      height: parseInt(cs.height, 10),
    },

    moveables: {
      player: {
        // Player position and move function:
        pos: getOffset(playerEl),
        move: function (sidePositions) {
          playerEl.style.left = sidePositions.left + 'px'
          playerEl.style.top = sidePositions.top + 'px'
        },
        moving: false,
        direction: 0, // 0 degrees is right, 90 degrees is up
        pixelsPerSecond: 200, // speed
      },
    },

    // Positions of solids:
    solids: [].map.call(qsa('.solid', viewportEl), getOffset),

    touchables: {
      santa: {
        positions: santaEls.map(getOffset),
        onTouch: function (pos, i) {
          keys.left = false
          keys.up = false
          keys.down = false
          keys.right = false
          alert('santa says NO!')
          this.touchables.santa.positions.splice(i, 1)
          santaEls[i].parentNode.removeChild(santaEls[i])
          santaEls.splice(i, 1)
        },
      },
      corn: {
        positions: cornEls.map(getOffset),
        onTouch: function (pos, i) {
          keys.left = false
          keys.up = false
          keys.down = false
          keys.right = false
          alert('CORN MAN AWAKENED')
          this.touchables.corn.positions.splice(i, 1)
          cornEls[i].parentNode.removeChild(cornEls[i])
          cornEls.splice(i, 1)
        },
      },
      finish: {
        positions: [getOffset(qs('.finish', viewportEl))],
        onTouch: function () {
          if (this.finished) {
            return
          }
          alert(
            'YOU MADE IT TO THE FINISH:::::: NOW GET TO THE SHOW\n\n6420 E FOREST AVE DETROITTTTTTTTTTT',
          )
          this.setScore('add', 250)
          this.finished = true
        },
      },
    },

    setScore: function (method, amount) {
      if (method === 'add') this.score += amount
      else this.score -= amount

      scoreEls.forEach(function (scoreEl) {
        scoreEl.textContent = this.score
      }, this)
    },
  })
})()
