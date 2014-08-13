var Game = {
    width  : 320,
    height : 480,
};

Game.Boot = function(g) {};

Game.Boot.prototype = {
    preload: function(g) {},
    create: function(g) {},
    update: function(g) {
        g.state.start('Preload');
    }
};