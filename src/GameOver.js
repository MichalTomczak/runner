Game.GameOver = function(g) {};

Game.GameOver.prototype = {
    preload: function(g) {
    },
    create: function(g) {
        this.scoreLabel = this.add.text(30,50,"SCORE",
            {font: "40px Comic Sans MS", fill: "#ddf57f", align: "left" });
        this.scoreText  = this.add.text(330,50,"0",
            {font: "40px Comic Sans MS", fill: "#ddf57f", align: "left" });

        this.highscoreLabel = this.add.text(30,100,"HIGHSCORE",
            {font: "40px Comic Sans MS", fill: "#ddf57f", align: "left" });
        this.highscoreText  = this.add.text(330,100,"0",
            {font: "40px Comic Sans MS", fill: "#ddf57f", align: "left" });

        this.scoreText.text = g.state.states['Game'].score;
        this.highscoreText.text = g.state.states['Game'].highscore;

        this.add.button(192,180,'playbutton',this.restartGame);
    },
    update: function(g) {
        //g.state.start('Game');
    },
    restartGame: function() {
        this.game.state.start('Game');
    },
};
