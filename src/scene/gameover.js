import Phaser from 'phaser';
import { url, postScores } from '../utils/Api';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  init(data) {
    this.endScore = data.score;
  }

  create() {
    this.add.image(this.scale.width * 0.5, this.scale.height * 0.3, 'gameover').setScale(0.2).setOrigin();
    this.add.text(this.scale.width * 0.5, this.scale.height * 0.46, `Your score: ${this.endScore}`, { fontSize: 24 }).setOrigin();

    // reset button
    const restart = this.add.image(this.scale.width * 0.5, this.scale.height * 0.7, 'restart').setScale(0.5);
    restart.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('game');
      });

    // Menu Button
    const menu = this.add.image(this.scale.width * 0.5, this.scale.height * 0.8, 'menu').setScale(0.5);
    menu.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('menu');
      });

    // Submit button
    const form = document.createElement('form');
    form.innerHTML = `
    <div class="input-group">
      <input type="text" name="name" class="form-control" placeholder="Enter your name" required minLength="4" maxLength="16" autofocus/>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    `;
    this.add.dom(this.scale.width * 0.5, this.scale.height * 0.6, form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.querySelector('input[name="name"]').value;
      postScores(user, this.endScore, url)
        .then(() => {
          this.scene.start('leaderboard');
        })
        .catch(() => {
          this.add.text(this.scale.width * 0.5, this.scale.height * 0.8, 'Network Error. Please try again later.').setOrigin();
        });
    });
  }
}
