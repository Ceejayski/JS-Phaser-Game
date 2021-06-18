import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create() {
    this.backgroundmusic = this.sound.add('mainsound', { loop: true, volume: 0.1 });
    this.backgroundmusic.play();
    const panelbg = this.add.sprite(
      this.scale.width * 0.5,
      this.scale.height * 0.5,
      'panel',
    );

    panelbg.alpha = 0.5;
    panelbg.setInteractive();

    // option container

    const optionContiner = this.add.container(
      this.scale.width * 0.5,
      this.scale.height * 0.5,
    );

    panelbg.on('pointerdown', () => {
      this.add.tween({
        targets: optionContiner,
        scale: 0,
        ease: 'Linear',
        duration: 500,
      });

      panelbg.setScale(0);
    });
    const panel = this.add.sprite(0, 0, 'panel');
    panel.setInteractive();
    optionContiner.add(panel);
    const optionHead = this.add.text(-30, -80, 'OPTIONS', {
      fontSize: 20,
      color: '#000',
      fontWeight: 'bold',
    });
    optionContiner.add(optionHead);
    const checkbox = this.add.image(-optionContiner.width - 60, -30, 'uncheck');
    this.checkmark = this.add.image(
      checkbox.x + checkbox.width * 0.5 - 20,
      checkbox.y + checkbox.height * 0.5 - 18,
      'check',
    );
    const option = this.add.text(
      this.checkmark.x + this.checkmark.width + 20,
      this.checkmark.y + this.checkmark.height - 26,
      'Sound',
      {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
      },
    );

    const clickOutsidetext = this.add.text(
      -140,
      panel.height + panel.y,
      'Click Outside the box to Close',
      {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
      },
    );

    checkbox.setInteractive();
    checkbox
      .on('pointerover', () => {
        checkbox.setTint(0xa9a9a9);
      })
      .on('pointerout', () => {
        checkbox.setTint(0xffffff);
      })
      .on('pointerup', () => {
        checkbox.setTint(0xffffff);
        this.toggleCheck();
      });

    optionContiner.add(checkbox);
    optionContiner.add(clickOutsidetext);
    optionContiner.add(this.checkmark);
    optionContiner.add(option);

    // background

    this.add.image(50, 60, 'menubg');
    this.add
      .image(400, 120, 'gamelogo')
      .setScale(0.5)
      .setOrigin();

    // play btn actions

    const playbtn = this.add.image(400, 350, 'playbtn').setScale(0.7);

    playbtn.setInteractive({ useHandCursor: true });
    playbtn.on('pointerdown', () => {
      this.backgroundmusic.stop();
      this.scene.start('game', { mute: !this.checkmark.visible });
    });
    // Leaderboard 
    const leaderboard = this.add.image(400, 450, 'leader').setScale(0.7);

    leaderboard.setInteractive({ useHandCursor: true });
    leaderboard.on('pointerdown', () => {
      this.backgroundmusic.stop();
      this.scene.start('leaderboard');
    });
    // optionbtn
    const optionbtn = this.add.image(400, 550, 'optionbtn').setScale(0.7);

    // created by text
    this.add.text(500, 550, 'Created by: Ceejayski', {
      fontSize: 22,
      color: '#fff',
    });
    optionbtn.setInteractive({ useHandCursor: true });

    optionbtn.on('pointerdown', () => {
      panelbg.setScale(20);
      panel.setScale(2);
      panelbg.depth = 5;
      optionContiner.setScale(0);
      optionContiner.depth = 6;
      this.add.tween({
        targets: optionContiner,
        scale: 1,
        ease: 'Linear',
        duration: 500,
      });

      this.add.tween({
        targets: panel,
        scale: 2,
        ease: 'Linear',
        duration: 500,
      });
    });
  }

  toggleCheck() {
    let isMute = !this.checkmark.visible;

    isMute = !isMute;

    this.checkmark.visible = !isMute;
    this.sound.mute = isMute;
  }
}
