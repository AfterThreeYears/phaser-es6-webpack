import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.bgSpeed = 50;
      this.score = 0;
      this.bulletSpeed = 500;
      this.enemySpeed = 100;
      this.startAngle = 80;
      this.angleStep = 10;

      this.bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
      this.bg.autoScroll(0, -this.bgSpeed);

      this.plane = game.add.sprite(game.world.centerX, game.world.centerY, 'myplane');
      this.plane.anchor.setTo(0.5, 0);
      this.plane.animations.add('fly');
      this.plane.animations.play('fly', 50, true);
      this.plane.startFire = false;
      game.physics.enable(this.plane, Phaser.Physics.ARCADE);
      this.plane.body.collideWorldBounds = true;

      this.tween = game.add.tween(this.plane)
        .to({y: game.height - 50}, 300, null, true, 0, 0);
      this.tween.onComplete.add(this.onPlaneComplete, this);
    }
    update() {
      if (!this.plane.startFire) return;
      if (this.enemyTime && Date.now() - this.enemyTime > 1000) {
        this.enemyTime = Date.now();
        this.createEnemy();
        this.createEnemyBullet();
      }
      // 我方飞机子弹和敌机碰撞
      game.physics.arcade.overlap(this.mybulletGroup, this.enemyGroup, this.destroyEnemy, null, this);
      // 我方飞机和敌机碰撞
      game.physics.arcade.overlap(this.plane, this.enemyGroup, this.destroyPlaneEnemy, null, this);
      // 我方飞机和敌方子弹碰撞
      game.physics.arcade.overlap(this.plane, this.enemyBulletGroup, this.destroyPlane, null, this);
    }
    render() {
      game.debug.body(this.plane);
      if (this.enemyGroup) {
        this.enemyGroup.forEachAlive((enemy) => {
          game.debug.body(enemy);
        });
      }
    }
    onPlaneComplete() {
      this.scoreText = game.add.text(0, 0, `分数: ${this.score}`, {
        font: '20px',
      });
      this.plane.startFire = true;

      this.plane.inputEnabled = true;
      this.plane.input.enableDrag();

      this.fireTimer = game.time.events.loop(200, this.generateBullet, this);

      this.mybulletGroup = game.add.group();
      this.mybulletGroup.enableBody = true;

      // 创建敌方飞机组
      this.enemyGroup = game.add.group();
      this.enemyGroup.enableBody = true;
      this.enemyTime = Date.now();

      // 创建敌人子弹组
      this.enemyBulletGroup = game.add.group();
      this.enemyBulletGroup.enableBody = true;

      // 创建爆炸组
      this.explodeGroup = game.add.group();
    }
    destroyEnemy(bullet, enemy) {
      if (enemy.life === 0) {
        enemy.kill();
        this.createExplode(enemy);
      } else {
        enemy.life--;
      }
      bullet.kill();
    }
    destroyPlaneEnemy(plane, enemy) {
      plane.kill();
      this.createMyPlane(plane);
      enemy.kill();
      this.createExplode(enemy);
    }
    destroyPlane(plane, enemyBullet) {
      if (plane.isInjured) {
        plane.kill();
        this.createMyPlane(plane);
      }
      plane.isInjured = true;
      enemyBullet.kill();
    }
    computedScore(score) {
      this.score += score;
      this.scoreText.text = `分数${this.score}`;
    }
    gameOver() {
      game.state.start('Over', true, false, this.score);
    }
    generateBullet() {
      console.log('子弹的数量', this.mybulletGroup.children.length);
      if (!this.plane.alive) return;
      if (this.plane.isInjured) {
        // 一颗子弹
        const mybullet = this.mybulletGroup.getFirstExists(false, true, this.plane.x, this.plane.y, 'mybullet');
        mybullet.body.velocity.y = -this.bulletSpeed;
        this.mybulletGroup.add(mybullet);
      } else {
        if (this.resetSectorBullet()) return;
        // 扇形子弹
        for (let i = this.startAngle; i <= 100; i += this.angleStep) {
          const mybullet = game.add.sprite(this.plane.x, this.plane.y, 'mybullet', null, this.mybulletGroup);
          mybullet.body.velocity.y = -this.bulletSpeed * Math.sin(Math.PI / 180 * i);
          mybullet.body.velocity.x = -this.bulletSpeed * Math.cos(Math.PI / 180 * i);
        }
      }
      this.mybulletGroup.setAll('checkWorldBounds', true);
      this.mybulletGroup.setAll('outOfBoundsKill', true);
    }
    // 重生扇形子弹
    resetSectorBullet() {
      let i = 0;
      let angle = this.startAngle;
      let c = this.startAngle;
      this.mybulletGroup.forEachDead(function(bullet) {
        if (i > 2) return;
        bullet.reset(this.plane.x, this.plane.y);
        bullet.body.velocity.y = -this.bulletSpeed * Math.sin(Math.PI / 180 * c);
        bullet.body.velocity.x = -this.bulletSpeed * Math.cos(Math.PI / 180 * c);
        c = angle += this.angleStep;
        i++;
      }, this);
      return i === 3;
    }
    createEnemy() {
      console.log('敌机的数量', this.enemyGroup.length);
      const index = game.rnd.integerInRange(1, 3);
      const enemyName = `enemy${index}`;
      const cache = game.cache.getImage(enemyName);
      const halfWidth = cache.width / 2;
      const x = game.rnd.integerInRange(halfWidth, game.width - halfWidth);
      const y = 0;
      const enemy = this.enemyGroup.getFirstExists(false, true, x, y, enemyName);
      this.enemyGroup.add(enemy);
      enemy.anchor.setTo(0.5, 0.5);
      enemy.body.velocity.y = this.enemySpeed;
      enemy.body.width = cache.width;
      enemy.body.height = cache.height;
      enemy.lastFireTime = Date.now();
      enemy.height = cache.height;
      enemy.index = index;

      if (index === 1) {
        enemy.bulletSpeed = 400;
        enemy.fireGapTime = 1000;
        enemy.life = 2;
        enemy.score = 10;
      } else if (index === 2) {
        enemy.bulletSpeed = 300;
        enemy.fireGapTime = 2000;
        enemy.life = 3;
        enemy.score = 30;
      } else if (index === 3) {
        enemy.bulletSpeed = 200;
        enemy.fireGapTime = 3000;
        enemy.life = 5;
        enemy.score = 50;
      }

      this.enemyGroup.setAll('checkWorldBounds', true);
      this.enemyGroup.setAll('outOfBoundsKill', true);
    }
    createEnemyBullet() {
      console.log('敌方子弹的数量', this.enemyBulletGroup.length);
      this.enemyGroup.forEachAlive((enemy) => {
        if (enemy.lastFireTime > enemy.fireGapTime) {
          const x = enemy.x;
          const y = enemy.y + enemy.height / 2;
          const enemyBullet = this.enemyBulletGroup.getFirstExists(false, true, x, y, 'bullet');
          this.enemyBulletGroup.add(enemyBullet);
          enemyBullet.anchor.setTo(0.5, 0.5);
          enemyBullet.body.velocity.y = enemy.bulletSpeed;
          this.enemyBulletGroup.setAll('checkWorldBounds', true);
          this.enemyBulletGroup.setAll('outOfBoundsKill', true);
          enemy.lastFireTime = Date.now();
        }
      }, this);
    }
    createExplode(enemy) {
      const {index, x, y} = enemy;
      console.log('爆炸动画数量', this.explodeGroup.children.length);
      const explode = this.explodeGroup.getFirstExists(false, true, x, y, `explode${index}`);
      this.explodeGroup.add(explode);
      explode.anchor.setTo(0.5, 0.5);
      const anim = explode.animations.add('explode');
      anim.play(30);
      anim.onComplete.add(() => {
        explode.kill();
        this.computedScore(enemy.score);
      }, this);
    }
    createMyPlane(plane) {
      const myexplode = game.add.sprite(plane.x, plane.y, 'myexplode');
      myexplode.anchor.setTo(0.5, 0);
      const anim = myexplode.animations.add('explode');
      anim.play(30);
      anim.onComplete.add(function() {
        myexplode.destroy();
        this.gameOver();
      }, this);
    }
  };
};
