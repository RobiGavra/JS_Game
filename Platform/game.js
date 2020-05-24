import GameManager from './gameManager.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const gameWidth = 800;
const gameHeight = 600;

let gameManager = new GameManager(gameWidth, gameHeight);

let lastTime = 0;

function gameLoop(timeStamp){
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    
    ctx.clearRect(0,0,gameWidth,gameHeight);

    gameManager.update(deltaTime);
    gameManager.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);