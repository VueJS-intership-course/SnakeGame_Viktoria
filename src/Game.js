import { Snake } from './Snake.js';
import { Input } from './utils/controls.js';
import { Food } from './Food.js';

export class Game {
  constructor() {
    this.gameBoard = document.getElementById('game-board');
    this.snake = new Snake();
    this.input = new Input();
    this.food = new Food();
    this.gameOver = false;
  }

//todo
}
