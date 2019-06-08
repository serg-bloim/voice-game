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
    loadLevel(lvl1);
}

function draw() {
    fill(255);
    rect(0,0,width, height);
    translate(width/2, height/2);
    scale(1,-1)
    scale(dimensions.width/200)
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
function drawBorder(border){
    stroke('#DEB887')
    fill('#A52A2A')
    strokeWeight(2)
    translate(0,-100);
    beginShape()
    vertex(-110,0)
    vertex(-110,5)
    var lastX = 0;
    var level = 0.5;
    var offsetBackward = 1;
    var offsetForward = 2;
    var arrStart = constrain(floor(lvlPos)-10-offsetBackward, 0, border.length-1);
    var arrEnd = constrain(floor(lvlPos)+10+offsetForward, 0, border.length);
    for (i = arrStart; i < arrEnd; i++){
        var x = i
        lastX = x+1;
        var y = border[x];
        vertex((x-lvlPos)*10, (y+level)*10);
    }
    vertex(lastX*10, 5)
    vertex(110, 5)
    vertex(110, 0)
    endShape()
}
function drawBottom(){
  push();
  drawBorder(lvl.bottom);
  pop();
}
function drawTop(){
  push();
  scale(1,-1);
  drawBorder(lvl.top);
  pop();
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
  lvlPos = frameCount/10;
}
function loadLevel(newLvl){
  lvl.bottom = toHieghtMap(newLvl.bottom);
  lvl.top = toHieghtMap(newLvl.top);
}
function toHieghtMap(arr){
  var h = 0;
  var heightMap = [];
  for(x in arr){
    h+=arr[x];
    heightMap.push(h);
  }
  return heightMap;
}