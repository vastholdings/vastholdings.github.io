'use strict';

var w,h,timestep;
var gameStarted = false;
var colors = [];
var img;
var img2;
var loaded;
var loaded2;
for (let i = 0; i < 18; i++) {
    colors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function drawTitle(ctx) {
    ctx.font = 'italic 30px monospace';
    for (let i = 0; i < 18; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillText('GATHERING OF THE WOLVES', 150 + 2.5 * i, 340 + 2.5 * i);
    }
    colors.shift();
    colors.push('hsl('+(Math.random()*100)+',50%,'+((Math.random()*20)+40)+'%)');
}
function drawBackground(ctx) {
	if(loaded) {
		ctx.drawImage(img,0,0,w,h);
	} else {
		loaded = true;
		img = new Image();   // Create new img element
		img.addEventListener('load', function() {
		}, false);
		img.src = 'img/art.png'; // Set source path
	}
}
function drawWolf(ctx) {
    if(loaded2) {
		ctx.drawImage(img2,150,150);
	} else {
		loaded2 = true;
		img2 = new Image();   // Create new img element
		img2.addEventListener('load', function() {
		}, false);
		img2.src = 'img/wolf.png'; // Set source path
	}
}
function drawStartScreen(ctx) {
    ctx.font = 'italic 30px monospace';
    ctx.fillStyle = 'brown';
    ctx.fillText('>CLICK TO START', 150, 50);
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
        var draw = [drawBackground,drawTitle,drawWolf];
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
