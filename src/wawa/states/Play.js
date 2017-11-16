import Phaser from 'phaser';
import {dollsTypes} from '../config';
export default (game) => {
  return class extends Phaser.State {
    create() {
      this.now = Date.now();
      this.item = null;
      this.dollIndex = 0;
      this.clawSpeed = 400;
      this.dollSpeed = -100;
      this.clawPosition = 60;
      this.dollTime = dollsTypes[0].time;
      // 抓到娃娃
      this.grabOne = false;
      this.time = 100;
      this.end = false;

      this.createMuisc();
      
      // 定时器
      this.timer = game.time.events.loop(1000, function() {
        if (this.time > 0) {
          this.time--;
          this.computedTime();
        } else {
          this.gameOver();
          game.time.events.remove(this.timer);
        }
      }, this);
      game.time.events.start();

      // 绘制背景
      this.bg = game.add.image(0, 0, 'bg');
      this.bg.width = game.width;
      this.bg.height = game.height;

      // 绘制玻璃
      this.glass = game.add.image(0, 0, 'glass');
      this.glass.width = game.width;
      this.glass.height = game.height;

      // 地板
      this.floor = game.add.sprite(game.world.centerX, game.height - 140, 'floor');
      this.floor.anchor.setTo(0.5, 0);
      this.floor.scale.setTo(1, 0.8);

      this.drawScore();
      this.drawTime();

      // 绘制玩偶
      this.dollGroup = this.add.group();
      this.dollGroup.enableBody = true;

      game.physics.enable(this.dollGroup, Phaser.Physics.ARCADE);

      this.dollPollGroup = this.add.group();
      this.dollPollGroup.enableBody = true;

      game.physics.enable(this.dollPollGroup, Phaser.Physics.ARCADE);

      this.clawGroup = this.add.group();
      this.clawGroup.enableBody = true;

      this.pole = game.add.tileSprite(
        game.world.centerX,
        -game.height,
        13,
        game.height + this.clawPosition + 5,
        'pole',
        null,
      );
      this.pole.anchor.setTo(0.5, 0);
      game.physics.arcade.enable(this.pole);

      this.claw = game.add.sprite(game.world.centerX, 0, 'claw', 'open.png', this.clawGroup);
      this.claw.anchor.setTo(0.5, 0);

      game.physics.enable(this.clawGroup, Phaser.Physics.ARCADE);

      this.claw.update = () => {
        if (this.claw.y < this.clawPosition) {
          this.setClawSpeed(0);
          this.clawGroup.setAll('body.y', this.clawPosition);
          this.grabOne = false;
          this.pole.body.y = -game.height;

          if (!this.item) return;
          this.addScore();
          this.item.kill();
          this.item = null;
        }
      };
      // 进行抓取
      game.input.onDown.add(this.grab, this);

      game.add.sprite(game.width - 100, 60, 'icon', 'star').anchor.setTo(0.5);
      game.add.sprite(60, 60, 'icon', 'time').anchor.setTo(0.5);
    }
    update() {
      game.world.bringToTop(this.glass);
      game.physics.arcade.overlap(this.clawGroup, this.dollGroup, this.hit, null, this);
      this.drawClaw();
      if (Date.now() - this.now > this.dollTime) {
        if (this.end) return;
        const {name, time} = dollsTypes[this.dollIndex % dollsTypes.length];
        this.dollTime = time;
        this.generateDolls({name});
        this.now = Date.now();
        this.dollIndex += 1;
      }
    }
    generateDolls({name}) {
      const doll = this.dollGroup.getFirstExists(false, true, -400, game.height, 'shadowDolls', name);
      doll.scale.setTo(1.2, 1.2);
      doll.anchor.setTo(0.5, 0);
      doll.y = this.floor.centerY - doll.height;
      doll.x = -doll.width / 2;
      doll.checkWorldBounds = true;
      doll.outOfBoundsKill = true;
      doll.body.velocity.x = -this.dollSpeed;
      this.dollGroup.add(doll);
      return doll;
    }
    generatePollDolls({x, y, frameName}) {
      const doll = this.dollPollGroup.getFirstExists(false, true, x || game.world.centerX, y, 'dolls', frameName);
      doll.scale.setTo(0.8, 0.8);
      doll.anchor.setTo(0.5, 0);
      doll.body.velocity.y = -this.clawSpeed;
      this.dollPollGroup.add(doll);
      return doll;
    }
    hit(clawGroup, doll) {
      if (this.item) return;
      const clawBottom = clawGroup.y + clawGroup.height;
      const floorCenter = this.floor.y + this.floor.height / 2;
      if (clawBottom >= floorCenter - 20) {
        this.grabOne = true;
        this.isGrab(doll);
        this.setClawSpeed(-this.clawSpeed);
      }
    }
    isGrab(doll) {
      const distance = Math.abs(doll.centerX - game.world.centerX);
      console.log(`差了${distance},方向是往${this.pole.body.velocity.y > 0 ? '下' : '上'}`);
      if (distance < 40 && this.pole.body.velocity.y > 0) {
        doll.kill();
        this.item = this.generatePollDolls(doll);
        this.success.play();
      } else {
        this.fail.play();
      }
    }
    grab() {
      if (this.grabOne || this.end) return;
      this.setClawSpeed(this.clawSpeed);
    }
    setClawSpeed(speed) {
      this.clawGroup.setAll('body.velocity.y', speed);
      this.pole.body.velocity.y = speed;
    }
    drawClaw() {
      if (this.grabOne) {
        this.claw.frameName = 'close.png';
      } else {
        this.claw.frameName = 'open.png';
      }
    }
    drawScore() {
      const style = {
        fill: '#fff',
      };
      this.score = 0;
      this.scoreText = game.add.text(game.width - 60, 45, this.score, style);
    }
    addScore() {
      this.score++;
      this.scoreText.text = this.score;
    }
    drawTime() {
      const style = {
        fill: '#fff',
      };
      this.timeText = game.add.text(100, 45, this.time, style);
    }
    computedTime() {
      this.timeText.text = this.time;
    }
    gameOver() {
      this.end = true;
      this.setClawSpeed(0);
      this.dollGroup.setAll('body.velocity.x', 0);
      const style = {
        fill: '#fff',
        font: '40px',
      };
      this.playAngin = game.add.text(game.world.centerX, game.world.centerY, '在玩一次', style);
      this.playAngin.anchor.setTo(0.5);
      this.playAngin.inputEnabled = true;
      this.playAngin.events.onInputDown.add(function() {
        game.state.start('Play');
      });
    }
    createMuisc() {
      this.bgm = game.add.audio('bgm');
      this.success = game.add.audio('success');
      this.fail = game.add.audio('fail');
      game.sound.setDecodedCallback(this.bgm, this.startPlay, this);
    }
    startPlay() {
      this.bgm.loopFull(1);
    }
    render() {
      // game.debug.spriteInfo(this.floor, 32, 32);
    }
  };
};
