import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    preload() {
      const preloadSprite = game.add.sprite(10, game.height / 2, 'loading');
      game.load.setPreloadSprite(preloadSprite);

      game.stage.backgroundColor = '#f54a7e';
      game.load.audio('bgm', 'http://meipu1.video.meipai.com/93d3dfba-cee7-4f20-894c-715d439bdb8d.mp3');
      game.load.audio('countdown', 'http://meipu1.video.meipai.com/574140d6-0b1f-40f9-85ab-3133dd90ef63.mp3');
      game.load.audio('success', 'http://meipu1.video.meipai.com/6f59b0b7-abe8-484d-a70c-edc0e5bfde7d.mp3');
      game.load.audio('fail', 'http://meipu1.video.meipai.com/b817f7a0-602b-454e-8d63-02ecb4ffb8e9.mp3');
      game.load.image('bg', 'http://meipu1.video.meipai.com/dd6380c6-ebff-4412-8972-8ec25d972ffc.png');
      game.load.image('floor', 'http://meipu1.video.meipai.com/1976446a-247c-43ed-8496-1058ab8d451b.png');
      game.load.image('btn', 'http://meipu1.video.meipai.com/512daf96-8ee1-4ddf-bb54-ab86bf3a3796.png');
      game.load.image('glass', 'http://meipu1.video.meipai.com/82d26d1b-d48b-41ec-887c-73dad7cb4b46.png');
      game.load.image('pole', 'http://meipu1.video.meipai.com/fe401f70-29cc-47f4-9c94-a94b14a003ea.png');

      game.load.image('open', 'http://meipu1.video.meipai.com/6b78702b-9276-4eb5-ad34-348749d6406f.png');
      game.load.image('close', 'http://meipu1.video.meipai.com/84e9b4b8-6b71-4ff3-92a9-a5dd0ae802fd.png');
      game.load.atlas('claw',
        'http://meipu1.video.meipai.com/fafe10e8-f945-4f46-88f4-5ac6116a836a.png',
        'http://meipu1.video.meipai.com/47acc25e-a6ff-4c24-a4ae-8a381c5ba43d.json');
      game.load.atlas('dolls',
        'http://meipu1.video.meipai.com/ec56ec4c-816a-4880-be62-bb19130742ba.png',
        'http://meipu1.video.meipai.com/edc90ccb-103f-4bb2-a272-9aabea5550b8.json');
      game.load.atlas('shadowDolls',
        'http://meipu1.video.meipai.com/c1195e91-6af2-43a6-b9c1-d22203893deb.png',
        'http://meipu1.video.meipai.com/07644421-1860-4449-9864-14e0d8e28eba.json');
      game.load.atlas('icon',
        'http://meipu1.video.meipai.com/0afb5260-e62f-448c-be54-c76a6540a8a3.png',
        'http://meipu1.video.meipai.com/1310e03d-f746-40b5-a61e-17620fe163d1.json');
    }
    create() {
      game.state.start('Play');
    }
  };
};
