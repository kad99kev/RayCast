class Particle{
  constructor(){
    this.pos = createVector(sceneW/2, sceneH/2);
    this.rays = [];
    this.heading = 0;
    this.fov = 60;
    for(let a = -this.fov/2; a < this.fov/2; a += 0.25){
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  rotate(angle){
    this.heading += radians(angle);
    for(let i = 0; i < this.rays.length; i += 1){
      this.rays[i].dir.rotate(radians(angle));
    }
  }

  move(amount){
    let velo = p5.Vector.fromAngle(this.heading);
    velo.setMag(amount);
    this.pos.add(velo);
  }

  update(x, y){
    this.pos.set(x, y);
  }

  display(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4, 4);
    for(let ray of this.rays){
      ray.display();
    }
  }

  look(walls){
    let scene = [];
    for(let i = 0; i < this.rays.length; i++){
      let closest = null;
      let record = Infinity;
      for(let wall of walls){
        let pt = this.rays[i].cast(wall);
        if(pt){
          let dist = p5.Vector.dist(this.pos, pt);
          if(dist < record){
            record = dist;
            closest = pt;
          }
        }
      }
      if(closest){
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }
}
