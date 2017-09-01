'use strict';


document.addEventListener("DOMContentLoaded", function() {
    var gameboard = document.getElementById('gameboard');
    var ctx = gameboard.getContext('2d');
    var w = gameboard.offsetWidth;
    var h = gameboard.offsetHeight;
    ctx.fillStyle='lightblue';
    ctx.fillRect(0, 0, w, h*3/4);
    ctx.translate(0,h*3/4);
    ctx.fillStyle='green';
    ctx.fillRect(0, 0, w, 10);
    ctx.translate(0, 10);
    ctx.fillStyle='orange';
    ctx.fillRect(0, 0, w, h/4);
    //ctx.fillStyle='black';
    //ctx.fillRect(0, 0, 100, 100);
});
