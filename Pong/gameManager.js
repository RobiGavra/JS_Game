import Player from '../Common/Player.js';
import Ball from '../Common/Ball.js';
import DuoInputHandler from '../Common/DuoInputHandler.js';
import MenuManager from '../Common/MenuManager.js';
import {BallColision} from '../Common/ColisionDetector.js';

export default class GameManager{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;      
        this.player1 = new Player(this, 150, 25,this.gameWidth/2 - 150/2,this.gameHeight-25-10,true,false);
        this.player2 = new Player(this, 150, 25,this.gameWidth/2 - 150/2,10,true,false,'#F9D71C');
        this.player1Score = 0;
        this.player2Score = 0;
        this.ball = new Ball(this);
        this.gameObjects = [];
        new DuoInputHandler(this.player1, this.player2, this);
        this.lives = 3;
        this.currentLevel = 0;
        this.menuManager = new MenuManager(this.gameWidth, this.gameHeight);
        this.gameState = GameState.Menu;
    }

    start(){
        if(this.gameState !== GameState.Menu) return;    
        this.ball.reset();
        this.gameObjects = [this.player1,this.player2, this.ball];
        this.gameState = GameState.Running;
    }

    update(deltaTime){
        if(this.lives === 0) this.gameState = GameState.Finish;
        if(this.gameState === GameState.Paused || this.gameState === GameState.Menu || this.gameState === GameState.Finish) return; 
        
        this.gameObjects.forEach(object => object.update(deltaTime));
        this.keepScore();
        this.playerColision();
    }

    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
        
        if(this.gameState === GameState.Paused) this.menuManager.drawPause(ctx);
        if(this.gameState === GameState.Menu) this.menuManager.drawMenu(ctx);     
        if(this.gameState === GameState.Finish) this.menuManager.drawFinish(ctx);
        if(this.gameState === GameState.Running) this.drawScore(ctx);
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
    
    playerColision(){
        let colisionDetector1 = new BallColision(this.ball, this.player1);

        if(colisionDetector1.topColision()){
            this.ball.speed.y = -this.ball.speed.y;
            this.ball.position.y = this.player1.position.y - this.ball.size;
        }

        let colisionDetector2 = new BallColision(this.ball, this.player2);

        if(colisionDetector2.topColision()){
            this.ball.speed.y = -this.ball.speed.y;
            this.ball.position.y = this.player2.position.y + this.player2.height + this.ball.size;
        }

        if(colisionDetector2.leftColision() || colisionDetector2.rightColision()){
            this.ball.speed.x = -this.ball.speed.x;
        }
    }

    keepScore(){
        if(this.ball.position.y + this.ball.size >= this.gameHeight){
            this.ball.reset();
            this.lives--;
            this.player2Score++;
        }
        
        if(this.ball.position.y - this.ball.size <= 0){
            this.ball.reset();
            this.lives--;
            this.player1Score++;
        }
    }

    drawScore(ctx){
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.player1Score, this.gameWidth - 30, this.gameHeight - 50);
        ctx.fillText(this.player2Score, 30, 80);
    }
}

const GameState = {
    Paused: 0,
    Running: 1,
    Menu: 2,
    Finish: 3
};