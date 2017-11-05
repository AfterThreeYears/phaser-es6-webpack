import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    var background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    background.autoScroll(-10, 0);
    var ground = game.add.tileSprite(0, game.height - 112, game.width, 112, 'ground');
    ground.autoScroll(-100 ,0);
    var titleGroup = game.add.group();
    titleGroup.create(0, 0, 'title');
    var bird = titleGroup.create(190, 10, 'bird');
    bird.animations.add('fly');
    bird.animations.play('fly', 30, true);
    titleGroup.x = 35;
    titleGroup.y = 100;
    game.add.tween(titleGroup)
    .to({y: 120}, 1000, null, true, 0, Number.MAX_VALUE, true);

    var btn = game.add.button(game.width / 2, game.height / 2, 'start-button', () => {
      game.state.start('Play');
    });
    btn.anchor.setTo(0.5, 0.5);
  }
}