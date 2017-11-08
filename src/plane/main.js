import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import CreatedState from './states/Created';
import PlayState from './states/Play';
import OverState from './states/Over';


class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    const width = docElement.clientWidth;
    const height = docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);
  }
  init(game) {
    this.state.add('Boot', BootState(game), false);
    this.state.add('Preload', PreloadState(game), false);
    this.state.add('Created', CreatedState(game), false);
    this.state.add('Play', PlayState(game), false);
    this.state.add('Over', OverState(game), false);
    this.state.start('Boot');
  }
}

if (module.hot) {
  module.hot.accept();
}

const game = new Game();
game.init(game);

