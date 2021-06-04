export const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: gameScene,
    title: 'Monster Kong',
    pixelArt: false,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 1000
        },
        debug: false
      }
    }
}