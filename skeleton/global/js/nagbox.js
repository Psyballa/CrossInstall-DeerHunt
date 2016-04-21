// class useful for popping up a series of nag texts to prompt the user to do something
var NagBox = function() {
  this.game = null;
  this.nagStrings = [];
  this.active = false;
  this.modal = null;
  this.count = 0;
  this.x = null;
  this.y = null;
  this.width = null;
  this.height = null;
  this.color = null;
  this.fontColor = null;
  this.bitmapFont = null;
  this.bitmapFontColor = null;
};

NagBox.prototype.init = function(game, nagStrings) {
  this.game = game;
  this.nagStrings = nagStrings;

  // default position, size, and color; the caller may override these
  if (this.x == null)
    this.x = this.game.width/2;
  if (this.y == null)
    this.y = this.game.height/2;
  if (this.width == null)
    this.width = 400;
  if (this.height == null)
    this.height = 250;
  if (this.color == null)
    this.color = 0x555555;
  if (this.fontColor == null)
    this.fontColor = "#ffffff";
  if (this.bitmapFontColor == null)
    this.bitmapFontColor = 0xFFFFFF;}

// starts showing nag dialogs to the user
NagBox.prototype.start = function(delay) {
  this.active = true;

  if (delay) {
    var ths = this;
    this.game.time.events.add(delay, function() {ths._showNag()}, this);
  }
  else
    this._showNag();
}

// stops showing nag dialogs; removes the currently displayed nag box (if any)
NagBox.prototype.end = function() {
  this.active = false;
  if (this.modal) {
    this.modal.destroy();
    this.modal = null;
  }
}

NagBox.prototype.bringToTop = function() {
  if (this.modal)
    this.game.world.bringToTop(this.modal);
}


NagBox.prototype._showNag = function() {
  if (this.modal) {
    this.modal.destroy();
    this.modal = null;
  }
  if (!this.active || !this.nagStrings || this.nagStrings.length == 0)
    return;

  this.modal = this.game.add.group();
  var ths = this;

  var textBubble = this.game.add.graphics(this.x, this.y);
  textBubble.beginFill(this.color, 1);
  textBubble.drawRoundedRect(0, 0, this.width, this.height, 20);
  textBubble.alpha = 0;
  textBubble.pivot.x = textBubble.width/2;
  textBubble.pivot.y = textBubble.height/2;
  textBubble.endFill();
  this.game.add.tween(textBubble).to({alpha: 1.0}, 300, Phaser.Easing.Sinusoidal.In, true)
    .onComplete.add(function() {
      ths.game.add.tween(textBubble).to({alpha: 0.8}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
      ths.game.add.tween(textBubble.scale).to({x: 1.05, y: 1.05}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    });
  this.modal.add(textBubble);

  var text = null;
  if (this.bitmapFont) {
      text = this.game.add.bitmapText(textBubble.x, textBubble.y, this.bitmapFont, this.nagStrings[this.count], 44);
      if (this.bitmapFontColor)
	  text.tint = this.bitmapFontColor;
  } else {
      text = this.game.add.text(textBubble.x, textBubble.y, this.nagStrings[this.count], {font: "bold 44pt Arial", fill: this.fontColor, align: "center", wordWrap: true, wordWrapWidth: textBubble.width - 30});
  }  text.alpha = 0;
  text.anchor.set(0.5);
  this.game.add.tween(text).to({alpha: 1}, 300, Phaser.Easing.Sinusoidal.In, true)
    .onComplete.add(function() {
      ths.game.add.tween(text.scale).to({x: 1.05, y: 1.05}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    });
  if (!this.bitmapFont)
    localization.fitText(text, null, textBubble.height - 30);
  this.modal.add(text);


  this.count++;
  if (this.count >= this.nagStrings.length)
    this.count = 0;

  this.game.time.events.add(2500, function() {
    ths.game.add.tween(text).to({alpha: 0}, 300, Phaser.Easing.Sinusoidal.Out, true)
    ths.game.add.tween(textBubble).to({alpha: 0}, 300, Phaser.Easing.Sinusoidal.Out, true)
      .onComplete.add(function() {
        if (ths.modal) {
          ths.modal.destroy();
          ths.modal = null;
        }
      });
  }, this);

  this.game.time.events.add(4000, function() {ths._showNag()}, this);
}