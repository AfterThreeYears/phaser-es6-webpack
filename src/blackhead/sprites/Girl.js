import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, y, startX, startY, endY, asset, scale, completeCb}) {
    super(game, startX, y, asset);
    this.anchor.setTo(0.5);
    this.scale.setTo(scale);
    this._addTween(game, startY, endY, completeCb);
    game.world.add(this);
  }
  _addTween(game, startY, endY, completeCb) {
    const startTween = game.add.tween(this).to({y: startY}, 500, Phaser.Easing.Bounce.Out, true, 0, 0);
    startTween.onComplete.add(() => {
      completeCb();
      game.add.tween(this).to( {y: endY}, 500, null, true, 0, -1, true);
    }, this);
  }
}
