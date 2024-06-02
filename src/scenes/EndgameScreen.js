export class EndgameScreen extends Phaser.Scene {
  constructor() {
    super('EndgameScreen')
  }

  create() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        'Game Over! Click to restart',
        {
          fontSize: '32px',
          fill: '#fff',
        }
      )
      .setOrigin(0.5)

    this.input.on(
      'pointerdown',
      () => {
        this.scene.start('Game')
      },
      this
    )
  }
}
