import Phaser from 'phaser';
import Skin from '../sprites/Skin';
import MaskInfo from '../sprites/MaskInfo';
import BlackHead from '../sprites/BlackHead';
import CrazyBlackHead from '../sprites/CrazyBlackHead';
import Rect from '../sprites/Rect';
import CrazyBg from '../sprites/CrazyBg';

export default (game) => {
  return class extends Phaser.State {
    create() {
      this.maxBlackHead = 8;
      this.score = 0;
      this.time = 13;
      this.startGame = false;
      this.replaced = false;
      this.panelGroup = game.add.group();
      new Skin({
        game,
      });
      this.noseHeight = game.height - 581 / 2 + 50;
      game.add.image(-30, this.noseHeight, 'nose');

      const rect = new Rect({
        game,
        x: 0,
        y: 0,
        color: '#000',
        width: game.width,
        height: 90,
        alpha: 1,
      });
      this.panelGroup.add(rect);
      this.scoreText = game.add.text(
        game.world.centerX - 300, 15, `消灭个数:${this.score} 个`, {font: '40px My Font', fill: '#fff'});
      this.panelGroup.add(this.scoreText);
      this.timeText = game.add.text(
        game.world.centerX, 15, `倒计时:${this.time} S`, {font: '40px My Font', fill: '#fff'});
      this.panelGroup.add(this.timeText);
      const mask = new Rect({
        game,
        x: 0,
        y: 0,
        color: '#000',
        width: game.width,
        height: game.height,
        alpha: 0.3,
      });

      this.timer = game.time.create(false);
      this.timer.loop(1000, () => {
        if (this.time > 0) {
          if (this.time <= 10 && !this.replaced) {
            this.enterCrazy();
          }
          this.time--;
          this.computedTime();
        } else {
          this.gameOver();
          game.time.events.remove(this.timer);
        }
      }, this);

      this.blackHeadGroup = game.add.group();
      this.crazyBlackHeadGroup = game.add.group();

      this.rhand = game.add.image(0, -300, 'rhand');
      this.rhand.anchor.setTo(1, 0.5);
      this.lhand = game.add.image(0, -300, 'lhand');
      this.lhand.anchor.setTo(0, 0.4);

      const maskinfo = new MaskInfo({
        game,
        callback() {
          mask.kill();
          maskinfo.kill();
          this.timer.start();
          this.startGame = true;
        },
        callbackContext: this,
      });
    }
    update() {
      game.world.bringToTop(this.panelGroup);
      let i = 0;
      const list = this.replaced ? this.crazyBlackHeadGroup :
        this.blackHeadGroup;
      list.forEachAlive(() => {
        i++;
      });
      if (this.maxBlackHead > i) {
        const {x, y} = this.generatePosition();
        if (this.replaced) {
          this.generateCrazyBlackHead(x, y);
        } else {
          this.generateBlackHead(x, y);
        }
      }
    }
    generatePosition() {
      const blackHeadCache = game.cache.getImage('blackhead');
      const x = game.rnd.between(blackHeadCache.width / 2, game.width - blackHeadCache.width / 2);
      const y = game.rnd.between(blackHeadCache.width / 2 + 90, this.noseHeight - blackHeadCache.width / 2);
      return {
        x,
        y,
      };
    }
    generateBlackHead(x, y) {
      const blackHead = new BlackHead({
        game,
        x,
        y,
        asset: 'blackhead',
        callback: this.extrusion,
        callbackContext: this,
      });
      this.blackHeadGroup.add(blackHead);
    }
    generateCrazyBlackHead(x, y) {
      const crazyBlackHead = new CrazyBlackHead({
        game,
        x,
        y,
        asset: 'crazyblackhead',
        callback: this.extrusion,
        callbackContext: this,
      });
      this.crazyBlackHeadGroup.add(crazyBlackHead);
    }
    generateKilledBlackHead(x, y) {
      const killedblackhead = game.add.image(x, y, 'killedblack');
      killedblackhead.anchor.setTo(0.5);
      setTimeout(() => {
        this.score += 1;
        this.scoreText.text = `消灭个数:${this.score} 个`;
        killedblackhead.kill();
      }, 60);
    }
    extrusion(blackhead, pointer) {
      if (!this.startGame) return;
      this.generateKilledBlackHead(pointer.x, pointer.y);
      blackhead.kill();
      this.moveHand(pointer.x, pointer.y);
    }
    replaceBlackHead() {
      this.blackHeadGroup.forEachAlive((blackHead) => {
        this.generateCrazyBlackHead(blackHead.x, blackHead.y);
        blackHead.kill();
      });
    }
    moveHand(x, y) {
      this.rhand.y = y;
      this.lhand.y = y;
      setTimeout(() => {
        this.rhand.x = x;
        this.lhand.x = x;
      }, 30);
      setTimeout(() => {
        this.rhand.x = x - 100;
        this.lhand.x = x + 100;
      }, 60);
    }
    computedTime() {
      this.timeText.text = `倒计时:${this.time} S`;
    }
    gameOver() {
      game.state.start('Over', true, false, this.score);
    }
    enterCrazy() {
      this.replaced = true;
      this.replaceBlackHead();
      this.addCrazyMask();
      this.timeText.style.fill = 'red';
    }
    addCrazyMask() {
      new CrazyBg({
        game,
      });
    }
  };
};
