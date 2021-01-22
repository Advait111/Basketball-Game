function start()
{
    background("blue");
    playButton.show();
    textSize(80);
    fill("orange");
    textFont("Georgia");
    text("Basketball Game", width/2 - 300, height/2 - 100);
    rectMode(CENTER);
    rect(width/2, height/2 + 100, 700, 200);
    textSize(40);
    fill("black");
    text("Press a, s or d to shoot", width/2 - 200, height/2 + 100)
    text("Press enter or space to get the ball back", width/2 - 350, height/2 + 150);
    playButton.mousePressed(function(){
        gamestate = "play";
        playButton.hide();
    })
}

function play()
{
    background(basketballCourt);
    control();
    //console.log( mouseX +","+ mouseY +","+  windowHeight);
    if(right == true)
    {
        ball.x = player.x + 40;
        ball.y = player.y - 10;
    }
    else if(right == false)
    {
        ball.x = player.x - 40;
        ball.y = player.y - 10;
    }
    if(chances > 0 && player.isTouching(defenderGroup) == false)
    {
    if(keyDown("a"))
    {
        ball.velocityY = -7;
        if(player.x <= width/4)
        {
                ball.velocityX = 9;
        }
        else if(player.x > width/4 && player.x < width/2)
        {
                ball.velocityX = 5;
        }
        else if(player.x >= width/2 && player.x < (3*width)/4 )
        {
                ball.velocityX = -5;
        }
        else if(player.x >= (3*width)/4)
        {
                ball.velocityX = -9;
        }
        gamestate = "play2";
        chances--;
    }
    if(keyDown("s"))
    {
        ball.velocityY = -9;
        if(player.x <= width/4)
        {
                ball.velocityX = 9;
        }
        else if(player.x > width/4 && player.x < width/2)
        {
                ball.velocityX = 5;
        }
        else if(player.x >= width/2 && player.x < (3*width)/4 )
        {
                ball.velocityX = -5;
        }
        else if(player.x >= (3*width)/4)
        {
                ball.velocityX = -9;
        }
        gamestate = "play2";
        chances--;
    }
    if(keyDown("d"))
    {
        ball.velocityY = -11;
        if(player.x <= width/4)
        {
                ball.velocityX = 14;
        }
        else if(player.x > width/4 && player.x < width/2)
        {
                ball.velocityX = 7;
        }
        else if(player.x >= width/2 && player.x < (3*width)/4 )
        {
                ball.velocityX = -7;
        }
        else if(player.x >= (3*width)/4)
        {
                ball.velocityX = -14;
        }
        gamestate = "play2";
        chances--;
    }
}
   defenderMovement();
   drawSprites();
}

function play2()
{
    background(basketballCourt);
    control();
    if(ball.y < height/5)
    {
            ball.velocityY += 1; 
    }
    if(keyDown("space") || keyDown("enter"))
    {
            gamestate = "play";
            catchSound.play();
    }
    drawSprites();
    defenderMovement();
    score();
    if(ball.isTouching(defenderGroup))
    {
            ball.bounceOff(defenderGroup);
            bounceOffSound.play();
    }
}

function control()
{
        if(keyDown("left"))
        {
            player.x = player.x - 5;
            player.addImage(playerLeftImg);
            right = false;
            
            
        }
        if(keyDown("right"))
        {
                player.x = player.x + 5; 
                player.addImage(playerRightImg);
                right = true;
        }

        if(player.y >= 404)
        {
            if(keyDown("up"))
        {
                player.y = player.y - 5;
        }
        }

        if(keyDown("down"))
        {
                player.y = player.y + 5;
        }
}

function defenderMovement()
{
    defenderGroup.bounceOff(edges);
    if(frameCount%200==0)
    {
            defender1.velocityY = -12;
    }
    if(frameCount%300==0)
    {
        defender2.velocityY = -12
    }
    defender1.velocityY = defender1.velocityY + 0.8;
    defender2.velocityY = defender2.velocityY + 0.8;
    
    defenderGroup.collide(ground);
}

function score()
{
     if(ball.isTouching(collider1))
     {
         if(ball.isTouching(collider2))
         {
            ball.y = height/2;
            ball.velocityY = 0;
            ball.velocityX = 0;  
            points++;
            scoreSound.play();
                
         }
     }   
}
function end()
{
        background("blue");
        textSize(50);
        fill("orange");
        if(points <= 6)
        {
                text("You lost!", width/2 - 200, height/2 -200);
        }
        else if(points >= 7)
        {
                text("You won!", width/2 - 200, height/2 - 200);
        }
        text("You scored " + points + " out of 10 tries.", width/2 - 300, height/2); 

        restartButton.show();

        restartButton.mousePressed(function(){
                gamestate = "start";
                chances = 10;
                points = 0;
                restartButton.hide();
                defender1.x = width/2 + 300;
                defender2.x = width/2 - 300; 
                defender1.y = height/3;
                defender2.y = height/3;
                a = 1; 
        })

}