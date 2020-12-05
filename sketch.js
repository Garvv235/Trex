var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var cloud, cloudImage;

var obstacle, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6, rand

var cloudGroup, obstacleGroup,gamoOverImage,restartImage,restart,gameOver

var play = 1;
var end = 0;
var gameState = 1;

var count = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");

  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage(groundImage);
  
  ground.x = ground.width / 2;
  ground.velocityX = -2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();
  cloudGroup = new Group();
  
      gameOver = createSprite(300,50,10,10)
      gameOver.addImage(gameOverImage);
    
      restart = createSprite(300,100,10,10)
      restart.addImage(restartImage);
      restart.scale=0.5;
  
      gameOver.visible=false;
      restart.visible=false;
}

function draw() {
  background(255);

  if(gameState === play){
  
    if (keyDown("space") && trex.y > 161) {
      trex.velocityY = -12;
    }
 
    console.log(count)
    count = count + Math.round(World.frameRate/60);
    text("Score: "+ count, 450, 50);
    
    trex.velocityY = trex.velocityY + 0.6

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (obstacleGroup.isTouching(trex)) {
      trex.changeAnimation("collided",trex_collided);
      gameState = end;   
    }
      spawnClouds();
      spawnObstacles();
  } 
  else if (gameState === end){
    ground.velocityX = 0;
   
    trex.velocityY = 0;
    
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart)){
    reset();
    }
   }
  trex.collide(invisibleGround);
    
  
  drawSprites();

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, Math.round(random(80, 120)), 40, 10);
    cloud.addImage(cloudImage);
    cloud.velocityX = -4;
    cloud.scale = 0.5;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 150;
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 170, 40, 10)
    obstacle.velocityX = -5;
    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle);
    //To get Random number
    rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacleImage1);
        break;
      case 2:
        obstacle.addImage(obstacleImage2);
        break;
      case 3:
        obstacle.addImage(obstacleImage3);
        break;
      case 4:
        obstacle.addImage(obstacleImage4);
        break;
      case 5:
        obstacle.addImage(obstacleImage5);
        break;
      case 6:
        obstacle.addImage(obstacleImage6);
        break;
    }
  }
}

function reset(){
  gameState = play;
  
  trex.changeAnimation("running",trex_running);
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
   gameOver.visible=false;
  restart.visible=false;
  
  count=0;
}