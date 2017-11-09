import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    preload() {
      const preloadSprite = game.add.sprite(34, game.height / 2, 'loading');
      game.load.setPreloadSprite(preloadSprite);

      game.stage.backgroundColor = '#000';
      game.load.crossOrigin = 'anonymous';

      game.load.audio('ao', './plane/images/ao.mp3');
      game.load.audio('crash1', './plane/images/crash1.mp3');
      game.load.audio('crash2', './plane/images/crash2.mp3');
      game.load.audio('crash3', './plane/images/crash3.mp3');
      game.load.audio('deng', './plane/images/deng.mp3');
      game.load.audio('fashe', './plane/images/fashe.mp3');
      game.load.audio('normalback', './plane/images/normalback.mp3');
      game.load.audio('playback', './plane/images/playback.mp3');
      game.load.audio('pi', './plane/images/pi.mp3');

      game.load.image('award', './plane/images/award.png');
      game.load.image('bg', 'http://meipu1.video.meipai.com/7471ea06-3730-4ee3-95cc-efa990b45747.png');
      game.load.image('scloud1', 'http://meipu3.video.meipai.com/27b32f6e-f7bf-4f78-8010-d7de947f2d6b.png');
      game.load.image('scloud2', 'http://meipu4.video.meipai.com/de6fd8ad-c91c-4b37-988f-7c97d08f7dfb.png');
      game.load.image('shi', 'http://meipu3.video.meipai.com/51fe7acc-aea4-4baf-9de8-6d3d0ba20bb9.png');
      game.load.image('shang', 'http://meipu2.video.meipai.com/5f2c3568-64ab-45e8-ad0e-c0bf2d8a33d9.png');
      game.load.image('xiao', 'http://meipu1.video.meipai.com/a4d0b40e-81bf-46d0-9cff-bf7da6ed5d32.png');
      game.load.image('you', 'http://meipu2.video.meipai.com/a85e02d2-4f56-4314-a4c1-80a59b1f10a9.png');
      game.load.image('xi', 'http://meipu2.video.meipai.com/76930240-0928-4f0d-b266-2372dc7850bd.png');
      game.load.image('redstar', 'http://meipu2.video.meipai.com/135fcb2d-6033-434b-a31a-95cce927aeaf.png');
      game.load.image('zhui', 'http://meipu2.video.meipai.com/39838349-c2e3-41d2-863b-9a7eafa7f7d6.png');
      game.load.image('wu', 'http://meipu1.video.meipai.com/efc343ac-253c-4b41-9a5f-d6475afff8e2.png');
      game.load.image('titleHead', 'http://meipu4.video.meipai.com/ba3510a6-aeb0-4647-be2e-f1661d353c50.png');

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
    create() {
      game.state.start('Created');
    }
  };
};
