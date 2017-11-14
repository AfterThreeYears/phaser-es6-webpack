import Phaser from 'phaser';

export default class extends Phaser.Image {
  constructor({game, completeCb}) {
    super(game, game.world.centerX, game.world.centerY - 100, 'overbox');
    this.anchor.setTo(0.5);
    this.scale.setTo(1.5);
    this._addTween(game, completeCb);
    game.world.add(this);
  }
  _addTween(game, completeCb) {
    const startTween = game.add.tween(this.scale).to({x: 0.9, y: 1}, 300, Phaser.Easing.Bounce.Out, true, 0);
    startTween.onComplete.add(() => {
      completeCb();
    }, this);
  }
}
