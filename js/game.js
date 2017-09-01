'use strict';




var gameboard = document.getElementById('gameboard');
var ctx = gameboard.getContext('2d')



ctx.strokeStyle='red';
ctx.fillStyle='black';
ctx.lineTo(0,0);
ctx.lineTo(0,100);
ctx.lineTo(100,100);
ctx.lineTo(100,0);
ctx.stroke();
ctx.fill();

