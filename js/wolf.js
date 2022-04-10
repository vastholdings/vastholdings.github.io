'use strict'

var w,
  h,
  timestep = 10
var gameStarted = false
var colors = []
var img
var img2
var img3
img = new Image() // Create new img element
img.addEventListener('load', function () {}, false)
img.src = 'img/art.png' // Set source path
img2 = new Image() // Create new img element
img2.addEventListener('load', function () {}, false)
img2.src = 'img/wolf.png'
img3 = new Image() // Create new img element
img3.addEventListener('load', function () {}, false)
img3.src = 'img/howl.png'
var played = true
var audio = new Audio('mp3/howl.mp3')

var currh = 10
var currs = 50
var currl = 50
var clicks = 0

function newColor() {
  currh += (Math.random() - 0.5) * 100
  currs += (Math.random() - 0.5) * 10
  currl += (Math.random() - 0.5) * 10
  currh = Math.min(Math.max(currh, 0), 50)
  currs = Math.min(Math.max(currs, 50), 80)
  currl = Math.min(Math.max(currl, 40), 50)
  return 'hsl(' + currh + ',' + currs + '%,' + currl + '%)'
}
for (let i = 0; i < 50; i++) {
  var col = newColor()
  colors[i] = col
}
function drawTitle(ctx) {
  ctx.font = 'italic 30px monospace'
  for (let i = 0; i < 50 - Math.random() * 40; i++) {
    ctx.fillStyle = colors[i]
    ctx.fillText('GATHERING OF THE WOLVES', 150 + 1.5 * i, 340 + 1.5 * i)
  }
  colors.shift()
  var col = newColor()
  colors.push(col)
}
function drawBackground(ctx) {
  ctx.drawImage(img, 0, 0, w, h)
}
function drawFinish(ctx) {
  ctx.drawImage(img3, 0, 0, w, h)
  ctx.font = 'italic 60px monospace'
  ctx.fillStyle = 'yellow'
  ctx.fillText('HEAD TO 6420 E FOREST', 30, 70)
  if (played) {
    played = false
    audio.play()
  }
}
function drawWolf(ctx) {
  ctx.drawImage(img2, 150, 150)
  for (var i = 0; i < Math.floor(clicks); i++) {
    ctx.drawImage(
      img2,
      Math.random() * (w + img2.width) - img2.width,
      Math.random() * (h + img2.height) - img2.height,
    )
  }
}
function drawStartScreen(ctx) {
  ctx.font = 'italic 72px monospace'
  ctx.fillStyle = 'green'
  ctx.fillText('>KEEP CLICKING TO', 26, 68)
  ctx.fillText('>GATHER THE WOLVES', 26, 148)
  ctx.fillStyle = 'brown'
  ctx.fillText('>KEEP CLICKING TO', 30, 70)
  ctx.fillText('>GATHER THE WOLVES', 30, 150)
}
document.addEventListener('DOMContentLoaded', function () {
  var gameboard = document.getElementById('gameboard')
  var ctx = gameboard.getContext('2d')
  w = gameboard.width
  h = gameboard.height
  var t = 0

  gameboard.addEventListener(
    'mousedown',
    function () {
      if (!gameStarted) {
        gameStarted = true
      } else {
        clicks++
      }
    },
    false,
  )

  var drawGame = function () {
    var draw = [drawBackground, drawTitle, drawWolf]
    if (gameStarted) {
      if (clicks > 10) {
        draw.push(drawFinish)
      }
    } else {
      draw.push(drawStartScreen)
    }
    draw.forEach(function (elt) {
      ctx.save()
      elt(ctx, t)
      ctx.restore()
    })
  }
  setInterval(function () {
    t += timestep
    drawGame()
  }, timestep)
})
