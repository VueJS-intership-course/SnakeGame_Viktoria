/* eslint-disable default-case */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { DIRECTIONS, DEFAULT_POSITION } from './constants.js';

export class Input {
  constructor() {
    this.inputDirection = DEFAULT_POSITION;
    this.lastInputDirection = DEFAULT_POSITION;
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(event) {
    // eslint-disable-next-line default-case
    const key = event.key.toLowerCase();

    switch (key) {
      case 'arrowup':
      case 'w':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = DIRECTIONS.UP;
        break;
      case 'arrowdown':
      case 's':
        if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = DIRECTIONS.DOWN;
        break;
      case 'arrowleft':
      case 'a':
        if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = DIRECTIONS.LEFT;
        break;
      case 'arrowright':
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
