export class BallColision{
    constructor(ball, gameObject){
      this.bottomOfBall = ball.position.y + ball.size;
      this.topOfBall = ball.position.y - ball.size;
      this.leftOfBall = ball.position.x - ball.size;
      this.righOfBall = ball.position.x + ball.size;

      this.topOfObject = gameObject.position.y;
      this.bottomOfObject = gameObject.position.y + gameObject.height;
      this.leftSideOfObject = gameObject.position.x;
      this.rightSideOfObject = gameObject.position.x + gameObject.width;
    }

    topColision(){
      if(this.bottomOfBall >= this.topOfObject
        && this.topOfBall <= this.bottomOfObject 
        && this.leftOfBall >= this.leftSideOfObject
        && this.righOfBall <= this.rightSideOfObject) 
          return true;
      else
        return false;
    }

    bottomColision(){     
      if(this.topOfBall >= this.bottomOfObject
        && this.bottomOfBall <= this.topOfObject 
        && this.leftOfBall >= this.leftSideOfObject
        && this.righOfBall <= this.rightSideOfObject) 
          return true;
      else
        return false;
    }

    leftColision(){
      if(this.righOfBall >= this.leftSideOfObject
        && this.leftOfBall <= this.rightSideOfObject
        && this.topOfBall >= this.topOfObject 
        && this.bottomOfBall <= this.bottomOfObject)
          return true;
      else
        return false;
    }

    rightColision(){
      if(this.leftOfBall >= this.rightSideOfObject
        && this.righOfBall <= this.leftSideOfObject
        && this.topOfBall >= this.topOfObject 
        && this.bottomOfBall <= this.bottomOfObject)
          return true;
      else
        return false;
    }
}

export class Colision{
  constructor(brick, gameObject){
    this.topOfBrick = brick.position.y;
    this.bottomOfBrick = brick.position.y + brick.height;
    this.leftOfBrick = brick.position.x;
    this.righOfBrick = brick.position.x + brick.width;

    this.topOfObject = gameObject.position.y;
    this.bottomOfObject = gameObject.position.y + gameObject.height;
    this.leftOfObject = gameObject.position.x;
    this.rightOfObject = gameObject.position.x + gameObject.width;
    this.objWidth = gameObject.width;
    this.objHeight = gameObject.height
    this.brickHeight = brick.height;
  }

  bottomColision(){     
    if(this.topOfBrick < this.bottomOfObject
      && this.topOfObject < (this.topOfBrick + this.objHeight/2)
      && this.rightOfObject  > this.leftOfBrick
      && this.leftOfObject < this.righOfBrick)
        return true;
    else
      return false;
  }

  topColision(){     
    if(this.bottomOfBrick > this.bottomOfObject
      && this.bottomOfObject > this.topOfBrick
      && this.rightOfObject  > this.leftOfBrick + this.objWidth / 4
      && this.leftOfObject < this.righOfBrick - this.objWidth / 4)
        return true;
    else
      return false;
  }

  leftColision(){
    if(this.topOfBrick > this.topOfObject
      && this.bottomOfBrick < this.bottomOfObject
      && this.leftOfObject < this.leftOfBrick
      && this.rightOfObject > this.leftOfBrick)
      return true;
    else
      return false;
  }

  rightColision(){
    if(this.topOfBrick > this.topOfObject
      && this.bottomOfBrick < this.bottomOfObject
      && this.leftOfObject < this.righOfBrick
      && this.rightOfObject > this.righOfBrick)
      return true;
    else
      return false;
  }
}
  
export function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;

  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}