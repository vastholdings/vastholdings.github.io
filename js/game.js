'use strict';


var clouds = [];
var cloudsy = [];
for(var i = 0; i < 10000; i++) {
    clouds[i] = 150*i + 100*(Math.random()-0.5);
    cloudsy[i] = Math.random()*20;
}

var clown = 1000;


document.addEventListener("DOMContentLoaded", function() {
    var gameboard = document.getElementById('gameboard');
    var ctx = gameboard.getContext('2d');
    var w = gameboard.offsetWidth;
    var h = gameboard.offsetHeight;
    var t = 0;


    var drawGame = function() {
        ctx.setTransform(1,0,0,1,0,0);
        ctx.fillStyle='lightblue';
        ctx.fillRect(0, 0, w, h*3/4);
        ctx.translate(0,h*3/4);
        ctx.fillStyle='green';
        ctx.fillRect(0, 0, w, 10);
        ctx.translate(0, 10);
        ctx.fillStyle='orange';
        ctx.fillRect(0, 0, w, h/4);

        ctx.setTransform(1,0,0,1,0,0);
        ctx.fillStyle='black';
        ctx.translate(0,h*3/4-10);


        for(var i = 0; i < 20; i++) {
            ctx.fillRect(i*10, -10*Math.floor(2*Math.sin(i*Math.PI/6+t/1000)), 10, -10);
        }
        ctx.fillStyle='black';
        ctx.fillRect(200, -10*Math.floor(2*Math.sin(21*Math.PI/6+t/1000))+10, 10, -10);
        ctx.fillRect(200, -10*Math.floor(2*Math.sin(21*Math.PI/6+t/1000)), 10, -10);

        ctx.setTransform(1,0,0,1,0,0);
        ctx.translate(-10*Math.floor(t/1000),0);
        ctx.fillStyle='white';
        for(var i = 0; i < clouds.length; i++) {
            ctx.fillRect(clouds[i], cloudsy[i], 20, 20);
        }




        ctx.fillStyle = 'red';
        ctx.translate(clown,h*3/4-50);
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

    }
    setInterval(function() {
        t+=70;
        drawGame(70);
    }, 70);
});

function drawBoard() {
}
