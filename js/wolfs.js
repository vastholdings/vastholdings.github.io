'use strict';




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
        var draw = [drawWolf, drawTitle];
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
