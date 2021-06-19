import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'pause' });
  }

  init(data) {
    this.mute = data.mute;
  }

  create() {
    this.panelbg = this.add.sprite(
      this.scale.width * 0.5,
      this.scale.height * 0.5,
      'panel',
    );
    this.panelbg.setScale(20);

    this.panelbg.alpha = 0.5;
    this.panelbg.setInteractive();
    this.panelbg.on('pointerdown', () => {
      this.add.tween({
        targets: this.optionContiner,
        scale: 0,
        ease: 'Linear',
        duration: 500,
      });

      this.panelbg.setScale(0);
      this.scene.resume('game');
      this.scene.stop();
    });

    this.optionContiner = this.add.container(
      this.scale.width * 0.5,
      this.scale.height * 0.5,
    );
    this.panel = this.add.sprite(0, 0, 'panel');
    this.panel.setInteractive();
    this.optionContiner.add(this.panel);
    const optionHead = this.add.text(-30, -80, 'OPTIONS', {
      fontSize: 20,
      color: '#000',
      fontWeight: 'bold',
    });
    this.optionContiner.add(optionHead);
    const checkbox = this.add.image(-this.optionContiner.width - 60, -30, 'uncheck');
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
    const restart = this.add.image(0, this.checkmark.y + 80, 'restart').setScale(0.5);
    restart.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.add.tween({
          targets: this.optionContiner,
          scale: 0,
          ease: 'Linear',
          duration: 500,
        });

        this.panelbg.setScale(0);
        this.scene.stop();
        const gameScene = this.scene.get('game');
        gameScene.scene.restart();
      });

    const clickOutsidetext = this.add.text(
      -140,
      this.panel.height + this.panel.y,
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

    this.optionContiner.add(checkbox);
    this.optionContiner.add(clickOutsidetext);
    this.optionContiner.add(this.checkmark);
    this.optionContiner.add(option);
    this.optionContiner.add(restart);
    this.panel.setScale(2);
    this.optionContiner.setScale(0);
    this.optionContiner.depth = 6;
    this.add.tween({
      targets: this.optionContiner,
      scale: 1,
      ease: 'Linear',
      duration: 500,
    });

    this.add.tween({
      targets: this.panel,
      scale: 2,
      ease: 'Linear',
      duration: 500,
    });
    this.checkmark.visible = !this.mute;
  }

  toggleCheck() {
    let isMute = !this.checkmark.visible;

    isMute = !isMute;

    this.checkmark.visible = !isMute;
    this.sound.mute = isMute;
  }
}