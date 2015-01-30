var Game = {
    width  : 960,
    height : 320
};

Game.Boot = function(g) {};

Game.Boot.prototype = {
    preload: function(g) {
        //this.load.image('progressbar','img/progressbar.png');
        //this.stage.backgroundColor = "#0ccffe";
    },
    create: function(g) {},
    update: function(g) {
        g.state.start('Preload');
    }
};