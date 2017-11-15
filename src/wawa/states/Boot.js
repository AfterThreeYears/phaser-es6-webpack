import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    init() {
      game.stage.disableVisibilityChange = true;
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();
    }
    preload() {
      game.load.image('loading', './flappybird/images/preloader.gif');
    }
    create() {
      game.state.start('Preload');
    }
  };
};

