import Player from '../Common/Player.js';
import Ball from '../Common/Ball.js';
import {buildLevel , level1 , level2} from './levels.js';
import InputHandler from '../Common/InputHandler.js';
import MenuManager from '../Common/MenuManager.js';
import {BallColision} from '../Common/ColisionDetector.js';

export default class GameManager{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;      
        this.player1 = new Player(this, 150, 25,this.gameWidth/2 - 150/2,this.gameHeight-25-10,true,false);
        this.player2 = new Player(this, 150, 25,this.gameWidth/2 - 150/2,10,true,false);
        this.ball = new Ball(this);
        this.gameObjects = [];
        new InputHandler(this.player1, this);
        new InputHandler(this.player2, this);
        this.lives = 2;
        this.levels = [level1, level2];
        this.currentLevel = 0;
        this.menuManager = new MenuManager(this.gameWidth, this.gameHeight);
        this.gameState = GameState.Menu;
    }

    start(){
        if(this.gameState !== GameState.Menu && this.gameState !== GameState.NewLevel) return;    
        this.ball.reset();
        this.gameObjects = [this.player1,this.player2, this.ball];
        this.gameState = GameState.Running;
    }

    update(deltaTime){
        if(this.lives === 0) this.gameState = GameState.GameOver;
        if(this.gameState === GameState.Paused || this.gameState === GameState.Menu 
            || this.gameState === GameState.GameOver || this.gameState === GameState.Finish) return; 
        
        this.gameObjects.forEach(object => object.update(deltaTime));
        this.playerColision();
    }

    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
        
        if(this.gameState === GameState.Paused) this.menuManager.drawPause(ctx);
        if(this.gameState === GameState.Menu) this.menuManager.drawMenu(ctx);     
        if(this.gameState === GameState.GameOver) this.menuManager.drawGameOver(ctx);
        if(this.gameState === GameState.Finish) this.menuManager.drawFinish(ctx);
    }

    togglePause(){
        if(this.gameState == GameState.Paused){
            this.gameState = GameState.Running;
        }
        else {
            this.gameState = GameState.Paused;
        }
    }
    
    playerColision(){
        let colisionDetector1 = new BallColision(this.ball, this.player1);

        if(colisionDetector1.topColision()){
            this.ball.speed.y = -this.ball.speed.y;
        }

        let colisionDetector2 = new BallColision(this.ball, this.player2);

        if(colisionDetector2.topColision()){
            this.ball.speed.y = -this.ball.speed.y;
        }

        // if(colisionDetector.leftColision() || colisionDetector.rightColision()){
        //     this.ball.speed.x = -this.ball.speed.x;
        // }
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