'use strict';

var clouds = [];
var clowns = [{x:720, y:0}];
var fireballs = [];


for(var i = 0; i < 10000; i++) {
    clouds[i] = {
        x: 150*i + 80*(Math.random()-0.5),
        y: 20*Math.floor(10*Math.random())
    };
}

var t = 0;
var s = 0;

var hitLocx=0;
var hitLocy=0;
var hitRadius = 0;
var w;
var h;
var timestep = 70;




function drawBackground(ctx) {
    ctx.fillStyle='lightblue';
    ctx.fillRect(0, 0, w, h*3/4);
    ctx.translate(0,h*3/4);
    ctx.fillStyle='green';
    ctx.fillRect(0, 0, w, 10);
    ctx.translate(0, 10);
    ctx.fillStyle='orange';
    ctx.fillRect(0, 0, w, h/4);
}

function drawWorm(ctx, t) {
    ctx.fillStyle='black';
    ctx.translate(0, h*3/4 - 10);
    for(var i = 0; i < 20; i++) {
        ctx.fillRect(i*10, -10*Math.floor(2*Math.sin(i*Math.PI/6+t/1000)), 10, -10);
    }
}

function drawClouds(ctx) {
    ctx.fillStyle='white';
    for(var i = 0; i < clouds.length; i++) {
        clouds[i].x -= timestep/10;
        var x = clouds[i].x;
        var x2 = clouds[i].x+20;
        ctx.fillRect(x-x%10, clouds[i].y, 80, 20);
        ctx.fillRect(x2-x2%10, clouds[i].y-20, 40, 20);
    }
}

function drawFireballs(ctx) {
    ctx.translate(0,h*3/4-10);
    for(var i = 0; i < fireballs.length; i++) {
        var f = fireballs[i];
        ctx.fillStyle = 'red';
        ctx.fillRect(f.x - f.x % 10, f.y, 10, 20);
        ctx.fillStyle = 'orange';
        ctx.fillRect(f.x - f.x % 10 + 10, f.y, 10, 20);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(f.x - f.x % 10 + 20, f.y, 10, 20);
        f.x += timestep/10;
    }
}

function drawClowns(ctx) {
    for(var i = 0; i < clowns.length; i++) {
        var c = clowns[i];
        console.log(c)
        drawClown(ctx, c);
    }
}



function drawClown(ctx, clown) {
    ctx.translate(clown.x - clown.x % 10, h*3/4-50);
    //hat
    ctx.fillStyle='red';
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
    //face
    ctx.fillStyle='yellow';
    ctx.translate(0,10);
    ctx.fillRect(0,0,10,10);
    ctx.fillRect(10,0,10,10);
    ctx.fillRect(20,0,10,10);
    ctx.fillRect(30,0,10,10);
    ctx.fillRect(40,0,10,10);
    ctx.fillRect(20,10,10,10);
    ctx.fillRect(30,10,10,10);
    ctx.fillRect(10,10,10,10);
    ctx.fillRect(0,10,10,10);
    ctx.fillRect(40,10,10,10);
    ctx.fillRect(20,20,10,10);
    ctx.fillRect(30,20,10,10);
    ctx.fillRect(10,20,10,10);
    ctx.fillRect(10,30,10,10);
    ctx.fillRect(20,30,10,10);
    ctx.fillRect(30,30,10,10);
    //eyes
    ctx.strokeStyle='black';
    ctx.beginPath();
    ctx.moveTo(10,5);
    ctx.lineTo(15,15);
    ctx.moveTo(10,15);
    ctx.lineTo(15,5);
    ctx.translate(20,0);
    ctx.moveTo(10,5);
    ctx.lineTo(15,15);
    ctx.moveTo(10,15);
    ctx.lineTo(15,5);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle='red';
    ctx.fillRect(0,20,10,10);
    clown.x -= timestep / 10;
}


function drawTitle(ctx) {
    ctx.font = 'italic 30px monospace';
    var arr=['white','black'];
    for(var i = 0; i < 18; i++) {
        ctx.fillStyle = arr[(s+i)%2];
        ctx.fillText('PHONEY ISLAND CLOWN FIGHT', 150+2*i, 350+2*i);
        ctx.fillStyle = arr[(s+i+1)%2];
        ctx.fillText('PHONEY ISLAND CLOWN FIGHT', 150+2*i+1, 350+2*i+1);
    }
}

function checkCollisions() {
    for(var i = 0; i < fireballs.length; i++) {
        var f = fireballs[i];
        for(var j = 0; j < clowns.length; j++) {
            var clown = clowns[j];
            if(Math.abs(f.x - clown) < 20) {
                hitLocx = f.x;
                hitLocy = f.y;
            }
        }
    }
}



function drawExplosion(ctx) {
    ctx.translate(0, h*3/4-50);
    ctx.fillStyle = 'brown';
    for(var i = 0; i <= 8; i++) {
        ctx.fillRect(hitLocx - hitLocx % 10 + hitRadius*Math.cos(Math.PI/8*i), hitLocy - hitRadius*Math.sin(Math.PI/8*i), 10, 10);
    }
    ctx.fillStyle = 'red';
    for(var i = 0; i <= 8; i++) {
        ctx.fillRect(hitLocx - hitLocx % 10 + (hitRadius-10)*Math.cos(Math.PI/8*i), hitLocy - (hitRadius-10)*Math.sin(Math.PI/8*i), 10, 10);
    }
    hitRadius +=10;
}


document.addEventListener("DOMContentLoaded", function() {
    var gameboard = document.getElementById('gameboard');
    var ctx = gameboard.getContext('2d');
    w = gameboard.width;
    h = gameboard.height;
    var t = 0;

    gameboard.addEventListener("mousedown", function() {
        fireballs.push({ x:210, y:-20, t: 0});
    }, false);


    var drawGame = function() {
        var draw = [drawBackground, drawWorm, drawClouds, drawFireballs, drawClowns, drawTitle];
        draw.forEach(function(elt) {
            ctx.save();
            elt(ctx, t);
            ctx.restore();
        });

        

        checkCollisions();
    }
    setInterval(function() {
        t += 100;
        s++;
        drawGame();
    }, timestep);
});
