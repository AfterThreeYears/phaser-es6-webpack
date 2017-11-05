import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    this.lock = false;
    
    this.startText = game.add.text(game.world.centerX, game.world.centerY, '开始游戏', {fill: '#fff', font: '20px'});
    this.startText.anchor.setTo(0.5);
    this.startText.inputEnabled = true;
    this.startText.events.onInputDown.add(this.startGame, this);

    this.helpText = game.add.text(game.world.centerX, game.world.centerY + 100, '游戏说明', {fill: '#fff', font: '20px'});
    this.helpText.anchor.setTo(0.5);
    this.helpText.inputEnabled = true;
    this.helpText.events.onInputDown.add(this.help, this);
  }
  startGame() {
    game.state.start('Play');
  };
  help() {
    if (this.lock) return;
    this.lock = true;
    this.descText = game.add.text(game.world.centerX, game.world.centerY - 200, '抓娃娃游戏', {fill: '#fff', font: '20px'});
    this.descText.scale.setTo(0);
    this.descText.anchor.setTo(0.5);
    this.tween = game.add.tween(this.descText.scale)
    .to({x: 1, y: 1}, 2000, Phaser.Easing.Elastic.Out, true);
    game.time.events.add(Phaser.Timer.SECOND * 2, function() {
      this.tween = game.add.tween(this.descText.scale)
      .to({x: 0, y: 0}, 2000, Phaser.Easing.Elastic.Out, true);
      game.time.events.add(2000, function() {
        this.lock = false;
      }, this);
    }, this);
  }
}