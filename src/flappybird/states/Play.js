import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    this.gameisOver = false;
    this.hasHitGround = false;
    this.score = 0;
    this.ready = false;

    this.bg = game.add.audio('bg');
    this.flap = game.add.audio('flap');
    this.pipeHit = game.add.audio('pipe-hit');
    this.ouch = game.add.audio('ouch');
    this.scoreAudio = game.add.audio('score');
    this.bg.loopFull();
    
    this.background = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    
    this.pipeGroup = game.add.group();
    this.pipeGroup.enableBody = true;
  
    this.ground = game.add.tileSprite(0, game.height - 112, game.width, 112, 'ground');
    game.physics.enable(this.ground, Phaser.Physics.ARCADE);
    this.ground.body.immovable = true;

    this.scoreText = game.add.bitmapText(game.world.centerX - 20, 30, 'flappy_font', `${this.score}`, 36);
    
    this.instructions = game.add.image(0, game.height - 200, 'instructions');
    this.instructions.centerX = game.world.centerX;
    this.readyText = game.add.image(0, 50, 'get-ready');
    this.readyText.centerX = game.world.centerX;
    

    this.bird = game.add.sprite(50, 120, 'bird');
    this.bird.animations.add('fly');
    this.bird.animations.play('fly', 10, true);
    this.bird.anchor.setTo(0.5, 0.5);
    // this.bird.width = 50;
    // this.bird.height = 50;
    game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.gravity.y = 0;

    game.time.events.loop(1000, this.generatePipes, this);
    game.time.events.stop(false);

    game.input.onTap.addOnce(this.startGame, this);

    this.testText = game.add.text(game.world.centerX, game.world.centerY, '0');
  }

  startGame () {
    this.gameSpeed = 200;
    this.ready = true;
    game.input.onTap.add(this.fly, this);

    this.background.autoScroll(-(this.gameSpeed/10), 0);
    this.ground.autoScroll(-this.gameSpeed, 0);

    this.instructions.destroy();
    this.readyText.destroy();
    this.bird.body.gravity.y = 1150;
    game.time.events.start();
  }
  fly() {
    this.flap.play();
    this.bird.body.velocity.y = -350;
    game.add.tween(this.bird).to({angle: -30}, 80, null, true, 0, 0, false);
  }
  generatePipes() {
    var gap = 100;
    var difficulty = Math.max(200 - +this.score, 88);
    var position = 50 + Math.floor((game.world.height - this.ground.height - difficulty - gap) * Math.random());
    var topPipeY = position - 320;
    var bottomPipeY = position + difficulty;
    console.log(this.pipeGroup.children.length);
    this.testText.text = `${this.pipeGroup.children.length}`;

    if(this.resetPipe(topPipeY, bottomPipeY)) return;
    game.add.sprite(game.width, topPipeY, 'pipe', 0, this.pipeGroup);
    game.add.sprite(game.width, bottomPipeY, 'pipe', 1, this.pipeGroup);
    this.pipeGroup.setAll('checkWorldBounds', true);
    this.pipeGroup.setAll('outOfBoundsKill', true);
    this.pipeGroup.setAll('body.velocity.x', -this.gameSpeed);
  }
  resetPipe(topPipeY, bottomPipeY) {
    var i = 0;
    this.pipeGroup.forEachDead(function(pipe) {
        if(pipe.y <= 0) {
            pipe.reset(game.width, topPipeY);
            pipe.hasScored = false;
        } else {
            pipe.reset(game.width, bottomPipeY);
        }
        pipe.body.velocity.x = -this.gameSpeed;
        i++;
    }, this);
    return i == 2;
  };
  update() {
    if (!this.ready) return;
    game.physics.arcade.collide(this.bird, this.ground, this.hitGround, null, this);
    game.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this);
    if(!this.bird.inWorld) this.hitCeil();
    if(this.bird.angle < 90) this.bird.angle += 2.5;
    this.pipeGroup.forEachExists(this.checkScore, this);
  }
  hitGround() {
    if (this.hasHitGround) return;
    this.hasHitGround = true;
    this.ouch.play();
    this.gameOver(true);
  }
  hitCeil() {
    if (this.gameisOver) return;
    this.pipeHit.play();
    this.gameOver();
  }
  hitPipe() {
    if (this.gameisOver) return;
    this.pipeHit.play();
    this.gameOver();
  }
  checkScore(pipe) {
    if (!pipe.hasScored && pipe.y <= 0 && pipe.x <= this.bird.x - 17 - 54) {
      pipe.hasScored  = true;
      this.scoreAudio.play();
      this.scoreText.text = ++this.score; //更新分数的显示
      return true; 
    }
    return false;
  }
  hit() {
    game.input.onTap.remove(this.fly, this);
    game.time.events.stop(false);
    this.pipeGroup.forEachExists(function(pipe) {
      pipe.body.velocity.x = 0;
    }, this);
    this.background.stopScroll(0, 0);
    this.ground.stopScroll(0, 0);
    this.bird.animations.stop('fly');
  }
  gameOver(flag) {
    this.hit();
    this.gameisOver = true;
    if (flag) this.showGameOverText();
  }
  showGameOverText() {
    this.bestScore = this.bestScore || 0;
    if (+this.bestScore < +this.score) {
      this.bestScore = this.score;
    }
    this.scoreText.destroy();
    this.gameOverGroup = game.add.group();
    this.gameoverText = this.gameOverGroup.create(game.world.centerX, 60, 'gameover');
    this.gameoverText.anchor.setTo(0.5, 0);
    this.scoreboard = this.gameOverGroup.create(game.world.centerX, 125, 'scoreboard');
    this.scoreboard.anchor.setTo(0.5, 0);
    this.currentScoreText = game.add.bitmapText(game.world.width - 95, 160, 'flappy_font', `${this.score}`, 20, this.gameOverGroup);
    this.bestScoreText = game.add.bitmapText(game.world.width - 95, 207, 'flappy_font', `${this.bestScore}`, 20, this.gameOverGroup);
    
    var restartBtn = game.add.button(game.world.centerX, game.height / 2 + 50, 'start-button', this.restartGame, this);
    restartBtn.anchor.setTo(0.5, 0.5);
  }
  restartGame() {
    this.bg.stop();
    game.state.start('Play');
  }
}