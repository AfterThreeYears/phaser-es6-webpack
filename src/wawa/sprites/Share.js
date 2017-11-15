import Phaser from 'phaser';

export default class extends Phaser.Button {
  constructor({game, callback, callbackContext}) {
    super(game, game.world.centerX + 140, game.world.centerY + 400, 'share', callback, callbackContext);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.87);
    this.alpha = 0;
    this._addTween(game);
    game.world.add(this);
  }
  _addTween(game) {
    game.add.tween(this).to({y: game.world.centerY + 340, alpha: 1}, 300, null, true, 0);
  }
}
