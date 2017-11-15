import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game}) {
    super(game, game.world.centerX, game.world.centerY, 'go');
    this.anchor.setTo(0.5);
    this.scale.setTo(2);
    this._addTween(game);
    game.world.add(this);
  }
  _addTween(game) {
    game.add.tween(this.scale).to({x: 1, y: 1}, 500, null, true, 0);
  }
}
