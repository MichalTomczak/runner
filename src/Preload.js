Game.Preload = function(g) {};

Game.Preload.prototype = {
    preload: function(g) {
        this.load.setPreloadSprite(this.add.sprite(140,148,'progressbar'));
        this.load.spritesheet('kaboom','img/explosion.png',128,128);
        this.load.atlasXML('sprites','img/sprites.png','img/sprites.xml');
        this.load.image('playbutton','img/play.png');
        this.load.image('fingers','img/fingers.png');
        this.load.audio('explosionSound','asset/explosion.wav');
    },
    create: function(g) {},
    update: function(g) {
        g.state.start('MainMenu');
    },
};
