import Phaser from 'phaser';

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('logo', 'assets/img/logo.png');
    this.load.image('logo2', 'assets/images/logo2.png');
    this.load.image('menubg', 'assets/images/menubg.jpg');
    this.load.image('gamelogo', 'assets/img/game.png');
    this.load.image('playbtn', 'assets/img/playbtn.png');
    this.load.image('optionbtn', 'assets/img/optionbtn.png');
    this.load.image('menu', 'assets/img/menu.png');
    this.load.image('restart', 'assets/img/restart.png');
    this.load.image('panel', 'assets/img/panel.png');
    this.load.image('uncheck', 'assets/img/uncheck.png');
    this.load.image('check', 'assets/img/check.png');
    this.load.audio('mainsound', 'assets/audio/audio.mp3');
    this.load.audio('jump', 'assets/audio/jump.wav');
    this.load.audio('coin-wav', 'assets/audio/coin.wav');
    this.load.audio('walk', 'assets/audio/walk.wav');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('block', 'assets/images/block.png');
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('spikes', 'assets/img/Spikes.png');
    this.load.image('cog', 'assets/img/setting.png');
    this.load.image('gameover', 'assets/img/gameover.png');
    this.load.spritesheet('coin', 'assets/img/coin.png', {
      frameWidth: 52,
      frameHeight: 52,
    });
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
      frameWidth: 28,
      frameHeight: 30,
      margin: 1,
      spacing: 1,
    });

    this.load.spritesheet('dude',
      'assets/img/dude.png',
      { frameWidth: 32, frameHeight: 48 });
    for (let i = 0; i < 140; i++) {
      this.load.image(`logo${i}`, 'assets/img/logo.png');
    }
  }

  create() {
    const logo = this.add.image(400, 300, 'logo');
    this.tweens.add({
      targets: logo,
      x: 100,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      duration: 3000,
    });

    this.cameras.main.fadeOut(6000);

    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('menu');
    });
  }
}
