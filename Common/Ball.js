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
            x: Math.floor(Math.random() * this.gameWidth),
            y: 400
        };
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

        if(this.position.y + this.size > this.gameHeight){
            this.gameManager.lives--;
            this.reset();
        }
    }

    keepBallInMap(){
        if(this.position.x + this.size > this.gameWidth || this.position.x - this.size  < 0) this.speed.x = -this.speed.x;
        if(this.position.y + this.size > this.gameHeight || this.position.y - this.size  < 0) this.speed.y = -this.speed.y;
    }
}