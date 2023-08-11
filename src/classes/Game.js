/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
import { Snake } from './Snake.js';
import { Input } from '../../utils/Input.js';
import { SNAKE_SPEED } from '../../utils/constants.js';
import { Cherry } from './Cherry.js';
import { Banana } from './Banana.js';

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
  }

  getRandomFoodType() {
    const food = Math.random() < 0.5 ? new Cherry(this.snake) : new Banana(this.snake);
    return food;
  }

  main(currentTime) {
    if (this.isGameOver) {
      const username = this.username;
      const points = this.snake.points;
      const time = Date.now();
      this.saveScore(username, points, time);

      if (confirm(`${username} lost. Click OK to restart. Points: ${points}`)) {
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
    const username = prompt('Enter username: ');
    this.username = username;
    this.displayScoreboard();
    window.requestAnimationFrame(this.main.bind(this));
  }

  saveScore(username, points, time) {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ username, points, time });
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  getScores() {
    return JSON.parse(localStorage.getItem('scores')) || [];
  }

  displayScoreboard() {
    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';
    const scores = this.getScores();

    scores.sort((a, b) => {
      if (b.points === a.points) {
        return b.time - a.time;
      }
      return b.points - a.points;
    });

    scores.forEach((score, index) => {
      const scoreItem = document.createElement('li');
      scoreItem.textContent = `${index + 1}. ${score.username}: ${score.points} points`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => this.removeScore(index));

      scoreItem.appendChild(deleteButton);
      scoreItem.classList.add('score-item');
      scoreList.appendChild(scoreItem);
    });
  }

  removeScore(index) {
    const scores = this.getScores();
    scores.sort((a, b) => b.points - a.points);

    if (index >= 0 && index < scores.length) {
      scores.splice(index, 1);
      localStorage.setItem('scores', JSON.stringify(scores));
      this.displayScoreboard();
    }
  }
}
