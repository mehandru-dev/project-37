var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud , cloud_image,cloud_group;
var obstacle1 ,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6 , obstacle_group;
var rand;
var score=0;
var bg="white";
var gamestate="play";
function preload(){
  trex_running = loadAnimation("images/trex1.png","images/trex3.png","images/trex4.png");
  trex_collided = loadImage("../images/trex_collided.png");
  gameover = loadImage("images/gameOver.png");
  groundImage = loadImage("images/ground2.png");
  
    obstacle1=loadImage("images/obstacle1.png");
    obstacle2=loadImage("images/obstacle2.png");
    obstacle3=loadImage("images/obstacle3.png");
    obstacle4=loadImage("images/obstacle4.png");
    obstacle5=loadImage("images/obstacle5.png");
    obstacle6=loadImage("images/obstacle6.png");
  
    cloud_image=loadImage("images/cloud.png");
  
  
}

function setup() {
  createCanvas(displayWidth, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  trex1 = createSprite(trex.x,trex.y,20,50);
  trex1.addImage("collided",trex_collided );
  trex1.scale = 0.5;
  trex1.visible=false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloud_group = new Group();
  obstacle_group=new Group();

  gameOver = createSprite(displayWidth/2,100,20,20);
  gameOver.addImage("over",gameover );
  gameOver.scale = 0.5;
  gameOver.visible=false;
  
}

function draw() {
  background(bg);
  trex.velocityY = trex.velocityY + 0.8
  
  fill("black");
  textSize(19);
  stroke("black");
  text("Score : " + score,displayWidth-190,50);
  text("Game : " + gamestate,displayWidth-210+20,75);


 
  
  console.log(gamestate);
  
  if(gamestate==="play"){
    
    if(obstacle_group.isTouching(trex)){
      gamestate="end";
      }
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
     
  score= score+Math.round(getFrameRate()/60);
  }else if(gamestate==="end"){

  trex.visible=false;
  trex1.visible=true;
  ground.velocityX = 0;
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  gameOver.visible=true;
  }
 
/*if(score%100===0){
bg = "black"
}*/



  trex.collide(invisibleGround);
  trex1.collide(invisibleGround);
  drawSprites();

  spawnclouds();
  spawnObstacles();
  keyPressed();
}

function spawnclouds(){
 if(frameCount%100===0 ){
   rand=random(100,120);
   cloud = createSprite(600,rand,10,10);
   cloud.addImage("cloud_image",cloud_image);
   cloud.scale=0.5;
   cloud.velocityX=-3;
   cloud.lifetime=200;
   cloud.depth=trex.depth-1;
   cloud_group.add(cloud);
   
    
}

}
function spawnObstacles() {
  if(frameCount % 60 === 0 ) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
     rand = Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
  break; 
   case 2: obstacle.addImage(obstacle2);
  break;  
   case 3: obstacle.addImage(obstacle3);
  break;  
   case 4: obstacle.addImage(obstacle4);
  break;  
   case 5: obstacle.addImage(obstacle5);
  break;  
   case 6: obstacle.addImage(obstacle6);
  break;  
  default:break;
    
}
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacle_group.add(obstacle);
    //obstacle_group.setColliderEach("rectangle", 0, 0, 20, 80, -45);
  }
}
function keyPressed(){
  if(keyDown("space") && trex.y>160 && gamestate==="play") {
    trex.velocityY = -11;
  }
}
/*async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
    bg=0;
  }
  else{
    bg=1000;
  }
}*/
