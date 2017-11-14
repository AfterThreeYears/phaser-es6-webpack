import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, x, y, asset, callback, callbackContext}) {
    super(game, x, y, asset);

    this.anchor.setTo(0.5);
    this.scale.setTo(0);
    game.add.tween(this.scale)
      .to({x: 1, y: 1}, 100, null, true);

    this.animations.add('fly');
    this.animations.play('fly', 30, true);
    this.anchor.setTo(0.5);
    this.inputEnabled = true;
    this.events.onInputDown.add(callback, callbackContext);
    game.world.add(this);
  }
}
