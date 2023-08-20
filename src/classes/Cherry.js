/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Food } from './Food.js';

export class Cherry extends Food {
  constructor(snake) {
    super(snake);
    this.points = 10;
    this.frType = 'cherry';
  }
}
