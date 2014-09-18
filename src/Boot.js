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
    init: function(g) {
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
<<<<<<< HEAD
            this.scale.refresh();
=======
            Game.orientated = true;
>>>>>>> ca67407aa46444295e12a17e34e9060bed1f3a51
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth  = Game.width;
            this.scale.minHeight = Game.height;
            this.scale.maxWidth  = 960;
            this.scale.maxHeight = 640;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically   = true;
            this.scale.forceOrientation(true,false);
            this.scale.hasResized.add(this.gameResized,this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation,this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation,this);
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }
    },
    gameResized: function(width,height) {
        // placeholder
    },
    enterIncorrectOrientaton: function() {
        Game.orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },
    leaveIncorrectOrientation: function() {
        Game.orientated = true;
        document.getElementById('orientation').style.display = 'none';
    },
    create: function(g) {
        g.state.start('Preload');
    },
    update: function(g) {},
};
