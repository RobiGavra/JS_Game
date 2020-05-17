export default class DuoInputHandler{
    constructor(player1, player2, gameManager){
        document.addEventListener("keydown", event => {
            console.log(event.keyCode)

            switch(event.keyCode){
                case 37:
                    player1.moveLeft();
                    break;

                case 38:
                    player1.jump();
                    break;
                    
                case 39:
                    player1.moveRight();
                    break;
                
                case 68:
                    player2.moveRight();
                    break;
                    
                case 65:
                    player2.moveLeft();
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
                    if(player1.speed.x < 0) player1.stop();
                    break;

                case 39:
                    if(player1.speed.x > 0) player1.stop();
                    break;

                case 68:
                    if(player2.speed.x > 0) player2.stop();
                    break;

                case 65:
                    if(player2.speed.x < 0) player2.stop();
                    break;
 
                case 38:
                    player1.stop();
                    break;                               
            }
        });
    }
}