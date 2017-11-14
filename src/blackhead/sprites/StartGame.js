import Phaser from 'phaser';

export default class extends Phaser.Button {
  constructor({game, callback, callbackContext}) {
    super(game, game.world.centerX, game.height - 100, 'startgame', callback, callbackContext);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.5);
    this._addTween(game);
    game.world.add(this);
  }
  _addTween(game) {
    game.add.tween(this.scale).to({x: 1, y: 1}, 1500, Phaser.Easing.Bounce.Out, true, 0);
  }
}
