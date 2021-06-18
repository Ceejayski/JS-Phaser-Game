import Phaser from 'phaser';
import Coin from '../src/lib/stars';

test('Coin is a function', () => {
  expect(typeof Coin).toBe('function');
});

test('Coin is a subclass of sprite', () => {
  expect(Coin.prototype instanceof Phaser.Physics.Arcade.Sprite).toBe(true);
});

test('Coin has a constructor', () => {
  expect(Coin.prototype.constructor).not.toBe(false);
});