
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ground,ground1;
var bg_img;
var ball;
var ballImg;
var blower;

var isGameOver = false;


function preload(){
bg_img = loadImage("background.png");
ballImg = loadImage("ball.png");
}



function setup() {
  createCanvas(1000,700);

  engine = Engine.create();
  world = engine.world;

  blower = createImg("balloon.png");
  blower.position(450,500);
  blower.size(100,100);
  blower.mouseClicked(blow);



  var ball_options={
    restitution:0.8
  }
  
  
  ground = new Ground(200,550,1600,20);
  ground1 = new Ground(200,200,1600,20);

  ball = Bodies.circle(500,220,20,ball_options);
  World.add(engine.world, ball)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() 
{
  background(51);
  image(bg_img,0,0,1000,690)

  push();
  imageMode(CENTER);
  if(ball!=null){
    image(ballImg,ball.position.x,ball.position.y,70,70);
  }
  pop();

  Engine.update(engine);
  ground.show();
  ground1.show();


  if(collide(ball,ground)==true)
  {
    isGameOver = true;
    gameOver();
  }

  
if(keyIsDown("DOWN_ARROW")){
  blow();
}
  
}

function blow(){

  Matter.Body.applyForce(ball,{x:0,y:0},{x:0,y:0.05})

}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,ball);
               ball = null;
               return true; 
            }
            else{
              return false;
            }
         }
}



function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
