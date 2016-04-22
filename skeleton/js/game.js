
App.Game = function (game) {
  this.params = [];
  this.intro = null;
  this.callToAction = null;
  this.timeSinceLastAction = null;
};


/* 
    Deer Hunter 2016 Creative Playable

    By: Justin Telmo

    Notes: 
        - The hitbox for the deer sprite is huge because the textures were packed.
        - const keyword is not supported until ES6
        - I followed an underspacing naming convention here because that seemed to be a trend in PhaserJS.
        I normally camelcase variables. Private variables are always prepended with an underscore.
        - Only takes landscape into account right now, would fix up to account for different form factors and portrait
        in later iteration.
*/

// Global vars, should probably be put in the App.Game.prototype object, not sure
var background;
var foreground;
var deer_anim;
var dirt_hit;
var cta_splash;
var crosshairs;
var time_to_next_idle_anim;
var idle_anim_interval;
var tutorial_text;
var tutorial_overlay;
var input_pos;

var time_since_last_shot = 0;
var last_shot_time;

var gunshot_sfx;
var reload_sfx;

const DEER_INTRO_DELAY = 2500; //ms
const INTRO_DESTROY_TIME = 1500; //ms
const RELOAD_TIME = 1500; //ms
const DEER_FLEE_TIME = 2000; //ms
const DEER_ENTRY_POINT = {
  x: -150,
  y: 480
};

App.Game.prototype = {

  create: function () {
    // call mraid_wrapper.js to let it know the preload is complete
    wrapper_hide_splash();

    // get the dynamic game parameters (pass in the decription of the parameters containing their types and default values)
    this.params = utils.getAdParameters({tutorial: {type: 'bool', default: true},
                                         cta_on_idle_time: {type: 'int', default: 15000}});
    console.log("Parameters:", this.params);
   
    // set up the game; create your sprites; etc
    this.initBackground();
    this.initSounds();
    this.initHUD(); // For now, only shows crosshairs.
    this.initAnimations();
    this.initForeground();
    this.displayIntro();
    
  },

  initSounds: function initSounds() {
    gunshot_sfx = game.add.audio('gunshot');
    reload_sfx = game.add.audio('reload');
  },

  initHUD: function initHUD() {
    // TODO: Potentially introduce ammo system. 2 shots or 3?
    crosshairs = this.game.add.sprite(0, 0, 'crosshairs');
    crosshairs.alpha = 0;
    crosshairs.anchor.setTo(0.5, 0.5);
    crosshairs.scale.setTo(0.5, 0.5);
  },

  // Function for setting up background/foreground layers, doing positioning etc.
  initBackground: function initBackground() {
    background = this.game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    background.anchor.setTo(0.5, 0.5);
    background.inputEnabled = true;
    background.events.onInputDown.add(this.onShotFired, this);
  },

  initForeground: function initForeground() {
    foreground = this.game.add.sprite(game.world.centerX - 420, game.world.centerY, 'tree_foreground');
    foreground.anchor.setTo(0.5, 0.5);
    foreground.events.onInputDown.add(this.onShotFired, this);
  },

  // Meant to abstract the function of firing a shot to reduce code repetition
  onShotFired: function onShotFired(ctx) {
    time_since_last_shot = Date.now() - last_shot_time;
    if (time_since_last_shot && time_since_last_shot < RELOAD_TIME) {
      return;
    }

    last_shot_time = Date.now();

    if (crosshairs && crosshairs.alpha === 0) {
      crosshairs.alpha = 1;
    }

    input_pos = this.game.input;
    crosshairs.x = input_pos.x;
    crosshairs.y = input_pos.y;
    gunshot_sfx.onStop.add(function() {
      reload_sfx.play();
    });

    if (ctx === deer_anim) {
      this.onDeerClicked();
    } else {
      this.onMissDeer();
    }
  },

  onMissDeer: function onMissDeer() {
    // Safeguard against input_pos ever being undefined or null
    if (!input_pos) {
      input_pos = this.game.input;
    }
    if (dirt_hit.alpha === 0) {
      dirt_hit.alpha = 1;
    }

    gunshot_sfx.play();
    dirt_hit.x = input_pos.x;
    dirt_hit.y = input_pos.y;
    dirt_hit.animations.play('hit');
  },

  onDeerClicked: function onDeerClicked() {
    // TODO: Use blood textures, play deer death sound (?)
    input_pos = this.game.input;
    gunshot_sfx.play();
    crosshairs.x = input_pos.x;
    crosshairs.y = input_pos.y;
    this.endScreen();
  },

  makeDeerFlee: function makeDeerFlee() {
    var deer_flee_tween = this.game.add.tween(deer_anim).to({x: DEER_ENTRY_POINT.x}, DEER_FLEE_TIME, Phaser.Easing.Linear.None, true);
    deer_anim.scale.setTo(0.5, 0.5);
    deer_anim.animations.play('hop');
    deer_anim.animations.currentAnim.loop = true; //Seems incredibly hacky, there might be a wrapper function for this
    deer_flee_tween.onComplete.add(this.endScreen.bind(this));
  },

  putDeerOnScreen: function putDeerOnScreen() {
    var deer_tween = this.game.add.tween(deer_anim).to({x: 640}, 2000, Phaser.Easing.Linear.None, true); 

    deer_anim.animations.play('hop');
    deer_tween.onComplete.add(function() { 
      deer_anim.animations.currentAnim.loop = false;
      setTimeout(this.makeDeerFlee.bind(this), utils.random(3, 6) * 1000);
    }.bind(this));
    
  },

  initAnimations: function initAnimations() {
    this.initDeerAnims();
    this.initDirtAnims();
  },

  getDeerEntryPoint: function getDeerEntryPoint() {
    // override with something that looks at orientation later
    return DEER_ENTRY_POINT;
  },

  initDirtAnims: function initDirtAnims() {
    dirt_hit = this.game.add.sprite(0, 0, 'dirt_hit');
    dirt_hit.anchor.setTo(0.5, 1); // Weird ratio to put hit animation
    dirt_hit.alpha = 0;
    dirt_hit.animations.add('hit', Phaser.Animation.generateFrameNames('Dirt_Charge_14_', 0, 5, '.png', 5), 30, false);
  },
  
  initDeerAnims: function initDirtAnims() {
    var deer_entry_point = this.getDeerEntryPoint();

    deer_anim = this.game.add.sprite(deer_entry_point.x, deer_entry_point.y, 'deer_anims');
    deer_anim.anchor.setTo(0.5, 0.5);
    deer_anim.scale.setTo(-0.5, 0.5);
    deer_anim.animations.add('idle', Phaser.Animation.generateFrameNames('deer_01', 0, 44, '.png', 5), 15, false);
    deer_anim.animations.add('hop', Phaser.Animation.generateFrameNames('deerHop_seq_', 0, 18, '.png', 5), 20, true);
    deer_anim.inputEnabled = true;
    deer_anim.events.onInputDown.add(this.onShotFired, this);
  },

  // I'm not sure what the below comment really means. 

  // wherever the user completes a successful game action you should call this function
  // to let the mraid_wrapper.js know about the successful user interaction
  //wrapper_mark_interaction();


  displayIntro: function displayIntro() {
    this.intro = game.add.group();
    tutorial_overlay = this.intro.create(game.world.centerX, game.world.centerY, 'tutorial_overlay');
    tutorial_overlay.inputEnabled = true;
    tutorial_overlay.input.priorityID = 2; // Ensures no input happens 
    tutorial_overlay.anchor.setTo(0.5, 0.5);

    tutorial_text = this.game.add.text(this.game.width/2, this.game.height/4, "Shoot the deer when it appears", {font: "bold 24pt Arial", fill: "#ffffff"}, this.intro);
    tutorial_text.anchor.set(0.5, 0.5);
    this.game.add.tween(tutorial_text.scale).to({x: 1.5, y: 1.5}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    setTimeout(this.destroyIntro.bind(this), INTRO_DESTROY_TIME);
    setTimeout(this.putDeerOnScreen.bind(this), DEER_INTRO_DELAY);
  },


  destroyIntro: function destroyIntro() {
    if (!this.intro) {
      return;
    }

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
    background_overlay.events.onInputDown.add(function() { wrapper_click_go(); } );

    // display the call-to-action modal
    this.callToAction = game.add.group();
    cta_splash = this.callToAction.create(game.world.centerX, game.world.centerY, 'cta_splash');
    cta_splash.alpha = 0;
    cta_splash.anchor.setTo(0.5, 0.5);
    this.game.add.tween(cta_splash).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

    // let the mraid_wrapper.js know the call-to-action screen has been displayed
    wrapper_mark_cta();
  },

};
