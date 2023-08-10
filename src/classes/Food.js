/* eslint-disable max-classes-per-file */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { randomGridPosition } from '../../utils/gridPositions.js';

export class Food {
  constructor(snake) {
    this.snake = snake;
    this.food = this.getRandomFoodPosition();
  }

  getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }

  update(currentFruit) {
    if (this.snake.onSnake(this.food)) {
      this.snake.grow(currentFruit);
      this.food = this.getRandomFoodPosition();
    }
  }

  render(gameBoard, currentFruit) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.food.y;
    foodElement.style.gridColumnStart = this.food.x;
    foodElement.classList.add(currentFruit);
    gameBoard.appendChild(foodElement);
  }
}
