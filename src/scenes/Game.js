import { Scene } from 'phaser';

let gameState = {};

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // path
    this.load.setPath('assets');
    // images
    this.load.image('background', 'bg.png');
    this.load.image('player', 'Jump (32x32).png');
    this.load.spritesheet('frog', 'Run (32x32).png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('idle', 'Idle (32x32).png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('apple', 'apple.png');
    this.load.image('platform', 'platform.png');

    // audio
    this.load.audio('coin', 'coin.mp3');
  }

  create() {
    this.coinSound = this.sound.add('coin');
    gameState.background = this.add.image(512, 384, 'background');
    gameState.platform = this.physics.add.staticGroup();

    gameState.platform.create(50, 500, 'platform');
    gameState.platform.create(550, 360, 'platform');
    gameState.platform.create(850, 200, 'platform');
    gameState.platform.create(950, 600, 'platform');
    gameState.platform.create(450, 750, 'platform').setScale(3).refreshBody();

    gameState.frog = this.physics.add.sprite(100, 650, 'frog').setScale(2);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('frog', { start: 1, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('idle', { start: 1, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });

    gameState.apple = this.physics.add.group({
      key: 'apple',
      repeat: 9,
      setXY: { x: 50, y: 0, stepX: 100 },
    });

    gameState.apple.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    gameState.score = 0;

    gameState.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
      fontFamily: 'Arial',
    });

    function collectApple(player, apple) {
      apple.disableBody(true, true);
      gameState.score += 10;
      this.coinSound.play();
      gameState.scoreText.setText('Score: ' + gameState.score);
    }

    this.physics.add.overlap(
      gameState.frog,
      gameState.apple,
      collectApple,
      null,
      this
    );

    this.physics.add.collider(gameState.frog, gameState.platform);
    this.physics.add.collider(gameState.apple, gameState.platform);
    gameState.frog.setCollideWorldBounds(true);
  }

  update() {
    gameState.controls = this.input.keyboard.createCursorKeys();

    if (gameState.controls.left.isDown) {
      gameState.frog.x -= 10;
      gameState.frog.flipX = true;
      gameState.frog.anims.play('walk', true);
    } else if (gameState.controls.right.isDown) {
      gameState.frog.x += 10;
      gameState.frog.anims.play('walk', true);
      gameState.frog.flipX = false;
    } else {
      gameState.frog.anims.play('idle', true);
    }

    // doublejump
    if (gameState.frog.body.touching.down) {
      gameState.jumps = 2;
    }

    if (
      Phaser.Input.Keyboard.JustDown(gameState.controls.up) &&
      gameState.jumps > 0
    ) {
      gameState.frog.setVelocityY(-1300);
      gameState.jumps--;
    }

    if (gameState.score === 100) {
      this.scene.start('EndgameScreen');
    }
  }
}
