function spawnObstacles(){
if(frameCount%60===0){
obstacle=createSprite(505,435,10,20)
obstacle.velocityX=-5;

obstacle.setCollider("rectangle",-10,0,70,100)
obstacle.lifetime=505/5
oGroup.add(obstacle)
obstacle.scale=0.6
var rand = Math.round(random(1,3));
switch(rand) {
  case 1: obstacle.addImage(o1);
          break;
  case 2: obstacle.addImage(o2);
          break;
  case 3: obstacle.addImage(o3);
          break;
          default: break;
}

}}

function spawnFruit(){
if(frameCount%100===0){
fruit=createSprite(505,310,20,20)
fruit.y=Math.round(random(280,320))
fruit.velocityX=-8;
fruit.lifetime=505/8
fGroup.add(fruit)
var rand = Math.round(random(1,4));
switch(rand) {
  case 1: fruit.addImage(fruit1);
          break;
  case 2: fruit.addImage(fruit2);
          break;
  case 3: fruit.addImage(fruit3);
          break;
  case 4: fruit.addImage(fruit4);
          break;
  default: break;
}
fruit.scale=0.2
}
}

function spawnKeys() {
if(score%333===0&&score>0){
key=createSprite(505,310,50,50)
key.addImage("key",k1I)
key.shapeColor="yellow"
key.scale=0.3
key.velocityX=-6
key.lifetime=505/6
kGroup.add(key)
}   
}


function spawnClouds() {
        //write code here to spawn the clouds
        if (frameCount % 40 === 0) {
          var cloud = createSprite(600,120,40,10);
          cloud.y = Math.round(random(80,160));
          cloud.addImage(cloudImage);
          cloud.scale = 0.5;
          cloud.velocityX = -6
          
           //assign lifetime to the variable
          cloud.lifetime = 200;
          
          //adjust the depth
          cloud.depth = player.depth;
          player.depth = player.depth + 1;
          
          //add each cloud to the group
          cloudsGroup.add(cloud);
        }
        
      }


