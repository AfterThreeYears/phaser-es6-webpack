import Phaser from 'phaser';

export default (game) => {
  return class extends Phaser.State {
    create() {
      game.add.sprite(0, 0, 'seacreatures', 'QQ20171115-150357@2x.png');
      game.add.sprite(0, 0, 'seacreatures', 'QQ20171115-150412@2x.png');
      game.add.sprite(0, 0, 'seacreatures', 'QQ20171115-150417@2x.png');
      game.add.sprite(0, 0, 'seacreatures', 'QQ20171115-150421@2x.png');
      game.add.sprite(0, 0, 'seacreatures', 'QQ20171115-150426@2x.png');
      game.add.sprite(0, 0, 'seacreatures', 'QQ20171115-150430@2x.png');
      game.add.sprite(0, 0, 'seacreatures', 'QQ20171115-150505@2x.png');
    }
  };
};
