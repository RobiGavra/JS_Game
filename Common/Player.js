export default class Player{
    constructor(gameManager, playerWidth, playerHeight, positionX, positionY, canMoveX=true, canMoveY=true, playerColor='#0ff'){
        this.gameWidth = gameManager.gameWidth;
        this.gameHeight = gameManager.gameHeight;
        this.width = playerWidth;
        this.height = playerHeight;
        this.canMoveX = canMoveX;
        this.canMoveY = canMoveY;
        this.playerColor = playerColor;
        this.isJumping = false;

        this.maxSpeed = 7;
        this.jumpSpeed = 30;
        this.speed = {
            x: 0,
            y: 0
        };

        this.position = {
            x: positionX,
            y: positionY
        };
    }

    draw(ctx){
        ctx.fillStyle = this.playerColor;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.keepPlayerInMap();
        if(this.canMoveY) this.gravity();
    }

    moveLeft(){
        if(this.canMoveX) this.speed.x = -this.maxSpeed;
    }

    moveRight(){
        if(this.canMoveX) this.speed.x = this.maxSpeed;
    }

    jump(){
        if(this.canMoveY && !this.isJumping){
            this.speed.y = -this.jumpSpeed;
            this.isJumping = true;
        }
    }

    stop(){
        this.speed.x = 0;
        this.speed.y = 0;
    }

    keepPlayerInMap(){
        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
        if(this.position.y < 0) this.position.y = 0;
        if(this.position.y + this.height > this.gameHeight - 10) {
            this.position.y = this.gameHeight - this.height - 10;
            this.isJumping = false;
        }
    }

    gravity(){   
        this.speed.y += 0.6;
        this.speed.y *= 0.9;
    }
}