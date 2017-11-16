import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import PlayState from './states/Play';

class Game extends Phaser.Game {
  constructor() {
    super(549, 694, Phaser.CANVAS, 'content', null);
  }
  init(game) {
    this.state.add('Boot', BootState(game), false);
    this.state.add('Preload', PreloadState(game), false);
    this.state.add('Play', PlayState(game), false);
    this.state.start('Boot');
  }
}
const game = new Game();
game.init(game);
