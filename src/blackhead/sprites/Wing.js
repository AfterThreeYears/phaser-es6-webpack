import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, y, startX, startY, endY, asset, angle, scale, anchorY, anchorX}) {
    super(game, startX, y, asset);
    this.scale.setTo(scale);
    this.anchor.setTo(anchorX, anchorY);
    game.world.add(this);
    this._addTween(game, angle, startY, endY);
  }
  _addTween(game, angle, startY, endY) {
    const startTween = game.add.tween(this).to({y: startY}, 500, Phaser.Easing.Bounce.Out, true, 0, 0);
    startTween.onComplete.add(() => {
      game.add.tween(this).to( {y: endY}, 500, null, true, 0, -1, true);
      const tween = game.add.tween(this).to({angle}, 200, null, true, 0, 2, true);
      tween.onComplete.add(() => {
        setTimeout(() => {
          tween.start();
        }, 2000);
      }, this);
    });
  }
}
