import 'pixi';
import 'p2';
import Phaser from 'phaser';
import WebFont from 'webfontloader';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import CreatedState from './states/Created';
import PlayState from './states/Play';
import OverState from './states/Over';

class Game extends Phaser.Game {
  constructor() {
    // const docElement = document.documentElement;
    // const width = docElement.clientWidth;
    // const height = docElement.clientHeight;
    super(640, 1136, Phaser.CANVAS, 'content', null);
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
const game = new Game();
WebFont.load({
  custom: {
    families: ['My Font'],
    urls: ['./blackhead/fonts.css'],
  },
  active() {
    console.log('init');
    game.init(game);
  },
});
