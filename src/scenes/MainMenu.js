import { Scene } from 'phaser';

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        'Click to start the game',
        {
          fontSize: '32px',
          fill: '#fff',
        }
      )
      .setOrigin(0.5);

    this.input.on(
      'pointerdown',
      () => {
        this.scene.start('Game');
      },
      this
    );
  }
}
