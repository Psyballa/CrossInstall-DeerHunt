var ad_state = null;
function ad_begin() {
  ad_state = 'ready';
}

gameWidth = 728;
gameHeight = 1280;
console.log("orientation: " + ad_orientation);
if (ad_orientation == "landscape") {
  gameWidth = 1280;
  gameHeight = 728;
}

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, '');

game.state.add('Preloader', App.Preloader);
game.state.add('Game', App.Game);

game.state.start('Preloader');
