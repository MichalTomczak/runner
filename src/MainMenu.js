Game.MainMenu = function(g) {};

Game.MainMenu.prototype = {
    preload: function(g) {},
    create: function(g) {},
    update: function(g) {
        g.state.start('Game');
    },
};