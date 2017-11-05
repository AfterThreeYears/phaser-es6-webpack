import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {
    if(!game.device.desktop){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.forcePortrait = true;
      this.scale.refresh();
    }
  }
  preload() {
    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    game.load.image('loading', './flappybird/images/preloader.gif');
  }
  create() {
    game.state.start('Preload');
  }
}
