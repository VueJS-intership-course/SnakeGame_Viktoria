export const SNAKE_SPEED = 5;
export const GRID_SIZE = 25;

export const DIRECTIONS = {
  DEFAULT: { x: 0, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const FRUIT_TYPES = [
  { type: 'cherry', points: 10 },
  { type: 'banana', points: 50 },
];
