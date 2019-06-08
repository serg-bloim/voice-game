var block={
    pos:{x:0,y:0},
    sizeX:10,
    sizeY:10
}
var dimensions={width:500, height:500}
var lvlPos = 0
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
      updateCursor();
      drawCursor()
      drawBottom()
      drawTop()
}
function drawCursor(){
    
    fill('#fae')
    ellipse(block.pos.x, block.pos.y, block.sizeX, block.sizeY);
}
function drawBottom(){
    stroke('#DEB887')
    fill('#A52A2A')
    strokeWeight(3)

    beginShape()
    var curLvl = 0;
    for (x in lvl1.bottom){
        var y = lvl1.bottom[x];
        curLvl += y
        vertex(x*10, curLvl*10);
    }
    endShape()
    stroke(0)
    strokeWeight(1)
}

function drawTop(){
    
}

function updateCursor() {
  let volume = mic.getLevel();
  let newHeight = map(volume, 0, 1, -90, 90);
  block.pos.y = newHeight;
}

function touchStarted() {
  getAudioContext().resume()
}