
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
    imageLoader.registerGame(this.game);

    // register your background images here, if you have different background images for different game sizes.
    // the imageLoader class will load the appropriate one for you based on the game size.  you may also have
    // several images of the same size and the imageLoader will load one randomly from that size each time.
    //imageLoader.registerBackgroundImage(ad_webroot+'/skeleton/img/background/728x1280_background_1.jpg', 728, 1280);
    //imageLoader.registerBackgroundImage(ad_webroot+'/skeleton/img/background/728x1280_background_2.jpg', 728, 1280);
    //imageLoader.registerBackgroundImage(ad_webroot+'/skeleton/img/background/1280x728_background.jpg', 1280, 728);
    //imageLoader.preloadBackground();

    imageLoader.registerBackgroundImage('img/background/background_main_1280x720.jpg', 1280, 1280);
    imageLoader.preloadBackground();

    imageLoader.loadImage('cta_splash', 'img/cia_final_screen.jpg');
    // register your atlases here; the imageLoader will load them up and make those available for creating sprites
    // in the game code without having to worry about which atlas the asset is in
    imageLoader.loadAtlasArray('assets', ad_webroot+'/texture_sheets/assets.png', ad_webroot+'/texture_sheets/assets.json');
    imageLoader.loadAtlasHash('deer_idle', 'img/Deer sequences/deer_idle.png', 'img/Deer sequences/deer_idle.json');
    //imageLoader.loadAtlasArray('assets2', ad_webroot+'/skeleton/texture_sheets/assets2.png', ad_webroot+'/skeleton/texture_sheets/assets2.json');
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
