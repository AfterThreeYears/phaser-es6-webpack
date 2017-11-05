import Phaser from 'phaser';

export default class extends Phaser.State {
  preload() {
    var preloadSprite = game.add.sprite(34, game.height / 2, 'loading');
    game.load.setPreloadSprite(preloadSprite);

    game.stage.backgroundColor = '#000';
    game.load.crossOrigin = 'anonymous';

    game.load.image('background', './flappybird/images/background.png');
    game.load.image('gameover', './flappybird/images/gameover.png');
    game.load.image('get-ready', './flappybird/images/get-ready.png');
    game.load.image('ground', './flappybird/images/ground.png');
    game.load.image('instructions', './flappybird/images/instructions.png');
    game.load.image('scoreboard', './flappybird/images/scoreboard.png');
    game.load.image('start-button', './flappybird/images/start-button.png');
    game.load.image('title', './flappybird/images/title.png');

    game.load.spritesheet('bird', './flappybird/images/bird34*24*3.png', 34, 24, 3);
    game.load.spritesheet('pipe', './flappybird/images/pipes54*320*2.png', 54, 320, 2);
    
    game.load.bitmapFont('flappy_font', './flappybird/fonts/flappyfont.png', './flappybird/fonts/flappyfont.fnt');
  
    game.load.audio('bg', './flappybird/audios/bg.mp3');
    game.load.audio('flap', './flappybird/audios/flap.wav');
    game.load.audio('pipe-hit', './flappybird/audios/pipe-hit.wav');
    // 撞到地上
    game.load.audio('ouch', './flappybird/audios/ouch.wav');
    game.load.audio('score', './flappybird/audios/score.wav');
  }
  create () {
    game.state.start('Created');
  }
}