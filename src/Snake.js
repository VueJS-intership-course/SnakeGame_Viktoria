import { GRID_SIZE, randomGridPosition } from './grid.js';

export class Snake {
  constructor() {
    this.snakeBody = [randomGridPosition()]; 
    this.newSegments = 0;
    this.speed = 1; 
  }

  //todo
}
