export class Input {
    constructor() {
      this.inputDirection = { x: 0, y: 0 };
      this.lastInputDirection = { x: 0, y: 0 };
      window.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  
    handleKeydown(event) {
      switch (event.key) {
        case 'ArrowUp':
        case 'w': 
          if (this.lastInputDirection.y !== 0) break;
          this.inputDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's': 
          if (this.lastInputDirection.y !== 0) break;
          this.inputDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a': 
          if (this.lastInputDirection.x !== 0) break;
          this.inputDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd': 
          if (this.lastInputDirection.x !== 0) break;
          this.inputDirection = { x: 1, y: 0 };
          break;
      }
    }
    getInputDirection() {
      this.lastInputDirection = this.inputDirection;
      return this.inputDirection;
    }
  }
  