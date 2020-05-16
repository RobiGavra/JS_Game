export default class MenuManager{
    constructor(gameWidth, gameHeight){        
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight
    }

    drawPause(ctx){ 
        ctx.rect(0,0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    drawMenu(ctx){
        ctx.rect(0,0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press space bar", this.gameWidth / 2, this.gameHeight / 2);
    }

    drawGameOver(ctx){
        ctx.rect(0,0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Over!", this.gameWidth / 2, this.gameHeight / 2);
    }

    drawFinish(ctx){ 
        ctx.rect(0,0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Finish", this.gameWidth / 2, this.gameHeight / 2);
    }
}