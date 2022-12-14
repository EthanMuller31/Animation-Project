window.addEventListener('load', function()
{
const GAME_WIDTH = 640;
const GAME_HEIGHT = 360;
let gameIsLive = true;
let enemies = [
    {
    xPos: 200,
    yPos: 40,
    width: 40,
    height: 40,
    speedY: 2,
    },
    {
    xPos: 300,
    yPos: 180,
    width: 40,
    height: 40,
    speedY: 1,
    },
    {
    xPos: 400,
    yPos: 60,
    width: 40,
    height: 40,
    speedY: 1,
    },
    {
    xPos: 500,
    yPos: 100,
    width: 40,
    height: 40,
    speedY: 2,
    },
];
let player = {
    xPos: 10,
    yPos: 100,
    speedX: 3,
    speedY: 3,
    width: 40,
    height: 40,
    isMoving: false
};
function moveSelection(event)
{
    switch(event.keyCode)
    {
        case 38:
        moveUp();
        break;
        case 40:
        moveDown();
        break;
        case 37:
        moveLeft();
        break;
        case 39:
        moveRight();
        break;
    }
}
function moveLeft()
{
    player.xPos += player.speedX - 5;
}
function moveUp()
{
    player.yPos += player.speedY - 5;
}
function moveRight()
{
    player.xPos += player.speedX + 5;
}
function moveDown()
{
    player.yPos += player.speedY + 5;
}
let goal ={
    xPos: 580,
    yPos: 160,
    width: 50,
    height: 36
}
let sprites =
{
};
let movePlayer = function()
    {
    player.isMoving = true;
    };
let stopPlayer = function()
    {
    player.isMoving = false;
    };
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
//event listener to move player
canvas.addEventListener("mousedown", movePlayer);
canvas.addEventListener("mouseup", stopPlayer);
var checkForCollision = function (rect1, rect2)
{
    let closeOnWidth = Math.abs(rect1.xPos - rect2.xPos) <= Math.max(rect1.width, rect2.width);
    let closeOnHeight = Math.abs(rect1.yPos - rect2.yPos) <= Math.max(rect1.height, rect2.height);
    return closeOnWidth && closeOnHeight;
}
let load = function()
{
    sprites.player = new Image();
    sprites.player.src = "images/LeBronk.png";
    sprites.background = new Image();
    sprites.background.src = "images/background.png";
    sprites.enemy = new Image();
    sprites.enemy.src = "images/coke.png";
    sprites.goal = new Image();
    sprites.goal.src = "images/sprunk.png";
}
let step = function()
    {
    update();
    draw();
    if (gameIsLive)
    {
    window.requestAnimationFrame(step);
    }
    };
let update = function()
    {
    if(player.isMoving)
        {
        player.xPos += player.speedX;
        }
        if(checkForCollision(player, goal))
            {
                gameIsLive = false;
                alert("You won!")
                window.location = "";
            }
    enemies.forEach(function(element)
        {
            if(checkForCollision(player, element))
            {
                gameIsLive = false;
                alert("Game Over!")
                window.location = "";
            }
        element.yPos += element.speedY;
        if(element.yPos <= 10)
            {
            element.yPos = 10;
            element.speedY *= -1;
            }
        else if(element.yPos >= GAME_HEIGHT - 50)
            {
            element.yPos = GAME_HEIGHT - 50;
            element.speedY *= -1;
            }
        }
    )};
let draw = function()
    {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.drawImage(sprites.background, 0, 0);
    ctx.drawImage(sprites.player, player.xPos, player.yPos);
    ctx.drawImage(sprites.goal, goal.xPos, goal.yPos);
    enemies.forEach(function(element, index)
        {
        ctx.drawImage(sprites.enemy, element.xPos, element.yPos);
        })
    };
    window.addEventListener("keydown", moveSelection, true);
    load();
step();
});