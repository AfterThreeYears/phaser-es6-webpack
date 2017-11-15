import Phaser from 'phaser';
import {dollsTypes} from '../config';
export default (game) => {
  return class extends Phaser.State {
    create() {
      this.now = Date.now();
      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.item = null;
      this.dollIndex = 0;
      this.clawSpeed = 400;
      this.dollSpeed = 200;
      this.dollTime = 1000;
      // 抓到娃娃
      this.grabOne = false;
      this.time = 100;
      this.end = false;

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
      this.floor = game.add.sprite(game.world.centerX, game.height - 200, 'floor');
      this.floor.anchor.setTo(0.5, 0);

      this.drawScore();
      this.drawTime();

      // 绘制玩偶
      this.dollGroup = this.add.group();
      this.dollGroup.enableBody = true;

      game.physics.enable(this.dollGroup, Phaser.Physics.ARCADE);

      this.clawGroup = this.add.group();
      this.clawGroup.enableBody = true;

      this.wood = game.add.sprite(game.world.centerX, -620, 'pole', null, this.clawGroup);
      this.wood.anchor.setTo(0.5, 0);

      this.claw0 = game.add.sprite(game.world.centerX, 0, 'close', null, this.clawGroup);
      this.claw0.anchor.setTo(0.5, 0);

      this.claw1 = game.add.sprite(game.world.centerX, 0, 'open', null, this.clawGroup);
      this.claw1.anchor.setTo(0.5, 0);

      game.physics.enable(this.clawGroup, Phaser.Physics.ARCADE);

      this.claw1.update = () => {
        // console.log(this.y);
        if (this.claw1.y < 60) {
          this.clawGroup.setAll('body.velocity.y', 0);
          this.clawGroup.setAll('body.y', 60);
          this.grabOne = false;
          this.wood.body.y = -612 + 65;

          if (!this.item) return;
          // this.item.alpha = 0;
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
        this.generateDolls();
        this.now = Date.now();
      }
    }
    generateDolls() {
      if (this.end) return;
      const {name, time} = dollsTypes[this.dollIndex % dollsTypes.length];
      this.dollTime = time;
      const doll = this.dollGroup.getFirstExists(false, true, game.width, game.height, 'dolls', name);
      doll.y = this.floor.centerY - doll.height;
      doll.checkWorldBounds = true;
      doll.outOfBoundsKill = true;
      doll.body.velocity.x = -this.dollSpeed;
      this.dollGroup.add(doll);
      this.dollIndex += 1;
    }
    hit(clawGroup, doll) {
      if (this.item) return;
      const x = doll.x;
      if (clawGroup.y >= game.height - 300) {
        this.clawGroup.setAll('body.velocity.y', -this.clawSpeed);
        this.grabOne = true;
        if ( Math.abs(x + doll.width / 2 - game.world.centerX) < 40 ) {
          this.item = doll;
          doll.checked = true;
          doll.body.velocity.y = -this.clawSpeed;
          doll.body.velocity.x = 0;
        }
      }
    }
    grab() {
      if (this.grabOne || this.end) return;
      this.clawGroup.setAll('body.velocity.y', this.clawSpeed);
    }
    drawClaw() {
      if (this.grabOne) {
        game.add.tween(this.claw0)
          .to({alpha: 1}, 1, null, true, 0, 0, false);
        game.add.tween(this.claw1)
          .to({alpha: 0}, 1, null, true, 0, 0, false);
      } else {
        game.add.tween(this.claw0)
          .to({alpha: 0}, 1, null, true, 0, 0, false);
        game.add.tween(this.claw1)
          .to({alpha: 1}, 1, null, true, 0, 0, false);
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
      this.clawGroup.setAll('body.velocity.y', 0);
      this.dollGroup.setAll('body.velocity.x', 0);
      const style = {
        fill: '#fff',
        font: '20px',
      };
      this.playAngin = game.add.text(game.world.centerX, game.world.centerY, '在玩一次', style);
      this.playAngin.anchor.setTo(0.5);
      this.playAngin.inputEnabled = true;
      this.playAngin.events.onInputDown.add(function() {
        game.state.start('Play');
      });
    }
  };
};
