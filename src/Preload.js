Game.Preload = function(g) {};

Game.Preload.prototype = {
    preload: function(g) {
        this.load.image('background', 'img/background.png');
        this.load.atlasXML('sprites','img/sprites.png','img/sprites.xml');
    },
    create: function(g) {},
    update: function(g) {
        g.state.start('MainMenu');
    }
};
