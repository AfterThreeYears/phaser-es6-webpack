import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    preload() {
      const preloadSprite = game.add.sprite(34, game.height / 2, 'loading');
      game.load.setPreloadSprite(preloadSprite);

      game.stage.backgroundColor = '#000';
      // game.load.crossOrigin = 'anonymous';

      game.load.image('fart', 'http://meipu4.video.meipai.com/d68785ea-be4a-46d4-abe0-8edd92a3ab1a.png');
      game.load.image('stick', 'http://meipu1.video.meipai.com/e6f7fccc-700d-4403-9d1d-8f7172680687.png');
      game.load.image('rightwing', 'http://meipu3.video.meipai.com/abc46b8e-2b58-4ee8-8987-138512d564ff.png');
      game.load.image('leftwing', 'http://meipu2.video.meipai.com/16ad3295-7563-4fab-aa59-55cd9c93cfba.png');
      game.load.image('girl', 'http://meipu1.video.meipai.com/3e6c4584-3a7b-41f8-ba50-c1d19590650c.png');
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
      game.load.image('startgame', 'http://meipu4.video.meipai.com/1d3e5b13-5b36-44b8-b459-f36c79e3ac91.png');
      game.load.image('go', 'http://meipu2.video.meipai.com/d63e958d-20cc-42da-9f8e-32778f14a526.png');
      game.load.image('gobg', 'http://meipu4.video.meipai.com/599d9dbb-c5c8-49b4-aced-7acbf3fc074b.png');
      game.load.image('crazybg', 'http://meipu3.video.meipai.com/6dace965-c5af-47b4-9c3e-8bee579fc3c3.png');
      game.load.image('skin',
        'http://meipu1.video.meipai.com/4f7831ca-cdb7-4001-966b-148c3a9f7b1b.png?imageView2/1/w/640/h/1136/q/100');
      game.load.image('maskinfo', 'http://meipu4.video.meipai.com/bce6037a-d0a4-4186-9982-63e04e8b720f.png');
      game.load.image('nose', 'http://meipu2.video.meipai.com/50e0f1f9-d978-4e02-a95d-26bf0fdaced1.png');
      game.load.image('rhand', 'http://meipu2.video.meipai.com/9b18fc69-67fc-41d6-a578-ce233f2acb3f.png');
      game.load.image('lhand', 'http://meipu1.video.meipai.com/b06b4f98-067c-4d1a-ad8f-c4742db8740f.png');
      game.load.image('killedblack', 'http://meipu1.video.meipai.com/0df66d2e-da6f-405c-81fb-d6c203f227ac.png');
      game.load.image('overbox', 'http://meipu3.video.meipai.com/1fdab595-b30d-477a-9175-efab21bc427d.png');
      game.load.image('overfoot', 'http://meipu4.video.meipai.com/b6acee8a-9839-4cf9-8f81-df45abfdf759.png');
      game.load.image('share', 'http://meipu1.video.meipai.com/18ff9fab-1502-4ff6-bbf8-6b3c9828bb75.png');
      game.load.image('overgirl', 'http://meipu1.video.meipai.com/244c1130-9144-4c6d-b626-1b2f572d1501.png');
      game.load.image('again', 'http://meipu3.video.meipai.com/568a50c8-60a7-4668-aa15-64311854def6.png');
      game.load.image('logo', 'http://meipu3.video.meipai.com/e6f5bcab-7d0e-4958-936f-e15bc69fce42.png');
      game.load.spritesheet(
        'blackhead',
        'http://meipu3.video.meipai.com/854a51dd-e1bf-4edf-b37e-71cf58794b43.png',
        142, 111, 4);
      game.load.spritesheet(
        'crazyblackhead',
        'http://meipu4.video.meipai.com/837bd3ec-587b-4043-a9a2-275e52d2ec74.png',
        142, 111, 4);
    }
    create() {
      game.state.start('Created');
    }
  };
};
