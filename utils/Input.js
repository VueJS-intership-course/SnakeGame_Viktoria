/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { DIRECTIONS } from './constants.js';

export class Input {
  constructor() {
    this.inputDirection = DIRECTIONS.DEFAULT;
    this.lastInputDirection = DIRECTIONS.DEFAULT;
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(event) {
    // eslint-disable-next-line default-case
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = DIRECTIONS.UP;
        break;
      case 'ArrowDown':
      case 's':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = DIRECTIONS.DOWN;
        break;
      case 'ArrowLeft':
      case 'a':
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = DIRECTIONS.LEFT;
        break;
      case 'ArrowRight':
      case 'd':
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = DIRECTIONS.RIGHT;
        break;
    }
  }

  getInputDirection() {
    this.lastInputDirection = this.inputDirection;
    return this.inputDirection;
  }
}
