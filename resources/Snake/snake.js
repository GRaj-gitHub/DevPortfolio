const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

let snakes;
let snakeHead;
let snakeW, snakeH;

let interval;
let dx, dy;
let randomX, randomy;

let downPressed, upPressed, leftPressed, rightPressed;

let score;

document.addEventListener("keydown", HandleKeyDown);
document.addEventListener("keyup", HandleKeyUp);

InitVar();
RandomNoGen();
DrawSnake();
DrawFood();
DrawScore();
//MoveSnake();
NavControll();

function InitVar()
{
    snakes = [
        { x:10, y:10 },
        { x:20, y:10 },
        { x:30, y:10 },
    ]

    snakeHead = {x : 10, y:10}
    snakeW = 10;
    snakeH = 10;

    interval = null;

    score = 0;

    randomX = 0;
    randomY = 0; 

    dx = snakeW;
    dy = 0;
    
    downPressed = upPressed = leftPressed = rightPressed = false;
}


function DrawSnake()
{
    snakes.forEach(snake => {
        
        ctx.beginPath();
        ctx.rect(snake.x, snake.y, snakeW, snakeH);
        ctx.fillStyle = "#DE0D92";
        ctx.fill();
        ctx.closePath();

    }
    );
}

function MoveSnake()
{
    if(!interval)
    {
        interval = setInterval(() => {
        
            NavControll();
            CollisionDetection();
                
            const head = { x : snakes[0].x + dx, y : snakes[0].y + dy };
            snakes.unshift(head);
            snakes.pop();
            snakeHead = {x : snakes[0].x + dx, y : snakes[0].y + dy};
                
            ctx.clearRect(0,0,canvas.width,canvas.height);
            DrawFood();
            DrawScore();
            DrawSnake();
                
                
        },
        100
        );
    }
}

function RandomNoGen()
{
    //Dividing and multiplying by 10 so as to get a position precisil equal to the snakes pos
    randomX = Math.floor(Math.random() * 470 / 10) * 10;
    randomY = Math.floor(Math.random() * 370 / 10) * 10; 
}

function DrawFood()
{
   
    ctx.beginPath();
    ctx.rect(randomX, randomY, snakeW, snakeH);
    ctx.fillStyle = "#4D6CFA";
    ctx.fill();
    ctx.closePath();

}

function NavControll()
{
   
    if(downPressed && dy != -snakeW)
    {
        dy = snakeW;
        dx = 0;
    }

    if(upPressed && dy != snakeW)
    {
        dy = -snakeW;
        dx = 0;
    }

    if(leftPressed && dx != snakeW)
    {
        dx = -snakeW;
        dy = 0;
    }

    if(rightPressed && dx != -snakeW)
    {
        dx = snakeW;
        dy = 0;
    }

}



function CollisionDetection()
{
    if(snakes[0].x === randomX && snakes[0].y === randomY)
    {
        snakes.push({ x : randomX, y : randomY } );
        score += 5;
        RandomNoGen();
    }


    if( snakes[0].x > canvas.width || snakes[0].x < 0
        || snakes[0].y > canvas.height || snakes[0].y < 0)
        {
            GameOver();
        }
    
    snakes.forEach(snake => {

        if(snake != snakes[0])
        {
            if(snake.x === snakeHead.x && snake.y === snakeHead.y)
            {
                GameOver();
            }
        }
    })
    

}

function DrawScore()
{
    ctx.beginPath();
    ctx.font = "10px Verdana";
    ctx.fillStyle = "#083D77";
    ctx.fillText("Score: " + score, 10, 10);
    ctx.fill();
    ctx.closePath();
}

function GameOver()
{
    alert("Game Over!");
    clearInterval(interval);
    intervel = null;
    InitVar();
    RandomNoGen();
}

function HandleKeyDown(e)
{
    if(e.key === "ArrowDown")   { downPressed = true; }
    if(e.key === "ArrowUp")     { upPressed = true; }
    if(e.key === "ArrowLeft")   { leftPressed = true; }
    if(e.key === "ArrowRight")  { rightPressed = true; }  
}


function HandleKeyUp(e)
{
    if(e.key === "ArrowDown")   { downPressed = false; }
    if(e.key === "ArrowUp")     { upPressed = false; }
    if(e.key === "ArrowLeft")   { leftPressed = false; }
    if(e.key === "ArrowRight")  { rightPressed = false; }
}