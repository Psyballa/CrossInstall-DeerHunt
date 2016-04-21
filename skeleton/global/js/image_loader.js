var ImageLoader = function() {};

// this must be called before any other methods of the ImageLoader are used
ImageLoader.prototype.registerGame = function(game) {
  this._game = game;
  this._game.load.crossOrigin = "Anonymous";
  console.log("load.crossOrigin: ", this._game.load.crossOrigin);
}


// you may register multiple background images of different sizes / layouts.
// then, calling display_background() on the ImageLoader will load the most
// appropriate background image based on the current device layout and size.
ImageLoader.prototype.registerBackgroundImage = function(imageUrl, imageWidth, imageHeight) {
  var background = {url: imageUrl, width: imageWidth, height: imageHeight, landscape: imageWidth > imageHeight ? true : false};
  this._backgrounds.push(background);
}


// preloads the most appropriate background image based on the current
// device layout and size
ImageLoader.prototype.preloadBackground = function() {
  var bg_image = null;
  var landscape = false;
  if (this._game.width > this._game.height) {
    landscape = true;
  }

  // shuffle the order of the backgrounds; this lets us show different random
  // backgrounds when we have more than one background of the same size.
  // uses phaser's shuffle() implementation.
  this._backgrounds = Phaser.ArrayUtils.shuffle(this._backgrounds);

  for (var i = 0; i < this._backgrounds.length; i++) {
    if (landscape == this._backgrounds[i].landscape) {
      console.log("Preloading background: " + this._backgrounds[i].url + "    landscape? " + this._backgrounds[i].landscape);
      this.loadImage('background', this._backgrounds[i].url);
      return;
    }
  }
  console.log("No matching background found for preloading");
}


// displays the most appropriate background image based on the current
// device layout and size
ImageLoader.prototype.displayBackground = function() {
  return this._game.add.sprite(0, 0, 'background');
}


ImageLoader.prototype.loadImage = function(name, imgpath) {
  return this._game.load.image(name, imgpath);
}

ImageLoader.prototype.sprite = function(x, y, name) {
  // search the atlas files for the image with this name / filename
  for (var i = 0; i < this._atlases.length; i++) {
    var img = this._game.cache.getFrameByName(this._atlases[i], name);
    if (img === undefined || img == null)
      continue;

    return this._game.add.sprite(x, y, this._atlases[i], name);
  }

  // fallback: assume it is not in any atlas and has been preloaded
  console.log("image_loader: warning: sprite not found in atlases; assuming it was loaded individually: " + name);
  return this._game.add.sprite(x, y, name);
}

ImageLoader.prototype.spriteMake = function(x, y, name) {
  // search the atlas files for the image with this name / filename
  for (var i = 0; i < this._atlases.length; i++) {
    var img = this._game.cache.getFrameByName(this._atlases[i], name);
    if (img === undefined || img == null)
      continue;

    return this._game.make.sprite(x, y, this._atlases[i], name);
  }

  return this._game.make.sprite(x, y, name);
}

  
ImageLoader.prototype.button = function(x, y, name, cbk, ths) {
  console.log("CBBB");
  console.log(cbk);
  // search the atlas files for the image with this name / filename
  for (var i = 0; i < this._atlases.length; i++) {
    var img = this._game.cache.getFrameByName(this._atlases[i], name);
    if (img === undefined || img == null)
      continue;

  console.log("key");
  console.log(this._atlases[i]);
    return this._game.add.button(x, y, this._atlases[i], name, cbk, ths);
  }

  // fallback: assume it is not in any atlas and has been preloaded
  console.log("image_loader: warning: button not found in atlases; assuming it was loaded individually: " + name);
  return this._game.add.button(x, y, "",name, cbk, ths);
}


// returns true if the image name exists in one of the loaded atlases
ImageLoader.prototype.hasFrameName = function(name) {
  for (var i = 0; i < this._atlases.length; i++) {
    var img = this._game.cache.getFrameByName(this._atlases[i], name);
    if (img !== undefined && img != null)
      return true;
  }
  return false;
}


ImageLoader.prototype.loadSpritesheet = function(name, imgpath, frameheight, framewidth, spacing) {
  return this._game.load.spritesheet(name, imgpath, frameheight, framewidth, spacing);
}


ImageLoader.prototype.loadAtlasHash = function(key, textureURL, atlasURL, atlasData) {
  var loader = this._game.load.atlasJSONHash(key, textureURL, atlasURL, atlasData);
  this._atlases.push(key);
  console.log("Loaded atlas: " + key);
  return loader;
}


ImageLoader.prototype.loadAtlasArray = function(key, textureURL, atlasURL, atlasData) {
  var loader = this._game.load.atlasJSONArray(key, textureURL, atlasURL, atlasData);
  this._atlases.push(key);
  console.log("Loaded atlas: " + key);
  return loader;
}


var imageLoader = new ImageLoader();
imageLoader._game = null;
imageLoader._backgrounds = [];
imageLoader._atlases = [];



// add support for referencing a bitmap font inside an atlas texture
Phaser.Cache.prototype.addBitmapFontByAtlas = function (key, xmlData, imageKey, frameKey, xSpacing, ySpacing) {
  var obj = {
      url: null,
      data: null,
      font: null,
      base: this.getBaseTexture(imageKey)
  };

  if (xSpacing === undefined) { xSpacing = 0; }
  if (ySpacing === undefined) { ySpacing = 0; }

  obj.font = Phaser.LoaderParser.xmlBitmapFont(xmlData, obj.base, xSpacing, ySpacing);

  this._cache.bitmapFont[key] = obj;
};
