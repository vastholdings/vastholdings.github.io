'use strict';

var flag = false;
var clouds = [];
var cloudsy = [];

var fireballs = [];

for(var i = 0; i < 10000; i++) {
    clouds[i] = 150*i + 80*(Math.random()-0.5);
    cloudsy[i] = 20*Math.floor(10*Math.random());
}

var clown = 720;
var currPos = 0;


document.addEventListener("DOMContentLoaded", function() {
    var gameboard = document.getElementById('gameboard');
    var ctx = gameboard.getContext('2d');
    var w = gameboard.width;
    var h = gameboard.height;
    var t = 0;

    gameboard.addEventListener("mousedown", function() {
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
            ctx.fillRect(i*10+currPos, -10*Math.floor(2*Math.sin(i*Math.PI/6+t/1000)), 10, -10);
        }


        for(var i = 0; i < fireballs.length; i++) {
            var f = fireballs[i];
            ctx.fillStyle = 'red';
            ctx.fillRect(f.x - f.x % 10, f.y, 10, 20);
            ctx.fillStyle = 'orange';
            ctx.fillRect(f.x - f.x % 10 + 10, f.y, 10, 20);
            ctx.fillStyle = 'yellow';
            ctx.fillRect(f.x - f.x % 10 + 20, f.y, 10, 20);
            f.x++;

            if(f.x - clown < 5 && !flag) {
                flag = true;
                alert('clown: this dangerous fireball has ruined me, I did not know worms threw the fireballs, please do not harm me any further\n\n\n'+
                    'worm: TELL ME WHERE THE SHOW IS\n\n\n'+
                    'clown: 6420 e forest!');
            }
        }
        ctx.restore();
        //ctx.translate(-10*Math.floor(t/1000),0);
        ctx.fillStyle='white';
        for(var i = 0; i < clouds.length; i++) {
            ctx.fillRect(clouds[i]-clouds[i]%10, cloudsy[i], 80, 20);
            ctx.fillRect(clouds[i]-clouds[i]%10+20, cloudsy[i]-20, 40, 20);
            clouds[i]--;
        }


        ctx.setTransform(1,0,0,1,0,0);

        //hat
        ctx.fillStyle='red';
        ctx.translate(clown-clown%10, h*3/4-50);
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
        clown--;
        


        ctx.setTransform(1,0,0,1,0,0);
        ctx.font = 'italic 30px monospace';
        for(var i = 0; i < 8; i++) {
            ctx.fillStyle = 'white';
            ctx.fillText('PHONEY ISLAND CLOWN FIGHT', 20+2*i, 350+2*i);
            ctx.fillStyle='black';
            ctx.fillText('PHONEY ISLAND CLOWN FIGHT', 2+2*i+1, 350+2*i+1);
        }

    }
    setInterval(function() {
        t+=100;
        drawGame();
    }, 70);
});

function drawBoard() {
}
