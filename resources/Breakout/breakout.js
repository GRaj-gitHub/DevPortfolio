const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
       
        
let x, y, dx, dy;
let radius;
let paddleW, paddleX, paddleY; 
let brickW, brickH, brickX, brickY, brickRowCount, brickColCount;
let bricks = [];

let interval;
let score;
let totalBricks;

let leftPressed;
let rightPressed;
InitVar();
DrawPaddle();
DrawBall();
DrawBricks();
DrawScore();
NavigationCotroll();

function InitVar()
{
    score = 0;

    leftPressed = false;
    rightPressed = false;
    
    paddleW = 60;
    paddleX = canvas.width / 2 - paddleW / 2;
    paddleY = canvas.height - 10;

    brickW = 80;
    brickH = 20;
    brickX = 10;
    brickY = 35;

    brickRowCount = 4;
    brickColCount = 5;
    totalBricks = brickRowCount * brickColCount;
    for(let i = 0; i < brickColCount; i++)
    {
        bricks[i] = [];
        for(let j = 0; j < brickRowCount; j++)
        {
            bricks[i][j] = { x:0, y:0, isVisible:true };
        }

    }
    
    radius = 12;
    
    x = canvas.width / 2;
    y = canvas.height - 25;
    dx = 6.5;
    dy = -5;
}

function StartGame()
{   
    if(!interval)
    {
        interval = setInterval(() => {
                
        if(rightPressed)
        {
            if(paddleX === canvas.width - paddleW)
            {
                paddleX = canvas.width - paddleW;
            }
            else
            {
                paddleX += 10;
            }
        }
        if(leftPressed)
        {
            if(paddleX === 0)
            {
                paddleX = 0;
            }
            else
            {
                paddleX -= 10;
            }
        }
        CollisionDetection();
        x += dx;
        y += dy;
        GameOver();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawBricks();
        DrawPaddle();
        DrawBall();
        DrawScore();
    }, 
    50
    );
    }
}

function NavigationCotroll()
{
    document.addEventListener("keydown", HandleKeyPress)
    document.addEventListener("keyup", HandleKeyRelease)
    
    function HandleKeyPress(e)
    {
        if(e.key === "ArrowLeft") 
        {
            leftPressed = true;
        }

        if(e.key === "ArrowRight") 
        {
            rightPressed = true;
        }
    }

    function HandleKeyRelease(e)
    {
        if(e.key === "ArrowLeft") 
        {
            leftPressed = false;
        }

        if(e.key === "ArrowRight") 
        {
            rightPressed = false;
        }
    }

}
       
      
            
function DrawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = "#DA4167";
    ctx.fill();
    ctx.closePath();
}

function DrawPaddle()
{
    
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleW, 10);
    ctx.fillStyle = "#083D77";
    ctx.fill();
    ctx.closePath();
}

function DrawBricks()
{

    for(let i = 0; i < brickColCount; i++)
    {
        for(let j = 0; j < brickRowCount; j++)
        {
            if(bricks[i][j].isVisible === true)
            {
                ctx.beginPath();
                const brickOffsetX = brickX + (i * 100);
                const brickOffsetY = brickY + (j * 40);
                bricks[i][j].x = brickOffsetX;
                bricks[i][j].y = brickOffsetY;
                ctx.rect(brickOffsetX, brickOffsetY, brickW, brickH);
                ctx.fillStyle = "#85CB33";
                ctx.fill();
                ctx.closePath();
            }
        }
        
    }
}

function DrawScore()
{
    ctx.beginPath();
    ctx.font = "18px Verdana";
    ctx.fillStyle = "#083D77";
    ctx.fillText("Score: " + score, 10,20);
    ctx.fill();
    ctx.closePath();
}

function CollisionDetection()
{
    if(x + dx >= canvas.width || x + dx <= 0)
    {
        dx = -dx;
    }
    if(y + dy > paddleY - radius && y + dy < paddleY)
    {
        if(x + dx > paddleX && x + dx < (paddleX + paddleW))
        {
            dy = -dy;
            dx = dx + ( x + dx - paddleX)/100;
        }
    }
    if(y + dy <= 0)
    {
        dy = -dy;
    }

    for(let i = 0; i < bricks.length; i++)
    {
        for(let j = 0; j < bricks[i].length; j++)
        {
            if(bricks[i][j].isVisible === true)
            {
                if ( x + dx > bricks[i][j].x && x + dx < (bricks[i][j].x + brickW) && y + dx > bricks[i][j].y && y + dy < (bricks[i][j].y + brickH))
                {
                    dy = -dy;
                    bricks[i][j].isVisible = false;
                    score += 1;
                }
            }
        }
    }
    
}

function GameOver()
{
    if(score === totalBricks)
    {
        InitVar();
        clearInterval(interval);
        interval = null;
        alert("Congratulations You Won!")
    }
    else if(y + dy === canvas.height)
    {
        InitVar();
        clearInterval(interval);
        interval = null;
        alert("Game Over")
    }
    
}

