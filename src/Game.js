Game.Game = function(g) {
    this.readyToRun     = false;
    this.moveTileSprite = false;
    this.score = 0;
    
    this.tileSpriteSpeed = 2;
    this.crateBodyXSpeed = -120;
    
    this.gameOver = false;
};

Game.Game.prototype = {
    preload: function(g) {
        g.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.input.addPointer();
        
        this.runner = this.add.sprite(40,0,'sprites','run01');
        this.runner.animations.add('run',[5,6,7,8,9,10],10,true);
        
        this.ground = this.add.tileSprite(0,250,480,70,'sprites','ground');
        
        g.physics.enable([this.runner,this.ground],Phaser.Physics.ARCADE);
        this.ground.body.immovable = true;
        this.runner.body.gravity.y = 2000;
        
        this.crates = this.add.group();
        this.crates.enableBody = true;
        this.crates.physicsBodyType = Phaser.Physics.ARCADE;
       
        this.timer = g.time.create(false);
    },
    
    create: function(g) {
        this.input.onDown.add(this.jump,this);
        this.timer.loop(1500,this.addCrate,this);
    },
    
    update: function(g) {
        g.physics.arcade.collide(this.runner,this.ground);
        g.physics.arcade.collide(this.runner,this.crates,this.hitCrate,null,this);

        if (this.readyToRun && this.runner.x == 100) {
            this.moveTileSprite = true;
        }
        
        if (this.moveTileSprite) {
            this.ground.tilePosition.x -= this.tileSpriteSpeed;
            this.timer.start();
        }
    },
    
    jump: function() {
        if (this.runner.body.touching.down && this.readyToRun) {
            this.runner.body.velocity.y = -730;
        } else if (this.readyToRun ==  false) {
            this.game.add.tween(this.runner).to({ x: 100 }, 500, Phaser.Easing.Linear.None,true);
            this.readyToRun = true;
            this.runner.animations.play('run');
        }
    },
    
    addCrate: function() {
        var crate;
        var num;
        if (this.crates.countLiving == 0) { num = 0; } 
        else { num = Math.floor(Math.random()*3); }
        
        crate = this.crates.create(480,320-70*1.55-70*0.55*num,'sprites',num);
        crate.scale.setTo(0.55,0.55);
        crate.checkWorldBounds = true;
        crate.body.velocity.x = this.crateBodyXSpeed;
        crate.events.onOutOfBounds.add(this.incScore,this);
        crate.outOfBoundsKill = true;
        crate.body.immovable  = true;
    },
    
    hitCrate: function(_r,_c) {
        if (_r.body.touching.down) {
            _r.body.x = 100;
        } 
        
        if (_r.body.touching.right) {
            this.crates.setAll('body.velocity.x',0);
            this.timer.stop();
            this.runner.animations.stop();
            
            this.moveTileSprite = false;
            this.readyToRun = false;
            this.runner.x = _r.x - 2;
            this.runner.body.velocity.x = 0;
            this.runner.frame = 4;
            this.gameOver = true;
        }
    },
    
    incScore: function() {
        this.score = this.score + 1;
        if (this.score == 10) {
            this.crates.setAll('body.velocity.x',-180);
            this.timer.stop();
            this.timer.loop(1000,this.addCrate,this);
            this.tileSpriteSpeed = 3;
            this.crateBodyXSpeed = -180; 
        }
        
        if (this.score == 20) {
            this.crates.setAll('body.velocity.x',-240);
            this.timer.stop();
            this.timer.loop(900,this.addCrate,this);
            this.tileSpriteSpeed = 4;
            this.crateBodyXSpeed = -240;
        }
        
        if (this.score == 30) {
            this.timer.stop();
            this.timer.loop(600,this.addCrate,this);
        }
        
        
    },
};