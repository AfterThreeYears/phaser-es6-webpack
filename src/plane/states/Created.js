import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    this.bg = game.add.image(0, 0, 'bg');
    this.bg.width = game.width;
    this.bg.height = game.height;

    this.startBtn = game.add.button(game.world.centerX, game.height - 200, 'startbutton', this.onStartGame, this, 1, 1, 0);
    this.startBtn.anchor.setTo(0.5, 0);

    this.plane = game.add.sprite(game.world.centerX, game.world.centerY, 'myplane');
    this.plane.anchor.setTo(0.5, 0);

    this.plane.animations.add('fly');
    this.plane.animations.play('fly', 50, true);

    this.copyright = game.add.image(game.world.centerX, game.height, 'copyright');
    this.copyright.anchor.setTo(0.5, 2);
  }
  onStartGame() {
    game.state.start('Play');
  }
}