import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.item;
    this.dollIndex = 0;
    const _this = this;
    this.clawSpeed = 400;
    this.dollSpeed = 200;
    // 抓到娃娃
    this.grabOne = false;
    this.time = 10;
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
    this.bg = game.add.image(0, 0, 'background');
    this.bg.width = game.width;
    this.bg.height = game.height;

    this.drawScore();
    this.drawTime();
    this.returnMenu();

    // 绘制玩偶
    this.widthList = [0, 187, 187 + 172, 187 + 172 + 187];
    this.dollGroup = this.add.group();
    this.dollGroup.enableBody = true;
    this.generateDolls();
    game.time.events.loop(1000, this.generateDolls, this);
    game.time.events.start();
    game.physics.enable(this.dollGroup, Phaser.Physics.ARCADE);
    
    this.clawGroup = this.add.group();
    this.clawGroup.enableBody = true;
    this.wood = game.add.sprite(game.world.centerX, -382 + 65, 'wood', null, this.clawGroup);
    this.wood.anchor.setTo(0.5, 0);
    this.woodhead = game.add.image(game.world.centerX, 0, 'woodhead', null, this.clawGroup);
    this.woodhead.scale.setTo(0.5);
    this.woodhead.anchor.setTo(0.5, 0);
    this.claw0 = game.add.sprite(game.world.centerX, 60, 'claw0', null, this.clawGroup);
    this.claw0.anchor.setTo(0.5, 0);
    this.claw1 = game.add.sprite(game.world.centerX, 60, 'claw1', null, this.clawGroup);
    this.claw1.anchor.setTo(0.5, 0);
    game.physics.enable(this.clawGroup, Phaser.Physics.ARCADE);

    this.claw1.update = function() {
      // console.log(this.y);
      if (this.y < 60) {
        _this.clawGroup.setAll('body.velocity.y', 0);
        _this.clawGroup.setAll('body.y', 60);
        _this.grabOne = false;
        _this.wood.body.y = -382 + 65;

        if (!_this.item) return;
        _this.item.alpha = 0;
        _this.addScore();
        _this.item = null;
      }
    };
    // 进行抓取
    game.input.onDown.add(this.grab, this);
  }
  update() {
    game.physics.arcade.overlap(this.clawGroup, this.dollGroup, this.hit, null, this);
    this.drawClaw();
  }
  generateDolls() {
    if (this.end) return;
    if (this.resetDoll()) return;
    const doolsTypes = ['baby_0', 'baby_1', 'baby_2'];
    const doolsType = doolsTypes[this.dollIndex % 3];
    game.add.sprite(game.width, game.world.height - 250, doolsType, null, this.dollGroup);
    this.dollGroup.setAll('checkWorldBounds', true);
    this.dollGroup.setAll('outOfBoundsKill', true);
    this.dollGroup.setAll('body.velocity.x', -this.dollSpeed);
    this.dollIndex += 1;
  }
  resetDoll() {
    let i = 0;
    this.dollGroup.forEachDead(function(doll) {
      if (i) return;
      doll.reset(game.width, game.world.height - 250);
      doll.body.velocity.x = -this.dollSpeed;
      doll.alpha = 1;
      i++;
    }, this);
    return i;
  };
  hit(clawGroup, dollGroup) {
    const _this = this;
    var x = this.dollGroup.x;
    if (clawGroup.y >= game.height - 367) {
      this.clawGroup.setAll('body.velocity.y', -this.clawSpeed);
      this.grabOne = true;
      this.dollGroup.forEachAlive((item) => {
        // console.log(Math.abs(item.centerX + x - game.world.centerX));
        if ( Math.abs(item.centerX + x - game.world.centerX) < 10 ) {
          _this.item = item;
          item.body.velocity.y = -this.clawSpeed;
          item.body.velocity.x = 0;          
        }
      });
    };
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
    this.scoreText = game.add.text(0, 0, `分数:${this.score}`, style);
  }
  addScore() {
    this.score++;
    this.scoreText.text = `分数:${this.score}`;
  }
  drawTime() {
    const style = {
      fill: '#fff',
    };
    this.timeText = game.add.text(0, 100, `时间:${this.time}`, style);
  }
  computedTime() {
    this.timeText.text = `时间:${this.time}`;
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
  returnMenu() {
    const style = {
      fill: '#fff',
      font: '20px',
    };
    this.playAngin = game.add.text(game.world.width - 100, 0, '返回主菜单', style);
    this.playAngin.inputEnabled = true;
    this.playAngin.events.onInputDown.add(function() {
      game.state.start('Created');
    });
  }
}