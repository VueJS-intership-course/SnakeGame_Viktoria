/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { randomGridPosition } from '../../utils/gridPositions.js';

export class Snake {
  constructor() {
    this.snakeBody = [randomGridPosition()];
    this.newSegments = 0;
    this.points = 0;
  }

  movement(inputDirection) {
    this.addSegments();

    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = { ...this.snakeBody[i] };
    }

    this.snakeBody[0].x += inputDirection.x;
    this.snakeBody[0].y += inputDirection.y;
  }

  render(gameBoard) {
    this.snakeBody.forEach((segment) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }

  grow(fruit) {
    this.newSegments++;
    if (fruit.type === 'cherry') {
      this.points += fruit.points;
    } else {
      this.points += fruit.points;
    }
  }

  // eslint-disable-next-line class-methods-use-this
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

  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
    }

    this.newSegments = 0;
  }
}
