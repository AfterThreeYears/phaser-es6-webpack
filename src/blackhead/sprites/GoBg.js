import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game}) {
    super(game, game.world.centerX, game.world.centerY, 'gobg');
    this.anchor.setTo(0.5);
    this.width = game.width;
    this.height = game.height;
    this.scale.setTo(1.3);
    this._addTween(game);
    game.world.add(this);
  }
  _addTween(game) {
    game.add.tween(this.scale).to({x: 0.9, y: 0.9}, 500, null, true, 0);
  }
}
