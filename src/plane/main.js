import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import CreatedState from './states/Created';
import PlayState from './states/Play';
import OverState from './states/Over';

import config from './config'

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    const width = docElement.clientWidth;
    const height = docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Preload', PreloadState, false);
    this.state.add('Created', CreatedState, false);
    this.state.add('Play', PlayState, false);
    this.state.add('Over', OverState, false);

    this.state.start('Boot');
  }
}

if (module.hot) {
  module.hot.accept();
}

window.game = new Game();
