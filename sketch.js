var block={
    pos:{x:0,y:0},
    sizeX:10,
    sizeY:10
}
var dimensions={width:500, height:500}
var lvlPos = 0
var playing = true;
var speed = 3;
var mic;
var lvl = lvl1;
var level = 4;
var useMouse = false;
var collision = 0;
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
    updateCursor()
    updateLvl();
    detectCollision()
    drawGrid();
    drawBottom()
    drawTop()
    drawCursor()
}
function drawCursor(){
    
    fill(collision?'red':'#fae')
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
    var offsetBackward = 1;
    var offsetForward = 2;
    var arrStart = constrain(floor(lvlPos)-10-offsetBackward, 0, border.length-1);
    var arrEnd = constrain(floor(lvlPos)+10+offsetForward, 0, border.length);
    for (i = arrStart; i < arrEnd; i++){
        var x = i
        lastX = x+1;
        var y = border[x];
        vertex((x-lvlPos)*10, y*10 + level);
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
  if(useMouse){
    var y = constrain(mouseY, 0, dimensions.height);
    y = 1 - map(y, 0, dimensions.height, 0, 1);
    volume = y;
  }
  let newHeight = map(volume, 0, 1, -90, 90);
  block.pos.y = newHeight;
}

function touchStarted() {
  getAudioContext().resume()
}
function mouseClicked() {
    playing = !playing;
}

function updateLvl() {
  if (playing) {
    lvlPos += speed / 30;
  }
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
function keyPressed() {
  if (keyCode === SHIFT) {
    useMouse = !useMouse;
  }
}
function detectCollision(){
  collision = 0;
  if(collideBorder(lvl.bottom, 1)){
    collision = 1;
  } else if(collideBorder(lvl.top, -1)){
    collision = 2;
  }
  return collision;
}

function collideBorder(arr, dir){
    // detect collision with bottom border
    console.log(block.pos.y);
    var blockY = block.pos.y * Math.sign(dir) + 100;
    var iLeft = floor(lvlPos);
    var iRight = iLeft+1;
    var yLeft = level + arr[iLeft]*10;
    var yRight = level + arr[iRight]*10;
    var borderY = map(lvlPos, iLeft, iRight, yLeft, yRight)
    if (blockY < borderY) {
      return true;
    }
    var xRight = (iRight - lvlPos) * 10;
    var xLeft = (iLeft - lvlPos) * 10;
    if (collideLineCircle(xLeft, yLeft, xRight, yRight, 0,blockY, 10)) {
      return true;
    }
    return false;
}

function drawGrid(){
  push();
  strokeWeight(0.2);
  for (var x = -100; x<= 100;x+=10){
    line(x,-100, x, 100);
  }
  for (var y = -100; y<= 100;y+=10){
    line(-100, y, 100, y);
  }
  pop();
}