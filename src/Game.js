Game.Game = function(g) {
    this.readyToRun     = false;
    this.moveTileSprite = false;
    this.score = 0;
    
    this.tileSpeed = 3;
    this.crateBodyXSpeed = -120;
    
    this.gameOver = false;
    this.score = 0;
    this.highscore = localStorage.getItem("highscore");
    if (this.highscore == null) {
        this.highscore = 0;
    }

    this.shakeWorld = 0;
    this.shakeWorldMax = 20;
    this.shakeWorldTime = 0;
    this.shakeWorldTimeMax = 40;
};

Game.Game.prototype = {
    preload: function(g) {
        this.readyToRun     = false;
        this.moveTileSprite = false;
        this.score = 0;

        this.tileSpeed = 3;
        this.crateBodyXSpeed = -120;

        this.gameOver = false;
        this.score = 0;
        this.highscore = localStorage.getItem("highscore");
        if (this.highscore == null) {
            this.highscore = 0;
        }

        g.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.input.addPointer();
        
        this.runner = this.add.sprite(50,217,'sprites','run01');
        this.runner.animations.add('run',[5,6,7,8,9,10],10,true);
        
        this.ground = this.add.tileSprite(0,250,480,70,'sprites','ground');
        
        g.physics.enable([this.runner,this.ground],Phaser.Physics.ARCADE);
        this.ground.body.immovable = true;
        
        this.crates = this.add.group();
        this.crates.enableBody = true;
        this.crates.physicsBodyType = Phaser.Physics.ARCADE;
       
        this.blowup = this.game.add.group();
        this.blowup.createMultiple(5,'kaboom');
        this.blowup.forEach(this.setupBlowup,this,false);

        this.scoreLabel = this.add.text(10,10,"SCORE",
            {font: "23px Comic Sans MS", fill: "#ddf57f", align: "left" });
        this.scoreText  = this.add.text(10,33,"0",
            {font: "23px Comic Sans MS", fill: "#ddf57f", align: "left" });

        this.highscoreLabel = this.add.text(330,10,"HIGHSCORE",
            {font: "23px Comic Sans MS", fill: "#ddf57f", align: "right" });
        this.highscoreText  = this.add.text(330,33,"0",
            {font: "23px Comic Sans MS", fill: "#ddf57f", align: "right" });

        this.highscoreText.text = this.highscore;

        this.explosionSound = g.add.audio('explosionSound');

        this.timer = g.time.create(false);
    },
    
    create: function(g) {
        //if (this.game.device.desktop) {
            this.input.onTap.add(this.userPress,this);
        //} else {
        //    this.input.pointer1.onDown.add(this.userPress,this);
        //}
        this.timer.loop(600,this.addCrate,this);
        this.timer.start();
    },
    
    update: function(g) {
        g.physics.arcade.collide(this.crates,this.ground,this.crateHitGround,null,this);
        g.physics.arcade.collide(this.runner,this.crates,this.hitCrate,null,this);
        this.runner.animations.play('run');
        this.runner.body.gravity.x = -300;

        if (this.runner.x < 50) {
            this.runner.body.velocity.x =0;
            this.runner.x = 50;
        }
        
        if (this.runner.x > 430) {
            this.runner.x = 430;
        }

        this.ground.tilePosition.x -= this.tileSpeed;

        if (this.shakeWorldTime > 0) {
            var magnitude = (this.shakeWorldTime/this.shakeWorldTimeMax)*this.shakeWorldMax;
            var rand1 = this.game.rnd.integerInRange(-magnitude,magnitude);
            var rand2 = this.game.rnd.integerInRange(-magnitude,magnitude);
            this.game.world.setBounds(rand1,rand2,this.game.width+rand1,this.game.height+rand2);
            this.shakeWorldTime--;

            if (this.shakeWorldTime == 0) {
                this.game.world.setBounds(0,0,this.game.width,this.game.height);
                this.game.state.start('GameOver');
            }
        }
    },
    
    userPress: function() {
        if (this.runner.x <= 50) {
            this.runner.body.velocity.x = 900;
        } else {
            this.runner.body.velocity.x = 110;
        }
    },

    setupBlowup: function (e) {
        e.anchor.x = 0.5;
        e.anchor.y = 0.5;
        e.animations.add('kaboom');
    },

    crateHitGround: function(_g,_c) {
        var explosion = this.blowup.getFirstExists(false);
        explosion.reset(_c.x+10,_c.y+20);

        _c.kill();

        this.score = this.score + 1;
        this.scoreText.text = this.score;

        if (this.highscore <= this.score) {
            this.highscore = this.score;
            this.highscoreText.text = this.highscore;
        }

        explosion.play('kaboom',25,false,true);
        this.explosionSound.play('',0,1,false);
    },
    
    addCrate: function() {
        var crate;
        var randomInt;

        randomInt = Math.random();
        
        if (randomInt < 0.333) {
            crate = this.crates.create(this.runner.body.x-60,-50,'sprites',0);
        } else if (randomInt < 0.666) {
            crate = this.crates.create(this.runner.body.x+60,-50,'sprites',0);
        } else {
            crate = this.crates.create(this.runner.body.x,-50,'sprites',0);
        }
        crate.scale.setTo(0.55,0.55);
        crate.body.gravity.y = 400;
    },
    
    hitCrate: function(_r,_c) {
        this.timer.stop();
        this.crates.removeAll();
        this.tileSpeed = 0;
        
        _r.kill();

        var explosion = this.blowup.getFirstExists(false);
        explosion.reset(_c.x+10,_c.y+50);
        explosion.play('kaboom',25,false,true);

        this.shakeWorldTime = this.shakeWorldTimeMax;
        
        if (this.score > localStorage.getItem("highscore")) {
            localStorage.setItem("highscore",this.score);
        }
    },
};
