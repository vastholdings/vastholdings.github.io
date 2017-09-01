'use strict';




var obstacles = [1000,2000];

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
        ctx.translate(0,h*3/4);


        for(var i = 0; i < 20; i++) {
            ctx.fillRect(i*10, -2*Math.floor(10*Math.sin(i*Math.PI/6+t/1000)), 10, -10);
        }
    }
    setInterval(function() {
        t+=70;
        drawGame(70);
    }, 70);
});

function drawBoard() {
}
