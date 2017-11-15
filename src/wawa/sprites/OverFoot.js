import Phaser from 'phaser';

export default class extends Phaser.Image {
  constructor({game}) {
    super(game, 0, game.height - 316, 'overfoot');
    this.wdith = game.width;
    this.height = 316;
    game.world.add(this);
  }
}
