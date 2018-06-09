var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
// can.tabIndex = 1; // quick way to get focus so keypresses register
ctx.font = '16px sans';

var thingsOnMap = [
    [50,50],
    [55,70],
    [15,22],
    [150,20],
    [120,80],
    [100,10],
    [170,40],
    [130,70],
    [230,10],
    [330,45],
    [250,65]
];

// player's position
var playerX = 100;
var playerY = 100;

// how far offset the canvas is
var offsetX = 0;
var offsetY = 0;
let keys = [];
let frame = 0;

    
function draw() {
    ctx.drawImage(bird[frame], playerX - offsetX, playerY - offsetY, 100, 100);
}



window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


//stackoverflow
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


let arrayWidth = 5;
let arrayHeight = 5;
let imageWidth = 2000;
let imageHeight = 1600;
let imageArray = [];
let bird = [];

async function setup(){
    let imagesLoading = [];
    let images = [];
    for(let i = 0; i < 25; i++) {
        images[i] = `tiles/tile${pad(i,3)}.png`;
    }
    images.push(`img/bird0.png`);
    images.push(`img/bird1.png`);

    for(var i = 0; i < images.length; i++) {
        var imageObj = new Image();
        imagesLoading[i] = new Promise((resolve, error) => {
            imageObj.onload = function(pos) {
                resolve(this);
            }
            imageObj.src = images[i];
        });
    }


    console.log('images loading');
    imageArray = await Promise.all(imagesLoading);
    bird[0] = imageArray[25];
    bird[1] = imageArray[26];
    console.log(bird);
    console.log('done loading');
    window.requestAnimationFrame(myRenderTileSetup);
}


function myRenderTileSetup() {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.clearRect(0, 0, can.width, can.height);
    var renderedCount = 0;
    for(let y = 0; y < arrayWidth; y++){
        for(let x = 0; x < arrayHeight; x++){
            pos = x + y * arrayWidth;
            if(imageArray[pos] && imageArray[pos].complete){
                ctx.drawImage(imageArray[pos],(pos%arrayWidth)*imageWidth, Math.floor(pos/arrayWidth)*imageHeight);
                //imageArray[pos] = undefined;
            } else {
                renderedCount += 1;
            }
        }
    }
    whatKey();
    draw();
    ctx.restore();
    window.requestAnimationFrame(myRenderTileSetup);
}
function whatKey(e) {
    if(keys[37]) {
	offsetX = Math.min(0, offsetX + 5);
        frame = (frame+1)%2;
    }
    if(keys[39]) {
	offsetX = Math.max(-imageWidth*arrayWidth, offsetX - 5);
        frame = (frame+1)%2;
    }
    if(keys[40]) {
	offsetY = Math.max(-imageHeight*arrayHeight, offsetY - 5);
        frame = (frame+1)%2;
    }
    if(keys[38]) {
	offsetY = Math.min(0, offsetY + 5);
        frame = (frame+1)%2;
    }
}


setup();
