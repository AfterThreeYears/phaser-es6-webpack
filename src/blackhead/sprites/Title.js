import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, x, y, asset, endX, endY}) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.scale.setTo(5);

    const tween = game.add.tween(this)
      .to({x: [game.world.centerX, endX], y: [game.world.centerY, endY]}, 300, null, true, 0, 0);
    tween.interpolation(function(v, k) {
      return Phaser.Math.bezierInterpolation(v, k);
    });
    game.add.tween(this.scale)
      .to({x: 0.5, y: 0.5}, 300, null, true, 0, 0);
    game.world.add(this);
  }
}
