import Phaser from 'phaser';
import Title from '../sprites/Title';

export default (game) => {
  return class extends Phaser.State {
    create() {
      const cache = game.cache.getImage('bg');
      const bgHeight = cache.height / cache.width * game.width;
      this.bg = game.add.image(0, game.height - bgHeight, 'bg');
      this.bg.width = game.width;
      this.bg.height = bgHeight;

      this.drawTitle();
      this.drawCloud();
      // {
      //   asset: 'titleHead',
      //   x: game.world.centerX - 100,
      //   y: game.world.centerY + 100,
      //   endX: 220,
      //   endY: 35,
      // },
    }
    drawCloud() {
      this.scloud1 = game.add.sprite(10, game.world.centerY - 100, 'scloud1');
      this.scloud1.scale.setTo(0.5);
      this.scloud1.update = function() {
        if (this.x < -this.width) {
          this.x = game.width;
        }
        this.x -= 1;
      };
      this.scloud2 = game.add.image(200, game.world.centerY + 100, 'scloud2');
      this.scloud2.scale.setTo(0.5);
      this.scloud2.update = function() {
        if (this.x < -this.width) {
          this.x = game.width;
        }
        this.x -= 1;
      };
    }
    drawTitle() {
      const arr = [{
        asset: 'shi',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 30,
        endY: 50,
      }, {
        asset: 'shang',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 70,
        endY: 40,
      }, {
        asset: 'xiao',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 140,
        endY: 70,
      }, {
        asset: 'you',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 220,
        endY: 130,
      }, {
        asset: 'xi',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 260,
        endY: 110,
      }, {
        asset: 'redstar',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 160,
        endY: 145,
      }, {
        asset: 'zhui',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 10,
        endY: 100,
      }, {
        asset: 'wu',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: 59,
        endY: 90,
      }];
      arr.forEach(({asset, x, y, endX, endY}) => {
        new Title({
          game,
          x,
          y,
          endX,
          endY,
          asset,
        });
      });
    }
    onStartGame() {
      game.state.start('Play');
    }
  };
};
