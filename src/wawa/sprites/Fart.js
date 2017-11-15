import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, x, y, asset, scale}) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.scale.setTo(scale);
    this._addTween(game, x, y);
    game.world.add(this);
  }
  _addTween(game, x, y) {
    game.add.tween(this).to({x: x - 30, y: y + 30, alpha: 0}, 1500, null, true, 0, -1);
  }
}
