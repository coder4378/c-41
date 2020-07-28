var gameState=0
var player,plrImg
var bg1,bg2
var start
var ground,gImg
var iGround
var gravity=0.8
var fGroup,oGroup
var fruit,obstacle
var score,energy,lives,key
var fruit1, fruit2,fruit3,fruit4
var hearts,h1,h2,h3,h1I,h2I,h3I
var k1,k1I,k2,k2I,k3,k3I
var kGroup,k
var gameOver,gOImg
var bGroup
var bg2Img
var o1,o2,o3
var  reset
var youWon,ywI
var cloudImage,cloudsGroup;
 
function  preload() {
gImg=loadImage("ground.png")
plrImg=loadAnimation("player.1.png","player.2.png","player.3.png","player.4.png")
fruit1=loadImage("fruit1.png")
fruit2=loadImage("fruit2.png")
fruit3=loadImage("fruit3.png")
cloudImage = loadImage("cloud.png");
fruit4=loadImage("fruit4.png")
h1I=loadImage("lives1.png")
h2I=loadImage("lives1.png")
h3I=loadImage("lives1.png")
k1I=loadImage("key.png")
k2I=loadImage("key.png")
k3I=loadImage("key.png")
gOImg=loadImage("gameOver.png")
bg2Img=loadImage("bg.jpg")
o1=loadImage("obstacle1.png")
o2=loadImage("obstacle2.png")
o3=loadImage("obstacle3.png")
ywI=loadImage("ww.png")
}
function setup() {

  createCanvas(500,500);

  bg1=createSprite(250,250,500,500)
  start=createButton("start")

  bg2=createSprite(250,250,500,500)
  bg2.shapeColor="green"
  bg2.visible=false
  ground=createSprite(250,480,1000,10)
  ground.addImage("ground",gImg)
  ground.visible=false
  ground.scale=1.1
  iGround=createSprite(250,445,500,5)
  iGround.visible=false
  ground.x=ground.width/2
  h1=createSprite(400,30,10,10)
  h1.addImage("live1",h1I)
  h1.scale=0.1
  h2=createSprite(430,30,10,10)
  h2.addImage("live2",h2I)
  h2.scale=0.1
  h3=createSprite(460,30,10,10)
  h3.addImage("live3",h3I)
  h3.scale=0.1
  k1=createSprite(370,60,10,10)

  k2=createSprite(410,60,10,10)

  k3=createSprite(450,60,10,10)
k1.visible=false
k2.visible=false
k3.visible=false
k1.scale=0.2
k2.scale=0.2
k3.scale=0.2
  player=createSprite(50,440,30,30)
  player.visible=false
  player.shapeColor="red"
  player.addAnimation("player",plrImg)
  player.debug=true
  player.setCollider("circle",0,0,100)
  player.scale=0.2
  fGroup=new Group()
  oGroup=new Group()
  kGroup=new Group()
  bGroup=new Group()
  cloudsGroup=new Group()
  ground.scale=1
gameOver=createSprite(250,250,500,500)
gameOver.addImage("over",gOImg)
gameOver.visible=false
gameOver.scale=0.5
reset=createButton("REPLAY")
youWon=createSprite(259,250)
youWon.addImage("jet gaye",ywI)
youWon.visible=false
youWon.scale=0.4
}

function draw() {
 bg1.shapeColor="yellow"
  console.log(gameState)
  background(255,255,255);
  
  drawSprites();
  textSize(18)
  fill(255)
  text("Energy Level :"+energy,20,20)
  text("Distance :"+score,20,40)
  text("Lives :"+lives,20,60)
  if(gameState===0){
    bg1.visible=true
    bg2.visible=false
    player.visible=false
    youWon.visible=false
    reset.hide()
    score=0
    energy=0
    lives=3
    k=0
    h1.visible=true
    h3.visible=true
    bg2.shapeColor="blue"
    h2.visible=true
    start.show()
    k1.visible=false
      k2.visible=false
k3.visible=false
gameOver.visible=false
//reset.hide()
  textSize(30)
  fill("red")
  text("Save your friend"+"\n"+"your friend has been"+"\n"+"kidnapped",165,80)
  textSize(25)
  fill("magenta")
  text("Rules",45,300)
  textSize(15)
  text("Click up arrow to jump from obstacles"+"\n"+"get fruit collect three key to "+"\n"+"rescue your friend"
  ,20,320)
  start.position(180,230)
  start.mousePressed(()=>{
  gameState=1
  })
  } 
  if(gameState===1) {
    console.log(player.y)
  bg1.visible=false
  bg2.visible=true
  reset.hide()
  player.visible=true
  ground.visible=true
  start.hide()
  bg2.shapeColor="blue"
  ground.velocityX=-5
  player.velocityY = player.velocityY + gravity;
  if(keyDown(UP_ARROW)&&player.y>422.4){
    player.velocityY= -15
  }

  if(ground.x<0){
  ground.x=ground.width/2
}
spawnObstacles()
spawnFruit()
spawnKeys()
spawnClouds()
if(player.isTouching(fGroup)){
fruit.remove()
energy+=5
youWon.visible=false
}
score=score+Math.round(getFrameRate()/60)
if(player.isTouching(oGroup)){
lives=lives-1
energy-=5
player.velocityY=player.velocityY* -1
oGroup.destroyEach()
}
if(lives<=0||k===3){
gameState=2
h3.visible=false
}

if(lives<=2){
  h1.visible=false
}
if(lives<=1){
  h2.visible=false
}
if(player.isTouching(kGroup)){
kGroup.destroyEach()
k++

}
if(k===1){
  k1.addImage("key1",k1I)
  k1.visible=true
}
if(k===2){
  k2.addImage("key2",k2I)
  k2.visible=true
}
if(k===3){
  k3.addImage("key3",k3I)
  k3.visible=true
}
if(score>700&&score<850&&gameState===1){
textSize(26)
text("You have unlocked gun feature, "+"\n"+"      Press SPACE to shoot",70,140)
}
if(keyDown("space")&&energy>=10&&score>700){
  var bullet=createSprite(player.x,player.y,10,10)
  bullet.velocityX=5
  energy-=10
  bullet.shapeColor="red"
  bGroup.add(bullet)
}

if(bGroup.isTouching(oGroup)){
  oGroup.destroyEach()
  
}
  }
  player.collide(iGround)
 
  if(gameState===2){
 
    if (k<3){
      ground.velocityX=0
      oGroup.velocityX=0
      kGroup.velocityX=0
      fGroup.velocityX=0
      player.visible=false
      gameOver.visible=true
      ground.visible=false
      bg2.shapeColor="red"
    }
else if(k===3){
  ground.velocityX=0
  oGroup.velocityX=0
  kGroup.velocityX=0
  fGroup.velocityX=0
  player.visible=false
  youWon.visible=true
  ground.visible=false
  bg2.shapeColor="yellow"
  text("You Won",400,400)
  
    
}
reset.position(300,400)
reset.show()
reset.mousePressed(()=>{
  gameState=0
  })

  }

}