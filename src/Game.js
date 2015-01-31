Game.Game = function(g) {
    this.readyToRun     = false;
    this.moveTileSprite = false;

    this.score = 0;
    
    this.tileSpriteSpeed = 2;
    this.crateBodyXSpeed = -120;
    
    //this.gameOver = false;
    this.score = 0;
};

Game.Game.prototype = {
    preload: function(g) {

        this.load.image('background', 'img/background.png');
        this.background = this.add.tileSprite(0, 0, 960, 320, 'background'); //załadowanie i odpalenie tła

        g.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.input.addPointer();
        // Animacja Kowboja
        this.runner = this.add.sprite(10,0,'sprites','run01');
        this.runner.animations.add('run',[5,6,7,8,9,10],8,true);
        //Narysowanie Gruntu
        this.ground = this.add.tileSprite(0,250,960,70,'sprites','ground');//granica lewa // granica górna // granica prawa //
        
        g.physics.enable([this.runner,this.ground],Phaser.Physics.ARCADE);
        this.ground.body.immovable = true;
        this.runner.body.gravity.y = 2000;

        this.crates = this.add.group();
        this.crates.enableBody = true;
        this.crates.physicsBodyType = Phaser.Physics.ARCADE;
       // punktacja
       this.add.text(10,275,"SCORE:",
            {font: "23px Arial black", fill: "#ff0000", align: "left" });
       this.scoreText  = this.add.text(120,275,"1",
            {font: "23px Arial black", fill: "#ff0000", align: "left" });
        //
       this.add.text(800,275,"LEVEL:",{font: "23px Arial black", fill: "#ff0000", align: "right"});
       this.poziom = this.add.text(900,275,"0",{font: "23px Arial black", fill: "#ff0000", align: "right"});
       //
       this.timer = g.time.create(false);

    },
    
    create: function(g) {
        this.input.onDown.add(this.jump,this);      //skok po nacisnieciu myszy
        this.crateDistance = 1500;
        this.timer.loop(this.crateDistance,this.addCrate,this);   //dodanie kraty po przejsciu 1500 ms
    },
    
    update: function(g) {
        //kolizje
        g.physics.arcade.collide(this.runner,this.ground);
        g.physics.arcade.collide(this.runner,this.crates,this.hitCrate,null,this);



        if (this.readyToRun && this.runner.x == 40) {
            this.moveTileSprite = true;
        }
        
        if (this.moveTileSprite) {
            this.ground.tilePosition.x -= this.tileSpriteSpeed;
            this.background.tilePosition.x -= this.tileSpriteSpeed/6;
            this.timer.start();
        }

    },

    jump: function() {
        if (this.runner.body.touching.down && this.readyToRun) {
            this.runner.body.velocity.y = -730;                     //wysokosc skoku
        } else if (this.readyToRun ==  false) {
            this.game.add.tween(this.runner).to({ x: 40 }, 300, Phaser.Easing.Linear.None,true);
            this.readyToRun = true;
            this.runner.animations.play('run');
        }
    },

    addCrate: function() {
        var crate;
        var num;
        if (this.crates.countLiving == 0) { num = 0; } 
        else { num = Math.floor(Math.random()*3); }
        
        crate = this.crates.create(960,320-70*1.55-70*0.55*num,'sprites',num);
        crate.scale.setTo(0.55,0.55);
        crate.checkWorldBounds = true;
        crate.body.velocity.x = this.crateBodyXSpeed;
        crate.events.onOutOfBounds.add(this.incScore,this);
        crate.outOfBoundsKill = true;
        crate.body.immovable  = true;
    },

    hitCrate: function(_r,_c) {
        if (_r.body.touching.down) {
            _r.body.x = 40;
        } 
        
        if (_r.body.touching.right) {
            this.crates.setAll('body.velocity.x',0);
            this.timer.stop();
            this.runner.animations.stop();
            
            this.moveTileSprite = false;
            this.readyToRun = false;
            this.runner.x = _r.x - 1;
            this.runner.body.velocity.x = 0;
            this.runner.frame = 4;
            this.timeOver = this.time.now;
            this.state.restart();
            this.readyToRun     = false;
            this.score = 0;
            this.tileSpriteSpeed = 2;
            this.crateBodyXSpeed = -120;

        }
    },
    //przyrost poziomu trudnosci

    incScore: function() {
        this.score = this.score + 1;
        this.scoreText.text = this.score;
        this.levelLimiter = 3;
        this.runnerSpeedIncrease = -100;

            if (this.score == this.levelLimiter) {
                this.levelLimiter += 3;
                this.poziom.text = 0;
                this.poziom.text = this.levelLimiter / 3;
                //
                this.crates.setAll('body.velocity.x', this.runnerSpeedIncrease);
                this.crateDistance -= 250;
                this.timer.stop();
                this.timer.loop(this.crateDistance, this.addCrate, this);
                this.tileSpriteSpeed += 1;
            }

    }
};
