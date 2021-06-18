import Phaser from 'phaser';
import PauseScene from '../src/scene/pausemenu';

test('Pause scene is a function', () => {
  expect(typeof PauseScene).toBe('function');
});

test('pause scene is a subclass of scene', () => {
  expect(PauseScene.prototype instanceof Phaser.Scene).toBe(true);
});