import { randomGridPosition } from './gridPositions.js';

export class Snake {
  constructor() {
    this.snakeBody = [randomGridPosition()]; 
    this.newSegments = 0;
  }

  movement(inputDirection) {
    // this.addSegments();

    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = { ...this.snakeBody[i] };
    }

    this.snakeBody[0].x += inputDirection.x;
    this.snakeBody[0].y += inputDirection.y;
  }

  render(gameBoard) {
    this.snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }

  // grow() {
  //   this.newSegments++;
  // }

  equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  onSnake(position, { ignoreHead = false } = {}) {
    return this.snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return this.equalPositions(segment, position);
    });
  }

  getSnakeStart() {
    return this.snakeBody[0];
  }

  isIntersecting() {
    return this.onSnake(this.snakeBody[0], { ignoreHead: true });
  }


}
