export default class Player{
    constructor(gameManager, playerWidth, playerHeight, positionX, positionY, canMoveX=true, canMoveY=true, playerColor='#0ff'){
        this.gameWidth = gameManager.gameWidth;
        this.gameHeight = gameManager.gameHeight;
        this.width = playerWidth;
        this.height = playerHeight;
        this.canMoveX = canMoveX;
        this.canMoveY = canMoveY;
        this.playerColor = playerColor;

        this.maxSpeed = 7;
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
        this.keepPlayerInMap()
    }

    moveLeft(){
        if(this.canMoveX) this.speed.x = -this.maxSpeed;
    }

    moveRight(){
        if(this.canMoveX) this.speed.x = this.maxSpeed;
    }

    jump(){
        if(this.canMoveY) this.speed.y = -this.maxSpeed;
    }

    stop(){
        this.speed.x = 0;
        this.speed.y = 0;
    }

    keepPlayerInMap(){
        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
        if(this.position.y < 0) this.position.y = 0;
    }
}