import Player from '../Common/Player.js';
import Brick from '../Common/Brick.js';
import {buildLevel , level1 , level2, level3} from './levels.js';
import InputHandler from '../Common/InputHandler.js';
import MenuManager from '../Common/MenuManager.js';
import {Colision} from '../Common/ColisionDetector.js';

export default class GameManager{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;      
        this.player = new Player(this, 50, 50,this.gameWidth/2 - 50/2,this.gameHeight-50-10,true,true,'#f00');
        this.lastBrick = new Brick(this,{x:this.gameWidth/2 - 150/2, y:144}, 150, 24, '#F9D71C')
        this.bricks = [];
        new InputHandler(this.player, this);
        this.levels = [level1, level2, level3];
        this.currentLevel = 0;
        this.menuManager = new MenuManager(this.gameWidth, this.gameHeight);
        this.gameState = GameState.Menu;
    }

    start(){
        if(this.gameState !== GameState.Menu && this.gameState !== GameState.NewLevel) return;    
        if(this.currentLevel < this.levels.length) this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.bricks = [...this.bricks, this.lastBrick];
        this.gameState = GameState.Running;
    }

    update(deltaTime){
        if(this.gameState === GameState.Paused || this.gameState === GameState.Menu 
            || this.gameState === GameState.GameOver || this.gameState === GameState.Finish) return; 
        if(this.currentLevel === this.levels.length) this.gameState = GameState.Finish;

        this.goToNextLevel();
        this.playerColision();

        this.player.update(deltaTime);
    }

    draw(ctx){
        [this.player, ...this.bricks].forEach(object => object.draw(ctx));
        
        if(this.gameState === GameState.Paused) this.menuManager.drawPause(ctx);
        if(this.gameState === GameState.Menu) this.menuManager.drawMenu(ctx);     
        if(this.gameState === GameState.GameOver) this.menuManager.drawGameOver(ctx);
        if(this.gameState === GameState.Finish) this.menuManager.drawFinish(ctx);
    }
    
    goToNextLevel(){
        let colisionDetectorForLastBrick = new Colision(this.lastBrick, this.player);

        if(colisionDetectorForLastBrick.topColision() && this.currentLevel < this.levels.length){ 
            this.currentLevel++;
            this.gameState = GameState.NewLevel;
            this.player.position.y = this.gameHeight - this.player.height - 10;
            this.player.position.x = this.gameWidth / 2- this.player.width / 2;
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
    
    playerColision(){
        this.bricks.forEach(brick =>{
            let colisionDetector = new Colision(brick, this.player);

            if(colisionDetector.bottomColision()){
                this.player.position.y = brick.position.y + brick.height;
            }

            if(colisionDetector.topColision()){
                this.player.isJumping = false;
                this.player.position.y = brick.position.y - this.player.height;
            }
            
            if(colisionDetector.leftColision()){
                this.player.position.x = brick.position.x - this.player.width;
                this.player.speed.x = 0;
            }

            if(colisionDetector.rightColision()){
                this.player.position.x = brick.position.x + brick.width;
                this.player.speed.x = 0;
            }
        });
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