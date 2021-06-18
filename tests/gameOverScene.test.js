import Phaser from 'phaser';
import GameOver from '../src/scene/gameover';

test('game over scene is a function', () => {
  expect(typeof GameOver).toBe('function');
});

test('game scene is a subclass of scene', () => {
  expect(GameOver.prototype instanceof Phaser.Scene).toBe(true);
});