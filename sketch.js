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
    frameRate(30);
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
      updateLvl();
      drawBottom()
      drawTop()
      updateCursor()
      drawCursor()
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
    vertex(-110,0)
    vertex(-110,5)
    var curLvl = 0.5;
    var lastX = 0;
    // var arrStart = constrain(lvlPos-10, 0, lvl.length-1);
    // var arrEnd = constrain(lvlPos+10, 0, lvl.length);
    var border = lvl.bottom;
    var arrStart = 0;
    var arrEnd = border.length;
    var xStart = max(-lvlPos, -10)
    for (i = arrStart; i < arrEnd; i++){
        var x = i
        lastX = x+1;
        var y = border[x];
        curLvl += y
        vertex((x-lvlPos)*10, curLvl*10);
    }
    vertex(lastX*10, 5)
    vertex(110, 5)
    vertex(110, 0)
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

function updateLvl(){
  lvlPos = frameCount/30;
}