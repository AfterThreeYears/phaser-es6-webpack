import Phaser from 'phaser';

export default class extends Phaser.Graphics {
  constructor({game, x, y, color, width, height, alpha}) {
    super(game, x, y);

    this.beginFill(color, alpha);
    this.drawRect(x, y, width, height);

    game.world.add(this);
  }
}
