/**
 * @jest-environment jsdom
 */
import Phaser from 'phaser';
import LeaderBoardScene from '../src/scene/leaderboard';

test('leaderboard scene is a function', () => {
  expect(typeof LeaderBoardScene).toBe('function');
});

test('leaderboard scene is a subclass of scene', () => {
  expect(LeaderBoardScene.prototype instanceof Phaser.Scene).toBe(true);
});