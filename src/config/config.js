import Phaser from 'phaser';
import { scenes } from '../scene/Scenes';

// eslint-disable-next-line import/prefer-default-export
export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: scenes,
  title: 'Brave Dude',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 20,
      },
      debug: false,
    },
  },
  parent: '#container',
  dom: {
    createContainer: true,
  },

  autoCenter: true,
};