/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { GRID_SIZE } from './constants.js';

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}
