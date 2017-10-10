'use strict';

var clouds = [];
var clowns = [
    {x: 720, y: 0},
    {x: 1100, y: 0},
    {x: 1500, y: 0},
    {x: 1700, y: 0},
    {x: 1800, y: 0},
    {x: 2000, y: 0}
];
var explosions = [];
var fireballs = [];
var gameStarted = false;

for (let i = 0; i < 10000; i++) {
    clouds[i] = {
        x: 150 * i + 80 * (Math.random() - 0.5),
        y: 20 * Math.floor(10 * Math.random())
    };
}
var w;
var h;
var timestep = 70;
var winFlag = false;
var loseFlag = false;


function drawBackground(ctx) {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, w, h * 3 / 4);
    ctx.translate(0, h * 3 / 4);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, w, 10);
    ctx.translate(0, 10);
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, w, h / 4);
}

function drawWorm(ctx, t) {
    ctx.fillStyle = 'black';
    ctx.translate(0, h * 3 / 4 - 10);
    for (let i = 0; i < 20; i++) {
        ctx.fillRect(i * 10, -10 * Math.floor(2 * Math.sin(i * Math.PI / 6 + t / 1000)), 10, -10);
    }
}

function drawClouds(ctx) {
    ctx.fillStyle = 'white';
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].x -= timestep / 10;
        var x = clouds[i].x;
        var x2 = clouds[i].x + 20;
        ctx.fillRect(x - x % 10, clouds[i].y, 80, 20);
        ctx.fillRect(x2 - x2 % 10, clouds[i].y - 20, 40, 20);
    }
}

function drawFireballs(ctx) {
    ctx.translate(0, h * 3 / 4 - 10);
    for (let i = 0; i < fireballs.length; i++) {
        var f = fireballs[i];
        ctx.fillStyle = 'red';
        ctx.fillRect(f.x - f.x % 10, f.y, 10, 20);
        ctx.fillStyle = 'orange';
        ctx.fillRect(f.x - f.x % 10 + 10, f.y, 10, 20);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(f.x - f.x % 10 + 20, f.y, 10, 20);
        f.x += timestep / 10;
    }
}

function drawClowns(ctx) {
    for (let i = 0; i < clowns.length; i++) {
        var c = clowns[i];
        ctx.save();
        drawClown(ctx, c);
        ctx.restore();
    }
}
function drawExplosions(ctx) {
    for (let i = 0; i < explosions.length; i++) {
        ctx.save();
        drawExplosion(ctx, explosions[i]);
        ctx.restore();
    }
}

function drawClown(ctx, clown) {
    if (!clown.done) {
        clown.x -= timestep / 8;
        ctx.translate(clown.x - clown.x % 10, h * 3 / 4 - 50);
        // hat
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 10, 10);
        ctx.fillRect(10, 0, 10, 10);
        ctx.fillRect(20, 0, 10, 10);
        ctx.fillRect(30, 0, 10, 10);
        ctx.fillRect(30, 0, 10, 10);
        ctx.fillRect(40, 0, 10, 10);
        ctx.fillRect(30, -10, 10, 10);
        ctx.fillRect(20, -10, 10, 10);
        ctx.fillRect(10, -10, 10, 10);
        ctx.fillRect(20, -20, 10, 10);
        // face
        ctx.fillStyle = 'yellow';
        ctx.translate(0, 10);
        ctx.fillRect(0, 0, 10, 10);
        ctx.fillRect(10, 0, 10, 10);
        ctx.fillRect(20, 0, 10, 10);
        ctx.fillRect(30, 0, 10, 10);
        ctx.fillRect(40, 0, 10, 10);
        ctx.fillRect(20, 10, 10, 10);
        ctx.fillRect(30, 10, 10, 10);
        ctx.fillRect(10, 10, 10, 10);
        ctx.fillRect(0, 10, 10, 10);
        ctx.fillRect(40, 10, 10, 10);
        ctx.fillRect(20, 20, 10, 10);
        ctx.fillRect(30, 20, 10, 10);
        ctx.fillRect(10, 20, 10, 10);
        ctx.fillRect(10, 30, 10, 10);
        ctx.fillRect(20, 30, 10, 10);
        ctx.fillRect(30, 30, 10, 10);
        // eyes
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(10, 5);
        ctx.lineTo(15, 15);
        ctx.moveTo(10, 15);
        ctx.lineTo(15, 5);
        ctx.translate(20, 0);
        ctx.moveTo(10, 5);
        ctx.lineTo(15, 15);
        ctx.moveTo(10, 15);
        ctx.lineTo(15, 5);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 20, 10, 10);
    }
}

function drawWinner(ctx) {
    ctx.font = 'italic 30px monospace';
    ctx.fillStyle = 'red';
    ctx.fillText('worm: HAHA U JUST GOT KILZZD', 0, 100);
    ctx.fillText('      TELL ME WHERE THE SHOW IS', 0, 140);
    ctx.fillStyle = 'darkgreen';
    ctx.fillText('clown: owowow it is at 6420 e forest!', 0, 200);
}

function drawLoser(ctx) {
    ctx.font = 'italic 30px monospace';
    ctx.fillStyle = 'purple';
    ctx.fillText('clown: you have been crushded', 0, 100);
    ctx.fillText('worm: wow i suck i better refresh and try again', 0, 200);
}

var colors = [];
for (let i = 0; i < 18; i++) {
    colors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function drawTitle(ctx) {
    ctx.font = 'italic 30px monospace';
    for (let i = 0; i < 18; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillText('PHONEY ISLAND CLOWN FIGHT', 150 + 2.5 * i, 340 + 2.5 * i);
    }
    colors.shift();
    colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
}
function drawStartScreen(ctx) {
    ctx.font = 'italic 30px monospace';
    ctx.fillStyle = 'green';
    ctx.fillText('>CLICK TO START', 150, 200);
}
function checkCollisions() {
    if (clowns.length === 0) {
        winFlag = true;
    }
    for (var j = 0; j < clowns.length; j++) {
        var clown = clowns[j];
        for (let i = 0; i < fireballs.length; i++) {
            var f = fireballs[i];
            if (Math.abs(f.x - clown.x) < 20) {
                fireballs.splice(i, 1);
                clowns.splice(j, 1);
                explosions.push({ x: f.x, y: f.y, r: 10 });
            }
        }
        if (clown.x < 220) {
            loseFlag = true;
            clown.done = true;
        }
    }
}


function drawExplosion(ctx, explosion) {
    ctx.translate(explosion.x - explosion.x % 10, h * 3 / 4 - 50);
    ctx.fillStyle = 'brown';
    for (let i = 0; i <= 16; i++) {
        ctx.fillStyle = 'brown';
        ctx.fillRect(explosion.r * Math.cos(Math.PI / 8 * i), -explosion.r * Math.sin(Math.PI / 8 * i), 10, 10);
        ctx.fillStyle = 'red';
        ctx.fillRect((explosion.r + 10) * Math.cos(Math.PI / 8 * i), -(explosion.r + 10) * Math.sin(Math.PI / 8 * i), 10, 10);
        ctx.fillStyle = 'yellow';
        ctx.fillRect((explosion.r + 20) * Math.cos(Math.PI / 8 * i), -(explosion.r + 20) * Math.sin(Math.PI / 8 * i), 10, 10);
    }
    explosion.r += timestep / 10;
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
        } else if (!loseFlag) {
            fireballs.push({ x: 210, y: -20, t: 0});
        }
    }, false);


    var drawGame = function () {
        var draw = [drawBackground, drawWorm, drawClouds, drawTitle];
        if (gameStarted) {
            draw = draw.concat([drawFireballs, drawClowns, drawExplosions]);
        } else {
            draw.push(drawStartScreen);
        }
        draw.forEach(function (elt) {
            ctx.save();
            elt(ctx, t);
            ctx.restore();
        });


        checkCollisions();

        if (winFlag) {
            drawWinner(ctx);
        }
        if (loseFlag) {
            drawLoser(ctx);
        }
    };
    setInterval(function () {
        t += timestep;
        drawGame();
    }, timestep);
});
