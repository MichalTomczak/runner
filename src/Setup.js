var game = new Phaser.Game(Game.width,Game.height,Phaser.CANVAS,'game_container');

game.state.add('Boot',Game.Boot);
game.state.add('Preload',Game.Preload);
game.state.add('MainMenu',Game.MainMenu);
game.state.add('Game',Game.Game);
game.state.add('GameOver',Game.GameOver);

game.state.start('Boot');