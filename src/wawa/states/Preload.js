import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    preload() {
      const preloadSprite = game.add.sprite(10, game.height / 2, 'loading');
      game.load.setPreloadSprite(preloadSprite);

      game.stage.backgroundColor = '#000';
      // game.load.crossOrigin = 'anonymous';
      game.load.image('bg', 'http://meipu1.video.meipai.com/dd6380c6-ebff-4412-8972-8ec25d972ffc.png');
      game.load.image('floor', './wawa/images/floor.png');
      game.load.image('btn', './wawa/images/btn.png');
      game.load.image('glass', 'http://meipu1.video.meipai.com/82d26d1b-d48b-41ec-887c-73dad7cb4b46.png');
      game.load.image('pole', 'http://meipu1.video.meipai.com/93cd9c02-ca39-4281-b5a0-d1c3c8dce07f.png');
      game.load.image('open', 'http://meipu1.video.meipai.com/6b78702b-9276-4eb5-ad34-348749d6406f.png');
      game.load.image('close', 'http://meipu1.video.meipai.com/84e9b4b8-6b71-4ff3-92a9-a5dd0ae802fd.png');
      game.load.atlas('dolls', './wawa/images/wawa.png', './wawa/images/wawa.json');
      game.load.atlas('icon', './wawa/images/icon.png', './wawa/images/icon.json');
    }
    create() {
      game.state.start('Play');
    }
  };
};
