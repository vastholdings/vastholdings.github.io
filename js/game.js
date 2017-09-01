'use strict';

var flag = false;
var clouds = [];
var cloudsy = [];

var fireballs = [];

for(var i = 0; i < 10000; i++) {
    clouds[i] = 150*i + 80*(Math.random()-0.5);
    cloudsy[i] = 20*Math.floor(10*Math.random());
}

var clown = 800;


document.addEventListener("DOMContentLoaded", function() {
    var gameboard = document.getElementById('gameboard');
    var ctx = gameboard.getContext('2d');
    var w = gameboard.width;
    var h = gameboard.height;
    var t = 0;

    gameboard.addEventListener("mousedown", function() {
        console.log('fireballz');
        fireballs.push({ x:210, y:-20, t: 0});
    }, false);


    var drawGame = function() {
        ctx.setTransform(1,0,0,1,0,0);

        ctx.save();
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





        for(var i = 0; i < fireballs.length; i++) {
            var f = fireballs[i];

            ctx.fillStyle = 'red';
            ctx.fillRect(f.x - f.x % 10, f.y, 10, 20);
            ctx.fillStyle = 'orange';
            ctx.fillRect(f.x - f.x % 10 + 10, f.y, 10, 20);
            ctx.fillStyle = 'yellow';
            ctx.fillRect(f.x - f.x % 10 + 20, f.y, 10, 20);
            f.x++;
            console.log(f.x)
        }
        ctx.restore();
        ctx.translate(-10*Math.floor(t/1000),0);
        ctx.fillStyle='white';
        for(var i = 0; i < clouds.length; i++) {
            ctx.fillRect(clouds[i], cloudsy[i], 80, 20);
            ctx.fillRect(clouds[i]+20, cloudsy[i]-20, 40, 20);
        }




        ctx.fillStyle='red';
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
        

        if(t/100>600 && !flag) {
            flag = true;
            alert('fight the clownzz, go to 6420 e forest');
        }

        ctx.setTransform(1,0,0,1,0,0);
        ctx.fillStyle='white';
        ctx.font = '20px monospace';
        ctx.fillText('PHONEY ISLAND **CLOWN FIGHT**', 20, 350);
        ctx.fillStyle='black';
        ctx.fillText('PHONEY ISLAND **CLOWN FIGHT**', 21, 351);

    }
    setInterval(function() {
        t+=100;
        drawGame();
    }, 70);
});

function drawBoard() {
}
