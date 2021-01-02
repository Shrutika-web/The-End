var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bee,beeImg,beeImage;
var score,gameover,gameoverImg;
var laserGroup;
var bg,bg1,bg2;


function preload(){
beeImg=loadAnimation("bee2.png","bee1.png");
  beeImage=loadAnimation("bee1.png");
  bg=loadImage("bg.jpg")
  bg2=loadImage("bg.png")
}

function setup() {
  createCanvas(680, 290);
  
  
  bg1=createSprite(1300,150,2500,390);
  bg1.addImage(bg);
  bg1.scale=0.4
  bg1.velocityX=-2

  bee=createSprite(50,145,10,10);
  bee.addAnimation("bee",beeImg);
  bee.addAnimation("stopped",beeImage);
  bee.scale=0.1;
  camera.position.x=bee.position.x;
  camera.position.y=bee.position.y;
  
   score=0
  
  laserGroup= createGroup()
     
}

function draw() {
  background(bg2);
  
 if(gameState===PLAY){
   

   bee.changeAnimation("bee",beeImg);
   
if(keyDown(RIGHT_ARROW)){
      bee.velocityX = bee.velocityX+2;
    }

    if(keyDown(UP_ARROW)){
      bee.velocityY = -10;
    }
  
    bee.velocityY = bee.velocityY + 0.8
  
   score = score + Math.round(getFrameRate()/60);
   
   if(laserGroup.isTouching(bee)||frameCount%1420===0||bee.y>285){
        gameState = END;
    }
  
    spawnLaser()
  spawnLaser1()
  
   
 }else if(gameState===END){
   
  textSize(20);
  fill("snow")
  text("GAME OVER!",-250,30);

  textSize(15);
  fill("snow")
  text("PRESS SPACE TO RESTART",5,275);


   
   bee.changeAnimation("stopped",beeImage);
   
   bee.velocityY=0
   bg1.velocityX=0
   
 if(keyDown("space")){
reset()
 }
   
    laserGroup.setLifetimeEach(-1);
     laserGroup.setVelocityXEach(0)

}

//image(bg,-100,0,2500,290);

  drawSprites()

  
  textSize(20);
  fill("snow")
  text("SCORE:"+score,30,30);

  
}

function reset(){
  gameState=PLAY;
 
  
 laserGroup.destroyEach();
  bee.x=50
  bee.y=145
  bg1.velocityX=-2;
  bg1.x=1300;
  bg1.y=150;
  
  score=0;

}

function spawnLaser() {
  
  if (frameCount % 60 === 0) {
    var laser = createSprite(680,120,10,Math.round(random(100,400)));
    laser.y = Math.round(20);
     laser.shapeColor=("midnightblue")
    laser.scale = 0.5;
    laser.velocityX = -3;
    
     //assign lifetime to the variable
    laser.lifetime = 320;
    
    
laserGroup.add(laser);
    
  }
}

function spawnLaser1() {
  
  if (frameCount % 90 === 0) {
    var laser = createSprite(680,120,10,Math.round(random(100,350)));
    laser.y = Math.round(260);
    laser.shapeColor=("midnightblue")
    laser.scale = 0.5;
    laser.velocityX = -3;
    
     //assign lifetime to the variable
    laser.lifetime = 320;
    
    laserGroup.add(laser);
  }
}

