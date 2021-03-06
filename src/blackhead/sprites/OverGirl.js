import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, x, y, completeCb, completeCbContext}) {
    super(game, x, y - 1000, 'overgirl');
    this.anchor.setTo(0.5);
    this.alpha = 0;
    this._addTween(game, y, completeCb, completeCbContext);
    game.world.add(this);
  }
  _addTween(game, y, completeCb, completeCbContext) {
    const startTween = game.add.tween(this).to({y, alpha: 1}, 300, null, true, 0);
    startTween.onComplete.add(() => {
      completeCb();
    }, completeCbContext);
  }
}
