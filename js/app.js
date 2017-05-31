// Create a game:
var game = (function() {
	// Viewport element & style:
	var viewportEl = qs(".game");
	var cs = getComputedStyle(viewportEl);

	// Grab necessary game elements:
	var playerEl  = qs(".player", viewportEl);
	var scoreEls  = [].slice.call(qsa('.score',  viewportEl));
	var cornEls   = [].slice.call(qsa('.corn',   viewportEl));

	// Get element position:
	function getOffset(el) {
		return {
			top: el.offsetTop,
			left: el.offsetLeft,
			bottom: el.offsetTop + el.offsetHeight,
			right: el.offsetLeft + el.offsetWidth
		};
	}

	// Create game passing initial state
	return new Game({
		score: 0,
		finished: false,
		viewport: {
			width:  parseInt(cs.width,  10),
			height: parseInt(cs.height, 10)
		},

		moveables: {
			player: {
				// Player position and move function:
				pos: getOffset(playerEl),
				move: function(sidePositions) {
					playerEl.style.left = sidePositions.left + 'px';
					playerEl.style.top  = sidePositions.top + 'px';
				},
				moving: false,
				direction: 0, // 0 degrees is right, 90 degrees is up
				pixelsPerSecond: 200 // speed
			}
		},

		// Positions of solids:
		solids: [].map.call(qsa('.solid',  viewportEl), getOffset),

		touchables: {
			corn: {
				positions: cornEls.map(getOffset),
				onTouch: function(pos, i) {
                    alert('CORN MAN AWAKENED');
					this.touchables.corn.positions.splice(i, 1);
					cornEls[i].parentNode.removeChild(cornEls[i]);
					cornEls.splice(i, 1);
				}
			},
			finish: {
				positions: [getOffset(qs(".finish", viewportEl))],
				onTouch: function() {
					if (this.finished) {
                        console.log('here!');
                        return;
                    }
                    console.log('here2!');
                    alert('YOU MADE IT TO THE FINISH:::::: NOW GET TO THE SHOW\n\n6420 E FOREST AVE DETROITTTTTTTTTTT')
					this.setScore('add', 250);
					this.finished = true;
				}
			}
		},

		setScore: function(method, amount) {
			if (method === 'add') this.score += amount;
			else                  this.score -= amount;

			scoreEls.forEach(function(scoreEl) {
				scoreEl.textContent = this.score;
			}, this);
		}
	});
})();
