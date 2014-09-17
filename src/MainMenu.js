Game.MainMenu = function(g) {};

Game.MainMenu.prototype = {
    preload: function(g) {},
    create: function(g) {
        this.fingers = this.add.sprite(200,150,'fingers');
        this.fingers.scale.setTo(0.4,0.4);

        this.runner = this.add.sprite(80,100,'sprites','run01');
        this.runner.scale.setTo(1.5,1.5);
        this.runner.animations.add('run',[5,6,7,8,9,10],10,true);
        this.runner.animations.play('run');

        this.label = this.add.text(60,20,"TAP TO RUN FASTER\nTO AVOID BOMBING CRATE",
            {font: "25px Comic Sans MS", fill: "#ddeeff", align: "center" });
        this.label2 = this.add.text(35,250,"TAP TO START PLAY",
            {font: "40px Comic Sans MS", fill: "#ddf57f", align: "left" });

         this.input.addPointer();
         if (this.game.device.desktop) {
            this.input.onDown.add(this.userPress,this);
         } else {
            this.input.pointer1.onDown.add(this.userPress,this);
         }
    },
    update: function(g) {
        //g.state.start('Game');
    },
    userPress: function() {
        this.game.state.start('Game');
    },
};
