'use strict';

var w,h,timestep;
var gameStarted = false;
var colors = [];
var img;
var loaded;
for (let i = 0; i < 18; i++) {
    colors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function drawTitle(ctx) {
    ctx.font = 'italic 30px monospace';
    for (let i = 0; i < 18; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillText('GATHERING OF THE WOLFS', 150 + 2.5 * i, 340 + 2.5 * i);
    }
    colors.shift();
    colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
}
function drawBackground(ctx) {
	if(loaded) {
		ctx.drawImage(img,0,0,w,h);
	} else {
		loaded = true;
		img = new Image();   // Create new img element
		img.addEventListener('load', function() {
			ctx.drawImage(img,0,0,w,h);
		}, false);
		img.src = 'img/art.png'; // Set source path
	}
}
function drawWolf(ctx) {
    ctx.font = 'italic 30px monospace';
    for (let i = 0; i < 18; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillText('GATHERING OF THE WOLFS', 150 + 2.5 * i, 340 + 2.5 * i);
    }
    colors.shift();
    colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
}
function drawStartScreen(ctx) {
    ctx.font = 'italic 30px monospace';
    ctx.fillStyle = 'green';
    ctx.fillText('>CLICK TO START', 150, 200);
}
document.addEventListener('DOMContentLoaded', function () {
    var gameboard = document.getElementById('gameboard');
    var ctx = gameboard.getContext('2d');
    w = gameboard.width;
    h = gameboard.height;
    var t = 0;

    gameboard.addEventListener('mousedown', function () {
        if (!gameStarted) {
            gameStarted = true;
        }
    }, false);


    var drawGame = function () {
        var draw = [drawWolf, drawTitle,drawBackground];
        if (gameStarted) {
            //draw = draw.concat([]);
        } else {
            draw.push(drawStartScreen);
        }
        draw.forEach(function (elt) {
            ctx.save();
            elt(ctx, t);
            ctx.restore();
        });
        
    };
    setInterval(function () {
        t += timestep;
        drawGame();
    }, timestep);
});
