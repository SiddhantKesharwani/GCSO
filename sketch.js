//Declaration of sprite variables
var car,wall;
var speed,weight;
var deformation;
var rejectedCars;
var restart, restart_img;
var carschecked;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload()
{
   restart_img=loadImage("restart.png")
}

function setup() {
  //To create canvas
  createCanvas(1600,400);
  
  //Car sprite
  car=createSprite(40,200,50,50);

  //Wall sprite
  wall=createSprite(1400,200,50,height/2);

  //Randomizing speed and weight of car
  speed=Math.round(random(55,90));
  weight=Math.round(random(400,1500));

  //To make car velocity value as speed
  car.velocityX=speed;
  
  //Assigning value of deformation
  deformation=0.5*weight*speed*speed/22500;
  
  //Restart sprite
  restart=createSprite(800,200,10,10);
  restart.addImage(restart_img);
  restart.scale=0.4;

  //initial value of rejected cars;
  rejectedCars=0;

  //intial value of carschecked
  carschecked=1;

}

function draw() {
  //To assign the background
  background(0);  

  if(gameState===PLAY)
  {
  
   restart.visible=false;

   if(wall.x-car.x<wall.width/2+car.width/2)
   {
     //To assign the velocity 0 to car
     car.velocityX=0;
    
     //Deformation conditions
     if(deformation<100)
     {
       car.shapeColor=color(0,255,0);
       gameState=END;
     } else if(deformation<180 && deformation>100)
     {
       car.shapeColor=color(230,230,0);
       gameState=END;
     } else if(deformation>180)
     {
       car.shapeColor=color(255,0,0)
       rejectedCars=rejectedCars+1;
       gameState=END;
     }
   }

  } else if(gameState===END)
  {
    restart.visible=true;;
    
    if(mousePressedOver(restart))
    {
     reset();
     gameState=PLAY;
    }
  }

  
  
  //To draw the sprites
  drawSprites()

  fill("white");
  strokeWeight(0);
  stroke("yellow");
  textSize(18);
  text("Rejected Cars: "+rejectedCars,100,50);
  text("Cars Tested: ",carschecked,1400,50);
}

function reset()
{
  car.x=50;
  car.velocityX=speed;
  carschecked=carschecked+1;
}