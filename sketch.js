var block={
    pos:{x:0,y:0},
    sizeX:10,
    sizeY:10
}
var dimensions={width:500, height:500}
var mic;
function setup() {
    createCanvas(dimensions.width, dimensions.height);
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    fill(255);
    rect(0,0,width, height);
    translate(width/2, height/2);
    if (mouseIsPressed) {
        fill(0);
      } else {
        fill(255);
      }
    //   ellipse(mouseX, mouseY, 80, 80);
      drawCursor()
      drawBottom()
      drawTop()
}
function drawCursor(){
    
    fill('#fae')
    ellipse(block.pos.x, block.pos.y, block.sizeX, block.sizeY);
}
function drawBottom(){

}

function drawTop(){
    
}

function updateCursor() {

}