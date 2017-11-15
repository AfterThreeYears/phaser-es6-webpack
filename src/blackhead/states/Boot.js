import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    init() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();
    }
    preload() {
      const style = {font: '16px Arial', fill: '#ddd', align: 'center'};
      const text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', style);
      text.anchor.setTo(0.5, 0.5);
      game.load.image('loading', './flappybird/images/preloader.gif');
    }
    create() {
      game.state.start('Preload');
    }
  };
};

