
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodgroup, obstaclegroup;
var survival;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running); 
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1500,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  foodgroup = new Group();
  obstaclegroup = new Group();
  
  survival = 0;
  
}


function draw() {
  background(255);
  
  textSize(20);
  text("Survival Time : " + survival,100,50);
  
  survival = Math.ceil(frameCount/frameRate());
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
    if(keyDown("space")){
      monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  
  obstacles();
  food();
  
  if(obstaclegroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    foodgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    foodgroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,315,10,40); 
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;
    obstacle.lifetime = 200;
    obstaclegroup.add(obstacle);
    
  }
}
function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodgroup.add(banana);
  }
}



