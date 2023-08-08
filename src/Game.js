/* eslint-disable import/extensions */
import { Snake } from './Snake.js';
import { Input } from '../utils/controls.js';
import { outsideGrid } from './gridPositions.js';
import { Food } from './Food.js';

// eslint-disable-next-line import/prefer-default-export
export class Game {
  constructor() {
    this.lastRenderTime = 0;
    this.gameOver = false;
    this.gameBoard = document.getElementById('game-board');
    this.snake = new Snake();
    this.input = new Input();
    this.food = new Food(this.snake);
  }

  main(currentTime) {
    // check if game is over
    if (this.gameOver) {
      if (confirm('You lost. Click OK to restart')) {
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
    this.food.update();
    this.checkForGameOver();
  }

  render() {
    this.gameBoard.innerHTML = '';
    this.snake.render(this.gameBoard);
    this.food.render(this.gameBoard);
  }

  checkForGameOver() {
    this.gameOver = outsideGrid(this.snake.getSnakeStart()) || this.snake.isIntersecting();
    // todo -> remove outside grid gameover & implement mirroring
  }

  start() {
    window.requestAnimationFrame(this.main.bind(this));
  }
}
const SNAKE_SPEED = 5;
const game = new Game();
game.start();
