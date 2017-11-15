import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game}) {
    // super(game, (game.width - 720 / 2) / 2, Math.min(Math.abs((game.height - 1280 / 2)), 0), 'skin');
    super(game, 0, 0, 'skin');
    console.log(game.width);
    this.wdith = game.width;
    this.height = game.height;
    game.world.add(this);
  }
}
