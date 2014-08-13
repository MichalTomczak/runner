Game.Preload = function(g) {};

Game.Preload.prototype = {
    preload: function(g) {},
    create: function(g) {},
    update: function(g) {
        g.state.start('Game');
    },
};