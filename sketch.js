var block={
    pos:{x:0,y:0}
}
function setup() {
    createCanvas(640, 480);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
      } else {
        fill(255);
      }
    //   ellipse(mouseX, mouseY, 80, 80);
      drawCursor()
}
function drawCursor(){
    fill('#fae')
    ellipse(block.pos.x, block.pos.y, 100, 100);
}