import Phaser from 'phaser';

export default class extends Phaser.Button {
  constructor({game, callback, callbackContext}) {
    super(game, game.world.centerX, game.world.centerY, 'maskinfo', callback, callbackContext);
    this.anchor.setTo(0.5);
    game.world.add(this);
  }
}
