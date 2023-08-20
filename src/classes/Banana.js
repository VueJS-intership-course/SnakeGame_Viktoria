/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Food } from './Food.js';

export class Banana extends Food {
  constructor(snake) {
    super(snake);
    this.points = 50;
    this.frType = 'banana';
  }
}
