import Phaser from 'phaser';
import Coin from '../lib/stars';
import StaticKiller from '../lib/statickiller';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
    this.alive = true;
  }

  init(data) {
    this.mute = data.mute;
    this.score = 0;
    this.jumpSpeed = -1300;
  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // groups
    this.stars = this.physics.add.group({ classType: Coin });
    this.staticKillers = this.physics.add.group({ classType: StaticKiller });
    this.staticKillers.setVelocityY(60);
    this.platforms = this.physics.add.group({ runChildUpdate: true });
    const plaftform0 = this.add.sprite(130, 0, 'platform');
    const plaftform1 = this.add.sprite(this.scale.width * 0.5, 150, 'platform');
    const plaftform2 = this.add.sprite(670, 300, 'platform');
    const plaftform4 = this.add.sprite(this.scale.width * 0.5, 450, 'platform');
    // player
    this.player = this.physics.add.sprite(plaftform4.x + 30, plaftform4.y - 50, 'dude');
    this.player.body.gravity.y = 3000;

    this.platforms.add(plaftform4);
    this.platforms.add(plaftform2);
    this.platforms.add(plaftform1);

    this.platforms.add(plaftform0);
    // physics interactions
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this,
    );
    this.physics.add.overlap(this.player,
      this.staticKillers,
      () => {
        this.gameOver();
      },
      undefined,
      this);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.world.enable(this.platforms);
    this.platforms.setVelocityY(30);

    // reset platforms when y = 0
    this.platforms.children.iterate((child) => {
      child.body.setVelocityY(20);
      child.body.setMaxSpeed(100);
      child.body.immovable = true;
      const me = this;

      // eslint-disable-next-line func-names
      child.update = function () {
        if (this.y > 600) {
          this.y = 0;
          const obstacle = Phaser.Math.Between(5, 9);
          me.incrementScore();
          me.addStarAbove(child);
          if (obstacle % 2 === 0) { me.addStaticKillerAbove(child); }
        }
      };
    });
    // scores
    this.scoreText = this.add.text(10, 30, 'Score: 0',
      { color: '#FFFFFF', fontSize: 24 })
      .setScrollFactor(0);

    // pause btn
    this.pausebtn = this.add.container(this.scale.width - 50, 40);
    this.pauseBtnPanel = this.add.image(0, 0, 'uncheck');
    this.cog = this.add.image(0, 0, 'cog').setScale(0.02);
    this.pausebtn.add(this.pauseBtnPanel);
    this.pausebtn.add(this.cog);
    this.pauseBtnPanel.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.pause();
        this.scene.launch('pause', { mute: this.mute });
      });

    this.pausebtn.depth = 9;
    // colliders
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.platforms, this.staticKillers);
    this.physics.add.collider(this.platforms, this.stars);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      // player key right listener
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      // turn listener
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }
    // handle jumpSpeed
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(this.jumpSpeed);
      this.sound.play('jump');
    }

    // if player fall through the bounds
    if (this.player.body.position.y >= 600 - this.player.body.height) {
      this.gameOver();
    }
  }
  // add a star above a platform

  addStarAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const star = this.stars.get(Phaser.Math.Between(sprite.x - 60, sprite.x), y, 'coin');
    this.anims.create({
      key: 'rotate',
      frameRate: 7,
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
      repeat: -1,
    });
    star.play('rotate');
    star.setActive(true);
    star.setVisible(true);
    this.add.existing(star);
    this.physics.world.enable(star);
    star.body.gravity.y = 3000;
    return star;
  }

  // collect star and increase score
  collectStar(_player, star) {
    this.stars.killAndHide(star);
    this.physics.world.disableBody(star.body);
    this.sound.play('coin-wav');
    this.incrementScore(10);
  }

  addStaticKillerAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;
    const staticKiller = this.staticKillers.get(Phaser.Math.Between(sprite.x + 60, sprite.x + 110), y, 'spikes');
    staticKiller.setActive(true);
    staticKiller.setVisible(true);
    this.add.existing(staticKiller);
    this.physics.world.enable(staticKiller);
    staticKiller.body.gravity.y = 3000;
    return staticKiller;
  }

  incrementScore(score = 1) {
    this.score += score;
    this.scoreText.text = `Score: ${this.score}`;
  }

  gameOver() {
    this.scene.start('gameover', { score: this.score });
  }
}
