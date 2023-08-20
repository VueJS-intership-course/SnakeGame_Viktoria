/* eslint-disable import/prefer-default-export */
export class Storage {
  constructor() {
    this.scores = JSON.parse(localStorage.getItem('scores')) || [];
  }

  saveScore(username, points, time) {
    this.scores.push({ username, points, time });
    this.updateLocalStorage();
  }

  getScores() {
    return this.scores;
  }

  removeScore(index) {
    if (index >= 0 && index < this.scores.length) {
      this.scores.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    localStorage.setItem('scores', JSON.stringify(this.scores));
  }
}
