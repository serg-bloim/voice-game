var block={
    pos:{x:0,y:0},
    sizeX:10,
    sizeY:10
}
var dimensions={width:500, height:500}
var lvlPos = 0
var mic;
var lvl = lvl1;
function setup() {
    createCanvas(dimensions.width, dimensions.height);
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    fill(255);
    rect(0,0,width, height);
    translate(width/2, height/2);
    scale(1,-1)
    scale(dimensions.width/200)
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
    strokeWeight(2)
    // translate(0,-height/2);
    translate(0,-100);
    beginShape()
    vertex(0,0)
    var curLvl = 0.5;
    var lastX = 0;
    for (x in lvl.bottom){
        lastX = x+1;
        var y = lvl.bottom[x];
        curLvl += y
        vertex(x*10, curLvl*10);
    }
    vertex(lastX*10, 0)
    endShape()
    translate(0,100);
    // translate(0,height/2);
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