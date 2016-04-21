// class useful for popping up user reviews of an app.  you provide an array
// of review strings & number of stars.  the Reviews class will cycle through
// reviews, pulsing them on to the screen in various positions.
var Reviews = function() {
  this.game = null;
  this.reviews = [];
  this.active = false;
  this.group = null;
  this.count = 0;
  this.zoneTop = true;
  this.zoneBottom = true;
  this.zoneLeft = true;
  this.zoneRight = true;
  this.lastZoneOffset = 0;
};

// the reviews array should be an array of arrays, like this:
// [["Fantastic game", 4.5],
//  ["Best game I've ever played!", 5],
//  ["Really nicely done, I love it", 4],
//  ["What a turd muffin", 1.5],
//  ["So-so experience.  Blech.", 2]]
//
// there are four zones where the reviews will randomly pop up:
//   zoneTop, zoneBottom, zoneLeft, zoneRight
// you may set any of these zones to true or false as you wish.
// default behavior:
//    on portrait mode, only top and bottom zones are active
//    on landsacpe mode, only left and right zones are active
Reviews.prototype.init = function(game, reviews) {
  this.game = game;
  this.reviews = reviews;

  if (ad_orientation == "landscape") {
    this.zoneTop = false;
    this.zoneBottom = false;
    this.zoneLeft = true;
    this.zoneRight = true;
  } else {
    this.zoneTop = true;
    this.zoneBottom = true;
    this.zoneLeft = false;
    this.zoneRight = false;
  }
}

// starts showing reviews to the user
Reviews.prototype.start = function(delay) {
  this.active = true;

  this.group = this.game.add.group();

  if (delay) {
    var ths = this;
    this.game.time.events.add(delay, function() {ths._showReview()}, this);
  }
  else
    this._showReview();
}

// stops showing nag dialogs; removes the currently displayed nag box (if any)
Reviews.prototype.end = function() {
  this.active = false;
  if (this.group) {
    this.group.destroy();
    this.group = null;
  }
}

Reviews.prototype.getGroup = function() {
  return this.group;
}


Reviews.prototype.bringToTop = function() {
  if (this.group)
    this.game.world.bringToTop(this.group);
}


Reviews.prototype._showReview = function() {
  if (!this.active || !this.reviews || this.reviews.length == 0)
    return;

  var ths = this;

  // pick a position and size restriction
  var activeZones = [];
  if (this.zoneTop) activeZones.push('top');
  if (this.zoneBottom) activeZones.push('bottom');
  if (this.zoneLeft) activeZones.push('left');
  if (this.zoneRight) activeZones.push('right');
  if (activeZones.length == 0)
    return;

  //var offset = utils.random(0, activeZones.length - 1);

  var offset = this.lastZoneOffset + 1;
  if (offset >= activeZones.length)
    offset = 0;
  this.lastZoneOffset = offset;
  var curZone = activeZones[offset];

  var xMin, xMax, yMin, yMax;
  switch (curZone) {
    case 'left':
    xMin = 0;
    xMax = Math.floor(this.game.width * .2);
    yMin = 0;
    yMax = this.game.height - 50;
    break;

    case 'right':
    xMin = this.game.width - Math.floor(this.game.width * .2);
    xMax = this.game.width;
    yMin = 0;
    yMax = this.game.height - 50;
    break;

    case 'top':
    xMin = 0;
    xMax = this.game.width;
    yMin = 0;
    yMax = Math.floor(this.game.height * .2) - 50;
    break;

    case 'bottom':
    xMin = 0;
    xMax = this.game.width;
    yMin = this.game.height - Math.floor(this.game.height * .2);
    yMax = this.game.height - 50;
    break;
  }

  var x = utils.random(xMin, xMin + (xMax - xMin) * 0.3);
  var width = xMax - x;
  var y = utils.random(yMin, yMin + (yMax - yMin) * 0.3);
  var height = yMax - y;

  var text = this.game.add.text(x, y + 50, this.reviews[this.count][0], {font: "bold 24pt Arial", fill: "#ffffff", align: "left", wordWrap: true, wordWrapWidth: width});
  text.stroke = '#000000';
  text.strokeThickness = 4;
  text.setShadow(2, 2, "#333333", 2, true, false);
  text.alpha = 0;
  this.game.add.tween(text).to({alpha: 1}, 500, Phaser.Easing.Sinusoidal.Out, true)
    .onComplete.add(function() {
      ths.game.add.tween(text).to({alpha: 0}, 2500, Phaser.Easing.Linear.None, true)
        .onComplete.add(function() {
          text.destroy();
        });
    });
  localization.fitText(text, null, height);
  this.group.add(text);

  var stars = this.renderStars(x, y, this.reviews[this.count][1]);
  this.game.add.tween(stars).to({alpha: 1}, 500, Phaser.Easing.Sinusoidal.Out, true)
    .onComplete.add(function() {
      ths.game.add.tween(stars).to({alpha: 0}, 3500, Phaser.Easing.Linear.None, true)
        .onComplete.add(function() {
          stars.destroy();
        });
    });
  this.group.add(stars);

  this.count++;
  if (this.count >= this.reviews.length)
    this.count = 0;

  this.game.time.events.add(2500, function() {ths._showReview()}, this);
}

Reviews.prototype.renderStars = function(x, y, numStars) {
  var stars = this.game.add.group();

  var i = 1;
  while (i <= 5) {
    var frameName = 'reviewstars_empty.png';
    if (i <= numStars)
      frameName = 'reviewstars_full.png';
    else if (i < numStars + 0.51)
      frameName = 'reviewstars_half.png';

    var star = imageLoader.sprite(x + i * 50 - 50, y, frameName);
    stars.add(star);

    i++;
  }

  return stars;
}
