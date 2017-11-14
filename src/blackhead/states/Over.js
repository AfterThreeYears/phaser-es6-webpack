import Phaser from 'phaser';
import OverFoot from '../sprites/OverFoot';
import OverBox from '../sprites/OverBox';
import Again from '../sprites/Again';
import Share from '../sprites/Share';
import OverGirl from '../sprites/OverGirl';

export default (game) => {
  return class extends Phaser.State {
    init() {
      game.stage.backgroundColor = '#abcdef';
      this.score = arguments[0] || 0;
    }
    create() {
      const self = this;
      new OverFoot({
        game,
      });
      const overbox = new OverBox({
        game,
        completeCb() {
          new OverGirl({
            game,
            x: game.world.centerX,
            y: 130,
            completeCb() {
              new Again({
                game,
                callback() {
                  this.onAgainGame();
                },
                callbackContext: self,
              });
              new Share({
                game,
                callback() {
                  this.onShare();
                },
                callbackContext: self,
              });
            },
          });
        },
      });
      const style = {
        font: '40px My Font',
        wordWrap: true,
        wordWrapWidth: 582,
      };
      this.topText = game.add.text(overbox.x, overbox.y - 150,
        `WOW居然挤了${this.score}颗黑头!! 被我们评为：`,
        style);
      this.topText.anchor.setTo(0.5);
      this.midText = game.add.text(overbox.x, overbox.y - 20,
        '小纯洁',
        {
          ...style,
          ...{
            font: '80px My Font',
            align: 'center',
          },
        });
      this.midText.anchor.setTo(0.5);
      this.bottomText = game.add.text(overbox.x, overbox.y + 150,
        '你的纯洁超乎我相信！ 送你一份纯洁的小礼包， 希望你继续做好美图美妆 的社会主义接班人~',
        style);
      this.bottomText.anchor.setTo(0.5);
      this.logo = game.add.image(overbox.x, overbox.y + 300, 'logo');
      this.logo.anchor.setTo(0.5);
    }
    onAgainGame() {
      game.state.start('Created');
    }
    onShare() {
      console.log('onShare');
    }
  };
};
