/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
import { DateTime } from 'https://cdn.skypack.dev/luxon';
import { Snake } from './Snake.js';
import { Input } from '../../utils/Input.js';
import { SNAKE_SPEED } from '../../utils/constants.js';
import { Cherry } from './Cherry.js';
import { Banana } from './Banana.js';
import { Storage } from './localStorage.js';

// eslint-disable-next-line import/prefer-default-export
export class Game {
  constructor() {
    this.lastRenderTime = 0;
    this.isGameOver = false;
    this.gameBoard = document.getElementById('game-board');
    this.snake = new Snake();
    this.input = new Input();
    this.food = this.getRandomFoodType();
    this.snakeSpeed = SNAKE_SPEED;
    this.storage = new Storage();
  }

  getRandomFoodType() {
    const food = Math.random() < 0.7 ? new Cherry(this.snake) : new Banana(this.snake);
    return food;
  }

  main(currentTime) {
    if (this.isGameOver) {
      const username = this.username;
      const points = this.snake.points;
      const time = this.time;
      this.storage.saveScore(username, points, time);

      if (confirm(`${username} lost. Points: ${points} Click OK to restart. ${time}`)) {
        window.location = '';
      }
      return;
    }

    window.requestAnimationFrame(this.main.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return;

    this.lastRenderTime = currentTime;

    this.update();
    this.render();
  }

  update() {
    const inputDirection = this.input.getInputDirection();
    this.snake.movement(inputDirection);

    if (this.snake.onSnake(this.food.food)) {
      this.snake.grow(this.food);
      this.food = this.getRandomFoodType();
      this.snakeSpeed += 0.5;
    }

    this.checkForGameOver();
  }

  render() {
    this.gameBoard.innerHTML = '';
    this.snake.render(this.gameBoard);
    this.food.render(this.gameBoard, this.food.frType);
  }

  checkForGameOver() {
    this.isGameOver = this.snake.isIntersecting();
  }

  start() {
    let username = prompt('Enter username: ');

    while (!username) {
      username = prompt('Username cannot be null. Please enter a username: ');
    }
    this.username = username;

    const currentStartTime = DateTime.now().toLocaleString();
    this.time = currentStartTime;
    this.displayScoreboard();
    window.requestAnimationFrame(this.main.bind(this));
  }

  displayScoreboard() {
    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';
    const scores = this.storage.getScores();

    scores.sort((a, b) => {
      if (b.points === a.points) {
        return b.time - a.time;
      }
      return b.points - a.points;
    });

    scores.forEach((score, index) => {
      const scoreItem = document.createElement('li');
      scoreItem.textContent = `${index + 1}. ${score.username}: ${score.points} points. ${this.time}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', () => {
        this.storage.removeScore(index);
        this.displayScoreboard();
      });

      scoreItem.appendChild(deleteButton);
      scoreItem.classList.add('score-item');
      scoreList.appendChild(scoreItem);
    });
  }
}
