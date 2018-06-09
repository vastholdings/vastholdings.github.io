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
var playerX = 20;
var playerY = 20;

// how far offset the canvas is
var offsetX = 0;
var offsetY = 0;
    
function draw() {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    // clear the viewport
    ctx.clearRect(-offsetX, -offsetY, 100,100);
    
    // draw the player
    ctx.fillStyle = 'red';
    ctx.fillRect(playerX-offsetX, playerY-offsetY, 8, 8);
    
    // draw the other stuff
    var l = thingsOnMap.length;
    for (var i = 0; i < l; i++) {
        // we should really only draw the things that intersect the viewport!
        // but I am lazy so we are drawing everything here
        var x = thingsOnMap[i][0];
        var y = thingsOnMap[i][1];
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(x, y, 8, 8);
        ctx.fillStyle = 'black';
        ctx.fillText(x + ', ' + y, x, y) // just to show where we are drawing these things
    }
    
    ctx.restore();
}
    
can.addEventListener('keydown', function(e) {
    console.log('here');
    if (e.keyCode === 37) { // left
        offsetX++;
    } else if (e.keyCode === 39) { // right
        offsetX--;
    }
    draw();
}, false);




//stackoverflow
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


let arrayWidth = 5;
let arrayHeight = 4;
let imageWidth = 2000;
let imageHeight = 1600;
let imageArray = [];
let imagesLoading = [];

async function setup(){
    for(var i = 0; i < 24; i++) {
        var imageObj = new Image();
        imagesLoading[i] = new Promise((resolve, error) => {
            imageObj.onload = function(pos) {
                resolve(this);
            }
            imageObj.src = `tiles/tile${pad(i,3)}.png`;
        });
    }
    // populate your imageArray with the image tiles

    // Now call requestAmimationFrame
    console.log('images loading');
    imageArray = await Promise.all(imagesLoading);
    console.log('done loading');
    window.requestAnimationFrame(myRenderTileSetup);
}


function myRenderTileSetup(){ // this renders the tiles as they are avalible
    console.log('myRenderTileSetup');
    var renderedCount = 0;
    for(let y = 0; y < arrayWidth; y++){
        for(let x = 0; x < arrayHeight; x++){
            pos = x + y * arrayWidth;
            if(imageArray[pos] && imageArray[pos].complete){
                ctx.drawImage(imageArray[pos],(pos%arrayWidth)*imageWidth, Math.floor(pos/arrayWidth)*imageHeight);
                imageArray[pos] = undefined;
            } else {
                renderedCount += 1;
            }
        }
    }
     // when all tiles have been loaded and rendered switch to the game render function
    if(renderedCount === arrayWidth*arrayHeight){
          // background completely rendered
          // switch rendering to the main game render.
         window.requestAnimationFrame(myRenderMain);
    } else{
          // if not all available keep doing this till all tiles complete/ 
         window.requestAnimationFrame(myRenderTileSetup);
    }
}

function myRenderMain(){
    // render the background tiles canvas
    // render game graphics.
    // now ready for next frame.
    console.log('myRenderMain');
    draw();
    //window.requestAnimationFrame(myRenderMain);
}

setup();
