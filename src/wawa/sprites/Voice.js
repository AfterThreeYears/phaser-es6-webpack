import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({game, x, y, frame, scale = 1, tapCallback, tapContext}) {
    super(game, x, y, 'voice', frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(scale);
    // this._addTween(game, startY, endY, completeCb);
    this.inputEnabled = true;
    this.events.onInputDown.add(tapCallback, tapContext);
    game.world.add(this);
  }
  _addTween(game, startY, endY, completeCb) {
    // const startTween = game.add.tween(this).to({y: startY}, 500, Phaser.Easing.Bounce.Out, true, 0, 0);
    // startTween.onComplete.add(() => {
    //   completeCb();
    //   game.add.tween(this).to( {y: endY}, 500, null, true, 0, -1, true);
    // }, this);
  }
  changeFrame(index) {
    this.frame = index;
  }
}
