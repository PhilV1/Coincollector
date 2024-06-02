import { MainMenu } from './scenes/MainMenu'
import { Game as MainGame } from './scenes/Game'
import { EndgameScreen } from './scenes/EndgameScreen'
import { AUTO, Scale, Game } from 'phaser'

const config = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 5000 },
      debug: false,
    },
  },
  scene: [MainMenu, MainGame, EndgameScreen],
}

export default new Game(config)
