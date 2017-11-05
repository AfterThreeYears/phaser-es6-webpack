import Phaser from 'phaser';

export default class extends Phaser.State {
  preload() {
    var preloadSprite = game.add.sprite(34, game.height / 2, 'loading');
    game.load.setPreloadSprite(preloadSprite);

    game.stage.backgroundColor = '#000';
    game.load.crossOrigin = 'anonymous';

    game.load.image('background', './doll/images/background.png');
    game.load.image('baby_0', './doll/images/baby_0.png');
    game.load.image('baby_1', './doll/images/baby_1.png');
    game.load.image('baby_2', './doll/images/baby_2.png');

    game.load.image('claw0', './doll/images/claw0.png');
    game.load.image('claw1', './doll/images/claw1.png');

    game.load.image('wood', './doll/images/wood.png');
    game.load.image('woodhead', './doll/images/woodhead.png');
  }
  create () {
    game.state.start('Created');
  }
}