var gamestate = "start";
var playButton;
var player;
var edges;
var basketballCourt;
var playerLeftImg, playerRightImg, defenderLeftImg, defenderRightImg, defender1, defender2, defenderGroup;
var ball, ballImg;
var right = true;
var collider1, collider2;
var timeCounter = 0;
var ground;
var chances = 10;
var points = 0;
var restartButton;
var fc = 0;
var fc2;
var once = true;
var endtime;
var startTime;
var a = 1;
var scoreSound, catchSound, bounceOffSound;

function preload()
  {
    basketballCourt = loadImage("Animations/basketballCourt.jpg");
    playerLeftImg = loadImage("Animations/playerleft.png");
    playerRightImg = loadImage("Animations/playerright.png");
    defenderLeftImg = loadImage("Animations/defenderLeft.png");
    defenderRightImg = loadImage("Animations/defenderRight.png");
    ballImg = loadImage("Animations/basketball.png");

    scoreSound = loadSound("score.mp3");
    catchSound = loadSound("catch.mp3");
    bounceOffSound = loadSound("bounceOff.mp3");
  }


function setup() {
  createCanvas(windowWidth,windowHeight);
  playButton = createButton("Play");
  playButton.position(width/2, height/2 + 200 + 100);
  
  defender1 = createSprite(width/2, height/3 + 100);
  defender1.velocityX = 8;
  defender2 = createSprite(width/2, height/3 + 100);
  defender2.velocityX = -6;
  
  player = createSprite(width/2, height/3, 50, 50);
  player.addImage(playerRightImg);
  
  edges = createEdgeSprites();
  
  //player.debug = true;
  player.setCollider("rectangle", 0, 0, 100, 200);
  
  defender1.addImage(defenderRightImg);
  defender2.addImage(defenderLeftImg);
  
  ball = createSprite(width/2, height/2);
  ball.addImage(ballImg);
  ball.scale = 0.1;
  
  collider1 = createSprite(795, windowHeight/5, 70, 4);
  collider1.shapeColor = "green";
  collider2 = createSprite(795, windowHeight/5 + 4, 70, 4);
  collider2.shapeColor = "yellow";
  
  ground = createSprite(width/2, height/3 + 200, width, 10);
  ground.visible = false;
  
  //defender1.debug = true;
  defender1.setCollider("rectangle", 0, 0, 150, 250);
  defender2.setCollider("rectangle", 0, 0, 150, 250);
  
  defenderGroup = new Group();
  defenderGroup.add(defender1);
  defenderGroup.add(defender2);

  restartButton = createButton("Restart");
  restartButton.position(width/2, height/2 + 200);
  restartButton.hide();


}

function draw() {
  background(255,255,255);  
  if(gamestate == "start")
  {
      start();
  }
  if(gamestate == "play")
  {
      play();
      drawSprites();
  }
  player.collide(edges);
  if(gamestate == "play2")
  {
      play2();
  }
  console.log(gamestate);
  if(gamestate == "play" || gamestate == "play2")
  {
      textSize(30);
      textFont("Tahoma")
      fill("black");
      text("Chances: " + chances, 100, 100);
      text("Points: " + points, 100, 200);
  }
if(chances == 0)
{
    if(a == 1)
    {
        getBeginTime();
        a = 2;
    }
    getTime();
    if(startTime + 3 == endtime)
    {
      gamestate = "end";
    }
}
if(gamestate == "end")
{
    end();
}
console.log(startTime);
getTime();

}

async function getTime()
{
        var response = await fetch("http://worldtimeapi.org/api/timezone/Australia/Brisbane");
        var JSONresponse = await response.json();
        endtime = JSONresponse.unixtime;

}

async function getBeginTime()
{
  var response = await fetch("http://worldtimeapi.org/api/timezone/Australia/Brisbane");
  var JSONresponse = await response.json();
  startTime = JSONresponse.unixtime;
}