// the CustomKeyboard assumes you have loaded all of the keyboard images in src/global/img/keyboard/
// into one of your game's texture sheets and that you have loaded your texture sheets via the
// src/global/js/image_loader.js utility.  this allows the CustomKeyboard class to find those assets.

var CustomKeyboard = function() {};

// this must be called before any other methods of the CustomKeyboard are used
CustomKeyboard.prototype.registerGame = function(game) {
  this._game = game;
}


// register your key-press callback function here
CustomKeyboard.prototype.registerKeypressCallback = function(callback) {
  this._callback = callback;
}


// displays the most appropriate background image based on the current
// device layout and size
CustomKeyboard.prototype.display = function(x, y, width, height, includeBackspace) {
  var group = this._game.add.group();

  var rows = [];
  rows.push(['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']);
  rows.push(['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']);
  var lastRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  if (includeBackspace)
    lastRow.push('backspace');
  rows.push(lastRow);

  var background = this._game.add.graphics(0, 0);
  background.beginFill(0xCDCFD3, 1);
  background.drawRect(x, y, width, height);
  background.alpha = 1.0;
  background.endFill();
  group.add(background);

  var keyWidth = null;
  var keyHeight = null;
  var keyScale = null;

  var xPadding = 12;
  var yPadding = 12;

  var curPosX = x;
  var curPosY = y + yPadding;

  for (i = 0; i < rows.length; i++) {
    var xInset = 0;
    for (j = 0; j < rows[i].length; j++) {
      var key = imageLoader.sprite(curPosX, curPosY, rows[i][j] + '.png');
      key.letter = rows[i][j];
      if (!keyWidth || !keyHeight || !keyScale) {
        keyWidth = key.width;
        keyHeight = key.height;
        keyScale = (height / rows.length) / (keyHeight + yPadding * 2);

        // make sure this wouldn't overflow the x direction
        if (rows[i].length * keyScale * (keyWidth + xPadding) > width) {
          console.log("keyboard is x-restricted.   scale too big: " + keyScale);
          // the scale is x-restricted
          keyScale = (width / rows[i].length) / (keyWidth + xPadding * 2);
          console.log("final scale: " + keyScale);
        } else {
          console.log("keyboard is y-restricted.   final scale: " + keyScale);
        }
      }

      if (j == 0) {
        // figure out the centering
        var xNeeded = (keyWidth * keyScale + xPadding) * rows[i].length;
        xInset = (width - xNeeded) / 2;
        curPosX += xInset;
      }

      key.x = curPosX;
      key.y = curPosY;
      key.scale.setTo(keyScale, keyScale);
      key.originalScale = keyScale;

      var ths = this;
      key.inputEnabled = true;
      key.events.onInputDown.add(this.onKeyDown, {key: key, keyboard: this});
      key.events.onInputUp.add(this.onKeyUp, {key: key, keyboard: this});

      group.add(key);

      curPosX += keyWidth * keyScale + xPadding;
    }

    curPosX = x;
    curPosY += keyHeight * keyScale + yPadding;
  }

  return group;
}

CustomKeyboard.prototype.onKeyDown = function(game) {
  this.keyboard._game.add.tween(this.key.scale).to({x: this.key.originalScale * .9, y: this.key.originalScale * .9}, 100, Phaser.Easing.Linear.None, true);
  this.key.tint = 0xdddddd;

  if (this.keyboard._callback) {
    // call the registered keyboard press callback
    this.keyboard._callback(this.key.letter, this.keyboard._game);
  }
}

CustomKeyboard.prototype.onKeyUp = function(game) {
  this.keyboard._game.add.tween(this.key.scale).to({x: this.key.originalScale, y: this.key.originalScale}, 100, Phaser.Easing.Linear.None, true);
  this.key.tint = 0xffffff;
}


var customKeyboard = new CustomKeyboard();
customKeyboard._game = null;
customKeyboard._callback = null;
