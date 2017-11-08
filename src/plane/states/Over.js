import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {
    this.score = arguments[0];
  }
  create() {
    this.bg = game.add.image(0, 0, 'bg');
    this.bg.width = game.width;
    this.bg.height = game.height;

    this.scoreText = game.add.text(game.world.centerX, game.world.centerX, `分数: ${this.score}`, {
      font: '20px',
    });
    this.scoreText.anchor.setTo(0.5, 0);

    this.againBtn = game.add.button(game.width - game.width / 2 - 40 - 80, game.height - 200, 'replaybutton', this.onAgainGame, this, 0, 0, 1);

    this.shareBtn = game.add.button(game.width - game.width / 2 - 40 + 80, game.height - 200, 'sharebutton', this.onShare, this, 0, 0, 1);

    this.plane = game.add.sprite(game.world.centerX, game.world.centerY, 'myplane');
    this.plane.anchor.setTo(0.5, 0);

    this.plane.animations.add('fly');
    this.plane.animations.play('fly', 50, true);

    this.copyright = game.add.image(game.world.centerX, game.height, 'copyright');
    this.copyright.anchor.setTo(0.5, 2);
  }
  onAgainGame() {
    game.state.start('Play');
  }
  onShare() {
    console.log('onShare');
  }
}