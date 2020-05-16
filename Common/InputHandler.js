export default class InputHandler{
    constructor(player, gameManager){
        document.addEventListener("keydown", event => {

            switch(event.keyCode){
                
                case 37:
                    player.moveLeft();
                    break;

                case 38:
                    player.jump();
                    break;
                    
                case 39:
                    player.moveRight();
                    break;
                    
                case 27:
                    gameManager.togglePause();
                    break;

                case 32:
                    gameManager.start();
                    break;
            }
        });

        document.addEventListener("keyup", event => {
           
            switch(event.keyCode){
                
                case 37:
                    if(player.speed.x < 0) player.stop();
                    break;

                case 39:
                    if(player.speed.x > 0) player.stop();
                    break;
                    
                case 38:
                    player.stop();
                    break;                               
            }
        });
    }
}