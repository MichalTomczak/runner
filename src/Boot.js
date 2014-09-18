var Game = {
    width  : 480,
    height : 320,
    orientated: false,
};

Game.Boot = function(g) {};

Game.Boot.prototype = {
    preload: function(g) {
        this.load.image('progressbar','img/progressbar.png');
        this.stage.backgroundColor = "#0ccffe";

    },
    init: function() {
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth  = Game.width;
            this.scale.minHeight = Game.height;
            this.scale.maxWidth  = 960;
            this.scale.maxHeight = 640;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically   = true;
            this.scale.setScreenSize(true);
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth  = Game.width;
            this.scale.minHeight = Game.height;
            this.scale.maxWidth  = 960;
            this.scale.maxHeight = 640;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically   = true;
            this.scale.forceOrientation(true,false);
//            this.scale.hasResized.add(this.gameResized,this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation,this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation,this);
            this.scale.setScreenSize(true);
        }
    },
    gameResized: function(width,height) {
        // placeholder
    },
    enterIncorrectOrientaton: function() {
        Game.orientated = false;
        alert(Game.orientated);
        document.getElementById('orientation').style.display = 'block';
    },
    leaveIncorrectOrientation: function() {
        Game.orientated = true;
        alert(Game.orientated);
        document.getElementById('orientation').style.display = 'none';
    },
    create: function(g) {
        g.state.start('Preload');
    },
    update: function(g) {},
};
