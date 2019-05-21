let walls = [];
let ray;
let particle;
let posX; let posY;
let width = 800; let height = 400;
const sceneW = 400; const sceneH = 400;

function setup(){
  createCanvas(width, height);
  walls.push(new Boundary(-1, 0, sceneW, 0));
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(0, height - 1, sceneW, height));
  walls.push(new Boundary(sceneW - 1, height, sceneW, -1));
  particle = new Particle();
}

function draw(){
  background(0);

  for(let wall of walls){
    wall.display();
  }

  if(keyIsDown(LEFT_ARROW)){
    particle.rotate(-5);
  }
  else if(keyIsDown(RIGHT_ARROW)){
    particle.rotate(5);
  }
  else if(keyIsDown(UP_ARROW)){
    particle.move(5);
  }
  else if(keyIsDown(DOWN_ARROW)){
    particle.move(-5);
  }

  particle.display();

  let scene = particle.look(walls);
  let w = sceneW / scene.length;
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    maxD = sqrt(sceneW**2 + sceneH**2)
    let dist = scene[i];
    let angle = radians(map(i,0,scene.length-1, -particle.fov/2 , particle.fov/2));
    let corrected_dist = dist * cos(angle);
    let viewDist = 10;
    let h = viewDist / map(corrected_dist, 0, maxD, 0, 1);
    let b = map(corrected_dist, 0, maxD, 255, 50);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();

  if (!mouseIsPressed) {
   posX = mouseX;
   posY = mouseY;
 }
 else{
   stroke('red');
   line(posX, posY, mouseX, mouseY);
 }

}

function mouseReleased(){
  walls.push(new Boundary(posX, posY, mouseX, mouseY));
}
