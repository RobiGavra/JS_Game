import Player from '../Common/Player.js';
import Ball from '../Common/Ball.js';
import {buildLevel , level1 , level2, level3} from './levels.js';
import InputHandler from '../Common/InputHandler.js';
import MenuManager from '../Common/MenuManager.js';
import {BallColision} from '../Common/ColisionDetector.js';

export default class GameManager{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;      
        this.player = new Player(this, 150, 25,this.gameWidth/2 - 150/2,this.gameHeight-25-10,true,false);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        new InputHandler(this.player, this);
        this.lives = 2;
        this.levels = [level1, level2, level3];
        this.currentLevel = 0;
        this.menuManager = new MenuManager(this.gameWidth, this.gameHeight);
        this.gameState = GameState.Menu;
    }

    start(){
        if(this.gameState !== GameState.Menu && this.gameState !== GameState.NewLevel) return;    
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.player, this.ball];
        this.gameState = GameState.Running;
    }

    update(deltaTime){
        if(this.lives === 0) this.gameState = GameState.GameOver;
        if(this.gameState === GameState.Paused || this.gameState === GameState.Menu 
            || this.gameState === GameState.GameOver || this.gameState === GameState.Finish) return; 
        if(this.lives >= 0 && this.bricks.length === 0 && this.currentLevel === this.levels.length-1) this.gameState = GameState.Finish;
        
        this.goToNextLevel();
        console.log(this.currentLevel);
        console.log(this.levels.length);
        

        this.gameObjects.forEach(object => object.update(deltaTime));
        this.bricks.forEach(brick => this.brickColision(brick));
        this.playerColision();
        this.lifeLose();

        this.bricks = this.bricks.filter(object => !object.markedForDeletion);
    }

    draw(ctx){
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        
        if(this.gameState === GameState.Paused) this.menuManager.drawPause(ctx);
        if(this.gameState === GameState.Menu) this.menuManager.drawMenu(ctx);     
        if(this.gameState === GameState.GameOver) this.menuManager.drawGameOver(ctx);
        if(this.gameState === GameState.Finish) this.menuManager.drawFinish(ctx);
        if(this.gameState === GameState.Running) this.drawScore(ctx);
    }
    
    goToNextLevel(){
        if(this.bricks.length === 0 && this.currentLevel <= this.levels.length-2){ 
            this.currentLevel++;
            this.gameState = GameState.NewLevel;
            this.start();
        }
    }

    togglePause(){
        if(this.gameState == GameState.Paused){
            this.gameState = GameState.Running;
        }
        else {
            if(this.gameState !== GameState.Menu)
                this.gameState = GameState.Paused;
        }
    }

    brickColision(brick){
        let colisionDetector = new BallColision(this.ball, brick)

        if(colisionDetector.leftColision() || colisionDetector.rightColision()){
            this.ball.speed.x = -this.ball.speed.x;
            brick.markedForDeletion = true;
        }

        if(colisionDetector.topColision() || colisionDetector.bottomColision()){
            this.ball.speed.y = -this.ball.speed.y;
            brick.markedForDeletion = true;
        }
    }
    
    playerColision(){
        let colisionDetector = new BallColision(this.ball, this.player);

        if(colisionDetector.topColision()){
            this.ball.speed.y = -this.ball.speed.y;
            this.ball.position.y = this.player.position.y - this.ball.size;
        }

        if(colisionDetector.leftColision() || colisionDetector.rightColision()){
            this.ball.speed.x = -this.ball.speed.x;
        }
    }

    lifeLose(){
        if(this.ball.position.y + this.ball.size > this.gameHeight){
            this.lives--;
            this.ball.reset();
        }
    }

    drawScore(ctx){
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText('lives: ' + this.lives, 50, 30);
    }
}

const GameState = {
    Paused: 0,
    Running: 1,
    Menu: 2,
    GameOver: 3,
    NewLevel: 4,
    Finish: 5
};