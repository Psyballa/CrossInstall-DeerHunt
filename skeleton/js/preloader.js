
App = {
};


App.Preloader = function (game) {
};


App.Preloader.prototype = {

  init: function () {
    this.stage.disableVisibilityChange = true;
    if (this.game.device.desktop)
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    else
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    utils.forceOrientation(this.game, ad_orientation);
    this.scale.pageAlignHorizontally = true;
    this.scale.refresh();
  },


  preload: function () {
    // let the imageLoader have the game object
    this.preloadImages();
    this.preloadSounds();
  },

  preloadImages: function preloadImages() {
    imageLoader.registerGame(this.game);

    // register your background images here, if you have different background images for different game sizes.
    // the imageLoader class will load the appropriate one for you based on the game size.  you may also have
    // several images of the same size and the imageLoader will load one randomly from that size each time.
    imageLoader.registerBackgroundImage('img/background/background_main_1280x720.jpg', 1280, 720);
    imageLoader.preloadBackground();

    imageLoader.loadImage('cta_splash', 'img/cia_final_screen.jpg');
    imageLoader.loadImage('crosshairs', 'img/red_crosshairs.png');
    imageLoader.loadImage('tutorial_overlay', 'img/tutorial_overlay.png');
    imageLoader.loadImage('tree_foreground', 'img/cia_foreground_trees.png');
    imageLoader.loadImage('tree_midground', 'img/cia_midground_trees.png');
    // register your atlases here; the imageLoader will load them up and make those available for creating sprites
    // in the game code without having to worry about which atlas the asset is in
    imageLoader.loadAtlasArray('assets', ad_webroot+'/texture_sheets/assets.png', ad_webroot+'/texture_sheets/assets.json');
    imageLoader.loadAtlasHash('dirt_hit', 'img/Deer sequences/dirt_hit.png', 'img/Deer sequences/dirt_hit.json');
    imageLoader.loadAtlasHash('deer_anims', 'img/Deer sequences/deer_anims_0.png', 'img/Deer sequences/deer_anims_0.json');
  },

  preloadSounds: function preloadSounds() {
    this.game.load.audio('gunshot', 'assets/gunshot.wav');
    this.game.load.audio('reload', 'assets/reload.wav');
  },


  create: function () {
    // call mraid_wrapper.js to let it know the preload is complete
    wrapper_preload_complete();
  },


  loadUpdate: function () {
    wrapper_load_progress(this.game.load.progress);
  },


  update: function () {
    if (ad_state == 'ready') {
      ad_state = 'live';
      this.state.start('Game');
    }
  },

};
