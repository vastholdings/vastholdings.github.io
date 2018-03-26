'use strict';

var w,h,timestep=10;
var gameStarted = false;
var colors = [];
var img;
var img2;
var loaded;
var loaded2;

var currh=10;
var currs=50;
var currl=50;
var clicks = 1;

function newColor() {
    currh += (Math.random()-0.5)*100;
    currs += (Math.random()-0.5)*10;
    currl += (Math.random()-0.5)*10;
    currh = Math.min(Math.max(currh,0),50);
    currs = Math.min(Math.max(currs,50),80);
    currl = Math.min(Math.max(currl,40),50);
    return 'hsl('+currh+','+currs+'%,'+currl+'%)';
}
for (let i = 0; i < 30; i++) {
    var col = newColor();
    colors[i] = col;
}
function drawTitle(ctx) {
    ctx.font = 'italic 30px monospace';
    for (let i = 0; i < 30-Math.random()*20; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillText('GATHERING OF THE WOLVES', 150 + 1.5 * i, 340 + 1.5 * i);
    }
    colors.shift();
    var col = newColor();
    colors.push(col);
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
        for(var i = 0; i < Math.floor(clicks); i++) {
            ctx.drawImage(img2,Math.random()*(w+img2.width)-img2.width,Math.random()*(h+img2.height)-img2.height);
        }
	} else {
		loaded2 = true;
		img2 = new Image();   // Create new img element
		img2.addEventListener('load', function() {
		}, false);
		img2.src = 'img/wolf.png'; // Set source path
	}
}
function drawStartScreen(ctx) {
    ctx.font = 'italic 72px monospace';
    ctx.fillStyle = 'brown';
    ctx.fillText('>KEEP CLICKING TO',60,70);
    ctx.fillText('>GATHER THE WOLVES', 60, 150);
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
        } else {
            clicks++;
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
        clicks -= 0.03;
        drawGame();
    }, timestep);
});
