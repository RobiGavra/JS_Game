export default class Ball{
    constructor(gameManager){
        this.size = 10;
        this.gameWidth = gameManager.gameWidth;
        this.gameHeight = gameManager.gameHeight;
        this.gameManager = gameManager;
        this.reset();
    }

    reset(){
        this.speed = {
            x: 4,
            y: -2
        };

        this.position = {
            x: this.getRndInteger(10, this.gameWidth - 10),
            y: this.gameHeight / 2
        };
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    draw(ctx){      
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = '#f0f'
        ctx.fill();
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        this.keepBallInMap();
    }

    keepBallInMap(){
        if(this.position.x + this.size > this.gameWidth || this.position.x - this.size  < 0) this.speed.x = -this.speed.x;
        if(this.position.y + this.size > this.gameHeight || this.position.y - this.size  < 0) this.speed.y = -this.speed.y;
    }
}