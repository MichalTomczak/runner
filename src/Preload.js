Game.Preload = function(g) {};

Game.Preload.prototype = {
    preload: function(g) {
        this.load.setPreloadSprite(this.add.sprite(140,148,'progressbar'));
        this.load.atlasXML('sprites','img/sprites.png','img/sprites.xml');
    },
    create: function(g) {},
    update: function(g) {
        g.state.start('Game');
    },
};