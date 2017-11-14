import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game}) {
    super(game, game.world.centerX, game.world.centerY, 'crazybg');
    this.anchor.setTo(0.5);
    this.width = game.width;
    this.height = game.height;
    this._addTween(game);
    game.world.add(this);
  }
  _addTween(game) {
    game.add.tween(this.scale).to({x: 1.1, y: 1.1}, 300, null, true, 0, -1, true);
  }
}
