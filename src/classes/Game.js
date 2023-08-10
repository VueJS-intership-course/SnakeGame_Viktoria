/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
import { Snake } from './Snake.js';
import { Input } from '../../utils/Input.js';
import { outsideGrid } from '../../utils/gridPositions.js';
import { SNAKE_SPEED } from '../../utils/constants.js';
import { Cherry } from './Cherry.js';
import { Banana } from './Banana.js';

// eslint-disable-next-line import/prefer-default-export
export class Game {
  constructor() {
    this.lastRenderTime = 0;
    this.isGameOver = false;
    this.gameBoard = document.getElementById('game-board');
    this.snake = new Snake();
    this.input = new Input();
    this.food = this.getRandomFoodType();
  }

  getRandomFoodType() {
    const food = Math.random() < 0.5 ? new Cherry(this.snake) : new Banana(this.snake);
    return food;
  }

  main(currentTime) {
    // check if game is over
    if (this.isGameOver) {
      if (
        confirm(`You lost. Click OK to restart. Points:${this.snake.points}`)
      ) {
        window.location = '';
      }
      return;
    }

    window.requestAnimationFrame(this.main.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    this.lastRenderTime = currentTime;

    this.update();
    this.render();
  }

  update() {
    const inputDirection = this.input.getInputDirection();
    this.snake.movement(inputDirection);
    this.food.update(this.food);
    this.checkForGameOver();
  }

  render() {
    this.gameBoard.innerHTML = '';
    this.snake.render(this.gameBoard);
    this.food.render(this.gameBoard, this.food.frType);
  }

  checkForGameOver() {
    this.isGameOver = outsideGrid(this.snake.getSnakeStart()) || this.snake.isIntersecting();
    // todo -> remove outside grid isGameOver & implement mirroring
  }

  start() {
    window.requestAnimationFrame(this.main.bind(this));
  }
}
