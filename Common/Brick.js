export default class Brick{
    constructor(gameManager, position, width = 80, height = 24, color = '#A9A9A9'){
        this.gameManager = gameManager;
        this.gameWidth = gameManager.gameWidth;
        this.gameHeight = gameManager.gameHeight;
        this.width = width;
        this.height = height;
        this.position = position
        this.markedForDeletion = false;
        this.color = color;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "white";
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.stroke();
    }
}