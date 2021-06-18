/**
 * @jest-environment jsdom
 */
import Phaser from 'phaser';
import MenuScene from '../src/scene/menu';

test('intro scene is a function', () => {
  expect(typeof MenuScene).toBe('function');
});

test('intro scene is a subclass of scene', () => {
  expect(MenuScene.prototype instanceof Phaser.Scene).toBe(true);
});