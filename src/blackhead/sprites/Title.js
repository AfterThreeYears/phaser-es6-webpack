import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, x, y, asset, endX, endY, scale}) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.scale.setTo(5);

    this.tween = game.add.tween(this)
      .to({x: [game.world.centerX, endX], y: [game.world.centerY, endY]}, 300, null, true, 0, 0);
    this.tween.interpolation(function(v, k) {
      return Phaser.Math.bezierInterpolation(v, k);
    });
    game.add.tween(this.scale)
      .to({x: scale, y: scale}, 300, null, true, 0, 0);
    game.world.add(this);
  }
  complete(cb) {
    this.tween.onComplete.add(cb);
  }
}
