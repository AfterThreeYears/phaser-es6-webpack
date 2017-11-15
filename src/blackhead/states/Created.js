import Phaser from 'phaser';
import Title from '../sprites/Title';
import Wing from '../sprites/Wing';
import Girl from '../sprites/Girl';
import Stick from '../sprites/Stick';
import Fart from '../sprites/Fart';
import startGame from '../sprites/startGame';
import Go from '../sprites/Go';
import GoBg from '../sprites/GoBg';
import Voice from '../sprites/Voice';

export default (game) => {
  return class extends Phaser.State {
    create() {
      game.stage.backgroundColor = '#abcdef';
      this.drawBg();
    }
    drawBg() {
      this.music = game.add.audio('bg', 1, true, true);
      this.music.play();
      const cache = game.cache.getImage('bg');
      const bgHeight = cache.height / cache.width * game.width;
      this.bg = game.add.image(0, game.height - bgHeight, 'bg');
      this.bg.width = game.width;
      this.bg.height = bgHeight;
      this.bg.alpha = 0;

      const tween = game.add.tween(this.bg)
        .to({alpha: 1}, 800);
      tween.start();
      tween.onComplete.add(() => {
        this.drawTitle();
        this.drawCloud();
      }, this);
      this.voice = new Voice({
        game,
        x: 100,
        y: 300,
        frame: 1,
        tapCallback: this.tapVoice,
        tapContext: this,
      });
    }
    drawCloud() {
      this.scloud1 = game.add.sprite(10, game.world.centerY - 100, 'scloud1');
      this.scloud1.update = function() {
        if (this.x < -this.width) {
          this.x = game.width;
        }
        this.x -= 1;
      };
      this.scloud2 = game.add.image(200, game.world.centerY + 100, 'scloud2');
      this.scloud2.update = function() {
        if (this.x < -this.width) {
          this.x = game.width;
        }
        this.x -= 1;
      };
    }
    tapVoice() {
      const frame = this.voice.frame === 1 ? 2 : 1;
      if (frame === 1) {
        this.music.resume();
      } else {
        this.music.pause();
      }
      this.voice.changeFrame(frame);
    }
    drawTitle() {
      const arr = [{
        asset: 'shi',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: game.world.centerX - 250,
        endY: 100,
      }, {
        asset: 'shang',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: game.world.centerX - 150,
        endY: 100,
      }, {
        asset: 'xiao',
        x: game.world.centerX,
        y: game.world.centerY + 100,
        endX: game.world.centerX + 20,
        endY: 170,
      }, {
        asset: 'you',
        x: game.world.centerX + 100,
        y: game.world.centerY + 100,
        endX: game.world.centerX + 100,
        endY: 290,
      }, {
        asset: 'xi',
        x: game.world.centerX + 100,
        y: game.world.centerY + 100,
        endX: game.world.centerX + 220,
        endY: 270,
      }, {
        asset: 'redstar',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: game.world.centerX + 30,
        endY: 290,
      }, {
        asset: 'zhui',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: game.world.centerX - 250,
        endY: 230,
        scale: 0.7,
      }, {
        asset: 'wu',
        x: game.world.centerX - 100,
        y: game.world.centerY + 100,
        endX: game.world.centerX - 140,
        endY: 230,
      }];
      arr.forEach(({asset, x, y, endX, endY, scale = 1}) => {
        this.title = new Title({
          game,
          x,
          y,
          endX,
          endY,
          asset,
          scale,
        });
      });
      this.title.complete(() => {
        this.drawTitleHead();
        this.drawBody();
      });
    }
    drawTitleHead() {
      this.titleHead = game.add.sprite(205, -100, 'titleHead');
      game.add.tween(this.titleHead)
        .to({x: game.world.centerX + 100, y: 25}, 300, Phaser.Easing.Bounce.Out, true, 0, 0);
    }
    drawBody() {
      const self = this;
      new Wing({
        game,
        y: -100,
        startX: game.world.centerX + 130,
        startY: game.world.centerY - 80,
        endY: game.world.centerY - 90,
        asset: 'rightwing',
        scale: 1,
        angle: 20,
        anchorY: 0,
        anchorX: 0.5,
      });
      new Wing({
        game,
        y: -100,
        startX: game.world.centerX + 50,
        startY: game.world.centerY + 210,
        endY: game.world.centerY + 200,
        asset: 'leftwing',
        scale: 1,
        angle: -20,
        anchorY: 1,
        anchorX: 1,
      });
      new Girl({
        game,
        y: -100,
        startX: game.world.centerX,
        startY: game.world.centerY + 50,
        endY: game.world.centerY + 40,
        asset: 'girl',
        scale: 0.8,
        completeCb() {
          new Fart({
            game,
            x: game.world.centerX - 80,
            y: game.world.centerY + 250,
            asset: 'fart',
            scale: 1,
          });
          new startGame({
            game,
            callback() {
              this.onStartGame();
            },
            callbackContext: self,
          });
        },
      });
      new Stick({
        game,
        y: -100,
        startX: game.world.centerX - 220,
        startY: game.world.centerY + 270,
        endY: game.world.centerY + 260,
        asset: 'stick',
        scale: 1,
      });
    }
    onStartGame() {
      new Go({
        game,
      });
      new GoBg({
        game,
      });
      setTimeout(() => {
        game.state.start('Play');
      }, 300);
    }
  };
};
