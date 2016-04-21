
App.Game = function (game) {
  this.params = [];
  this.intro = null;
  this.callToAction = null;
  this.timeSinceLastAction = null;
};

var background;
var deer_hop;
var deer_idle;
var dirt_hit;
var cta_splash;

App.Game.prototype = {

  create: function () {

    // call mraid_wrapper.js to let it know the preload is complete
    wrapper_hide_splash();

    // get the dynamic game parameters (pass in the decription of the parameters containing their types and default values)
    this.params = utils.getAdParameters({tutorial: {type: 'bool', default: true},
                                         cta_on_idle_time: {type: 'int', default: 10000}});
    console.log("Parameters:", this.params);

    // set up the game; create your sprites; etc
    this.initBackground();
    
    this.initAnimations();
    this.initCTA();
    // this.showDebug();

    // var text = this.game.add.text(this.game.width/2, this.game.height/2, "Make a game here", {font: "bold 24pt Arial", fill: "#ffffff"});
    // text.anchor.set(0.5, 0.5);
    // this.game.add.tween(text.scale).to({x: 1.5, y: 1.5}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
  },

  // Function for setting up background/foreground layers, doing positioning etc.
  initBackground: function initBackground() {
    background = this.game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    background.anchor.setTo(0.5, 0.5);
  },

  onDeerClicked: function onDeerClicked() {
    console.log("You shot the deer!");
  },

  initAnimations: function initAnimations() {
    deer_idle = this.game.add.sprite(120, 480, 'deer_idle');
    deer_idle.animations.add('idle');
    deer_idle.inputEnabled = true;
    var onDeerClicked = function onDeerClicked() {
        console.log("You shot the deer!");
        this.endScreen()
    };
    deer_idle.events.onInputDown.add(onDeerClicked, this);
    // deer_idle.animations.play('idle', 45, true);
    deer_idle.scale.setTo(0.5, 0.5);
  },

  initCTA: function initCTA() {
    // cta_splash = this.game.add.sprite(game.world.centerX, game.world.centerY, 'cta_splash');
    // cta_splash.anchor.setTo(0.5, 0.5); // Set anchor to center
    // cta_splash.alpha = 0;
  },

  showDebug: function () {
    // show background area
    var background_fill = this.game.add.graphics(0, 0);
    background_fill.beginFill(0x008800, 1);
    background_fill.drawRect(0, 0, this.game.width, this.game.height);
    background_fill.endFill();

    // show edges
    var edges_fill = this.game.add.graphics(0, 0);
    edges_fill.beginFill(0x880000, 1);
    edges_fill.drawRect(0, 0, this.game.width, 10);  // top
    edges_fill.drawRect(this.game.width - 10, 10, this.game.width, this.game.height);  // right
    edges_fill.drawRect(0, this.game.height - 10, this.game.width, this.game.height);  // bottom
    edges_fill.drawRect(0, 0, 10, this.game.height);  // left
    edges_fill.endFill();

    var text;
    if (this.game.renderer instanceof PIXI.CanvasRenderer) {
      text = this.game.add.text(20, 20, "Renderer: CANVAS", {font: "bold 24pt Arial", fill: "#ffffff"});
    } else {
      text = this.game.add.text(20, 20, "Renderer: WEBGL", {font: "bold 24pt Arial", fill: "#ffffff"});
    }

    var cat = imageLoader.sprite(this.game.width/2, this.game.height - 10, 'cat.jpg');
    cat.anchor.set(0.5, 1.0);

    genlog("debug", "test");
  },


  // wherever the user completes a successful game action you should call this function
  // to let the mraid_wrapper.js know about the successful user interaction
  //wrapper_mark_interaction();


  displayIntro: function () {
    this.intro = game.add.group();
  },


  destroyIntro: function () {
    if (!this.intro)
      return;

    var twn = this.game.add.tween(this.intro).to({alpha: 0.0}, 500, Phaser.Easing.Linear.None, true);
    var intro = this.intro;
    twn.onComplete.add(function() {
      intro.destroy();
    });
  },


  dialogsToTop: function () {
    if (this.intro)
      this.game.world.bringToTop(this.intro);
    if (this.callToAction)
      this.game.world.bringToTop(this.callToAction);
  },


  update: function () {
    if (!this.timeSinceLastAction) {
      this.timeSinceLastAction = new Date().getTime();
    }

    var cur_time = new Date().getTime();
    if (this.timeSinceLastAction && cur_time > this.timeSinceLastAction + this.params.cta_on_idle_time && !this.callToAction) {
      // jump to call-to-action if the game has gone idle
      genlog("funnel", "timeout");
      this.endScreen();
    }
  },


  // display the dialog at the end of the game that asks the user to go download the app
  endScreen: function () {
    if (this.callToAction)
      return;

    this.destroyIntro();  // in case it's still showing

    // create clickable alpha overlay
    var background_overlay = this.game.add.graphics(0, 0);
    background_overlay.beginFill(0x000000, 1);
    background_overlay.drawRect(0, 0, this.game.width, this.game.height);
    background_overlay.alpha = 0.7;
    background_overlay.endFill();
    background_overlay.inputEnabled = true;
    background_overlay.events.onInputDown.add(function() {wrapper_click_go(); } );

    // display the call-to-action modal
    this.callToAction = game.add.group();
    cta_splash = this.callToAction.create(game.world.centerX, game.world.centerY, 'cta_splash');
    cta_splash.alpha = 0;
    cta_splash.anchor.setTo(0.5, 0.5);
    this.game.add.tween(cta_splash).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    // this.game.add.tween(cta_splash).to ( {alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

    // let the mraid_wrapper.js know the call-to-action screen has been displayed
    wrapper_mark_cta();
  },

};
