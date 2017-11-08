import Phaser from 'phaser';

export default class extends Phaser.State {
  preload() {
    var preloadSprite = game.add.sprite(34, game.height / 2, 'loading');
    game.load.setPreloadSprite(preloadSprite);

    game.stage.backgroundColor = '#000';
    game.load.crossOrigin = 'anonymous';

    // game.load.audio('ao', './plane/images/ao.mp3');
    // game.load.audio('crash1', './plane/images/crash1.mp3');
    // game.load.audio('crash2', './plane/images/crash2.mp3');
    // game.load.audio('crash3', './plane/images/crash3.mp3');
    // game.load.audio('deng', './plane/images/deng.mp3');
    // game.load.audio('fashe', './plane/images/fashe.mp3');
    // game.load.audio('normalback', './plane/images/normalback.mp3');
    // game.load.audio('playback', './plane/images/playback.mp3');
    // game.load.audio('pi', './plane/images/pi.mp3');

    game.load.image('award', './plane/images/award.png');
    game.load.image('bg', './plane/images/bg.jpg');
    game.load.image('bullet', './plane/images/bullet.png');
    game.load.image('mybullet', './plane/images/mybullet.png');
    game.load.image('close', './plane/images/close.png');
    game.load.image('copyright', './plane/images/copyright.png');
    game.load.image('enemy1', './plane/images/enemy1.png');
    game.load.image('enemy2', './plane/images/enemy2.png');
    game.load.image('enemy3', './plane/images/enemy3.png');
    game.load.image('logo', './plane/images/logo.jpg');
    game.load.image('share', './plane/images/share.png');

    game.load.spritesheet('explode1', './plane/images/explode1.png', 20, 20, 3);
    game.load.spritesheet('explode2', './plane/images/explode2.png', 30, 30, 3);
    game.load.spritesheet('explode3', './plane/images/explode3.png', 50, 50, 3);
    game.load.spritesheet('myexplode', './plane/images/myexplode.png', 40, 40, 3);
    game.load.spritesheet('myplane', './plane/images/myplane.png', 40, 40, 4);
    game.load.spritesheet('replaybutton', './plane/images/replaybutton.png', 80, 30, 2);
    game.load.spritesheet('sharebutton', './plane/images/sharebutton.png', 80, 30, 2);
    game.load.spritesheet('startbutton', './plane/images/startbutton.png', 100, 40, 2);
  }
  create () {
    game.state.start('Created');
  }
}