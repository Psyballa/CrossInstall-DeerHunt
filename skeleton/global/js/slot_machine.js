var VERBOSE = false;

var SHOW_TUTORIAL = true;

/* GAME STATES*/
var GS_READY = 'READY';
var GS_SPIN = 'SPIN';
var GS_WIN = 'WIN';
var GS_GAMEOVER = 'GAMEOVER';

/* BARS */
var BAR_ITEM_WIDTH = 150;
var BAR_ITEM_HEIGHT = 172;
var BAR_ITEMS_COUNT = 9;
var BAR_COUNT = 5;
var BAR_NUDGE_Y = 0;
var BAR_SPACING_H = 6;

var BAR_STATE_NONE = 0;
var BAR_STATE_SPINNING = 1;
var BAR_STATE_WIN = 2;
var BAR_STATE_STOPPED = 3;
var BAR_SPIN_DELAY = 0;
var BAR_SPIN_DELAY_END = 250; // 250
var BAR_SPIN_DURATION = 1400; // 1100
var BAR_SPIN_COUNT = 5;
var BAR_BLUR_SPEED_THRESHOLD = 20;
var BAR_HEIGHT = (BAR_ITEMS_COUNT * BAR_ITEM_HEIGHT);

var LM_SPEED = 2000;
var LM_LOW_CHANCE = 0;
var LM_HIGH_CHANCE = 100;

// Ofsetts for coins shoot effect
var COINS_POS_OFFSET_X = 0;
var COINS_POS_OFFSET_Y = 0;
var WIN_TEXT_OFFSET_X = 0;
var WIN_TEXT_OFFSET_Y = 0;
var COINS_SHOOT_OFFSET_X = 0;
var COINS_SHOOT_OFFSET_Y = 0;

var LUCK_METER_OFFSET_X = 0;
var LUCK_METER_OFFSET_Y = 0;
var LUCK_METER_ORIENTATION = 0; // 0 -the same as a game orientation, 1 - horizontal, 2 - vertical


var BAR_TILES_LOOKUP = [
	[0, 2, 2, 2, 0],
	[1, 0, 0, 0, 1],
	[2, 3, 3, 3, 2],
	[3, 1, 1, 1, 3],
	[4, 4, 4, 4, 4],
	[5, 5, 5, 5, 5],
	[6, 6, 6, 6, 6],
	[7, 7, 7, 7, 7],
	[8, 8, 8, 8, 8]
];
/* PAY LINES */
var PL_WIN_SHOWOFF_TIME = 2200;
var PL_MAX = 5;
var PL_OFFSETS = [
    {x: 165, y: 328},
    {x: 165, y: 132},
    {x: 165, y: 462+26},
    {x: 165, y: 178},
    {x: 165, y: 160}];

var PL_WIN_LABEL_SCALE_X = 1.15;
var PL_WIN_LABEL_SCALE_Y = 1.15;

var PL_PINS_OFFSETS = [
    {x: 165, y: 328},
    {x: 165, y: 132+43},
    {x: 165, y: 462+33},
    {x: 165, y: 178+37},
    {x: 165, y: 448}];

var PL_WIN_LABEL_OFFSETS = [
  {x: 500, y: 600},
  {x: 500, y: 600},
  {x: 500, y: 600},
  {x: 500, y: 600},
  {x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600},
	{x: 500, y: 600}
];

var PL_DATA = [
	[1, 1, 1, 1, 1], // LINE 1
	[0, 0, 0, 0, 0], // LINE 2
	[2, 2, 2, 2, 2], // LINE 3
	[0, 0, 1, 2, 2], // LINE 4
	[2, 2, 1, 0, 0]];// LINE 5

// 0 - wild, 1 - jackpos, 2 - sf, 3 - lv, 4 - hon, 5 - chi, 6 - ny. 7 - wheel, 8 - n0
var PAY_TABLE = [
	[0, 0, 0, 10, 100, 500], // WILD - 1 line, FAKE
	[0, 0, 0, 30, 150, 1000], // JACKPOT
	[0, 0, 0, 3, 15, 45], // SF
	[0, 0, 0, 5, 25, 75], // LV
	[0, 0, 0, 4, 20, 60], // HON
	[0, 0, 0, 3, 15, 75], // CHI
	[0, 0, 0, 5, 25, 75], // NY
	[0, 0, 0, 3, 15, 75], // WHEEL
	[0, 0, 0, 4, 20, 60]];  //  NO

/* USER RELATED */
var BETS = [55, 100, 150, 200, 300, 500, 1000, 10000];
var CASH = 100000;

/* OTHER ANIMATIONS */
var ANIM_COINS_POINTS = [{x: 550, y: 595}, {x: 360, y: 300}, {x: 780, y: 60}];
var MAX_COINS = 50;
var GAME_AREA = {x: 0, y: 50, w: 940, h: 550};
function lu(bar, index){
    return BAR_TILES_LOOKUP[bar][index];
}

function lui(bar, tile) {
	for (var i = 0; i < 9; i++)
		if (BAR_TILES_LOOKUP[i][bar] == tile)
			return i;
	return -1;
}

function luinv(bar, tile, offset) {
	return lu((lui(bar, tile) + offset) % BAR_ITEMS_COUNT, bar);
}

SlotMachine = function(parent) {
	this.parent = parent;
	this.game = parent.game;
};

SlotMachine.prototype = {
  init: function() {
  	this.initMRAID();

  	this.gameArea = GAME_AREA;
  	this.gameState = GS_READY;
  	this.generateRandomLookup();
  	this.spins = [0, 0, 0, 0, 0];
  	this.barsState = [
  		[0, 0, 0, 0, 0],
  		[1, 1, 1, 1, 1],
  		[2, 2, 2, 2, 2]
  	];
  	this.barsFinished = 0;
  	this.autoSpin = false;
  	this.numPaylines = PL_MAX;
  	this.balance = CASH;
  	this.tweenBalance = 0;
  	this.currentBetIndex = 3;
  	this.animTime = 0;
  	this.pendingLineWins = [];
  	this.lastGameResults = [];
  	this.numSpins = 0;
  	this.pendingGameOver = false;

  	// lucky meter
  	this.luckChance = 0;
  	this.gLuckyMeter = this.game.add.group();

  	this.view = this.game.add.group();
  	this.view.scale.set(S);

  	this.bars = this.game.add.group();
  	this.bbars = this.game.add.group();
  	this.fbars = this.game.add.group();

  	this.createBar();
  	this.createBar();
  	this.createBar();
  	this.createBar();
  	this.createBar();

  	this.winningLines = [];
  	this.findWinningLines();

  	this.callToAction = this.game.add.group();
  	this.intro = this.game.add.group();

  	this.initUI();

  	this.view.add(this.callToAction);
  	this.view.add(this.intro);

  	if (SHOW_TUTORIAL)
  		this.displayIntro();
  },

reset: function() {
		this.setBalance(CASH);
		this.gameState = GS_READY;
	},

	generateRandomLookup: function() {
		for (var i = 0; i < BAR_COUNT; i++) {
			var rnd = [0, 1, 2, 3, 4, 5, 6, 7, 8];
			rnd = Phaser.ArrayUtils.shuffle(rnd);

			for (var j = 0; j < BAR_ITEMS_COUNT; j++) {
				BAR_TILES_LOOKUP[j][i] = rnd[j];
			}
		}
	},

	shuffle: function(o) {
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},

	initMRAID: function() {
		if (MRAID_ENABLED)
			wrapper_hide_splash();

		this.params = {};
		this.params.win_chance = 0.7;
		this.params.num_spins = 3;
		this.params.win_causes_cta = 0;
		this.params.cta_on_idle_time = 20000;
		this.params.luckmeter_enabled = false;

		utils.applyAdParameters(this.params);
	},

	initUI: function() {

    var self = this;

		this.gWhite = game.make.graphics(0, 0);
		this.gWhite.beginFill(0x000000, 0.5);
		this.gWhite.drawRect(this.gameArea.x, this.gameArea.y, this.gameArea.w, this.gameArea.h);
		this.gWhite.endFill();
		this.view.add(this.gWhite);

		this.view.add(this.bars);
		this.view.add(this.bbars);
		this.view.add(this.fbars);

		this.fGround = imageLoader.sprite(0, 0, 'fg_' + ad_orientation + '.png');
		this.fGround.y = BASE_HEIGHT / 2 - this.fGround.height / 2;
		this.fGround.x = BASE_WIDTH / 2 - this.fGround.width / 2;
		this.view.add(this.fGround);

		this.game.world.bringToTop(this.bars);
		this.game.world.bringToTop(this.bbars);
		this.game.world.bringToTop(this.fbars);

		this.bars.x = this.bbars.x = 214;
		this.bars.y = this.bbars.y = 100;

		this.gPaylines = this.game.add.group();
		this.gPins = this.game.add.group();
		this.gWins = this.game.add.group();

		this.view.add(this.gPaylines);
		this.view.add(this.gPins);
		this.view.add(this.gWins);

		for (var i = 0; i < PL_MAX; i++) {
			var l = imageLoader.sprite(0, 0, 'payline_' + i.toString() + '.png');
			l.x = this.getPaylineOffset(i).x;
			l.y = this.getPaylineOffset(i).y;
			l.visible = false;
			l.index = i;
			l.scale.set(1.15);
			this.gPaylines.add(l);

			var pinName = 'pin_' + i.toString() + '.png';
			var hasPinTexture = game.cache.checkImageKey(pinName);

			if (hasPinTexture) {
				var p = imageLoader.sprite(0, 0, pinName);
				p.x = PL_PINS_OFFSETS[i].x;
				p.y = PL_PINS_OFFSETS[i].y;
				p.visible = false;
				p.index = i;
				p.scale.set(1.15);
				p.line = l;
				this.gPins.add(p);
			}


			var hasLineWinLabelTexture = game.cache.checkImageKey('line_win_label.png');
  		if (hasLineWinLabelTexture) {

				var w = imageLoader.sprite(0, 0, 'line_win_label.png');
				w.anchor.set(0.5);
				w.x = PL_WIN_LABEL_OFFSETS[i].x;
				w.y = PL_WIN_LABEL_OFFSETS[i].y;
				w.visible = false;
				w.index = i;
				w.scale.setTo(PL_WIN_LABEL_SCALE_X, PL_WIN_LABEL_SCALE_Y);
				this.gWins.add(w);
			}

			var tWin = this.game.make.text(PL_WIN_LABEL_OFFSETS[i].x, PL_WIN_LABEL_OFFSETS[i].y, i + '', {
				font: "30px Arial Bold",
				fill: "#ffffff"
			});
			tWin.anchor.set(0.5);
			tWin.visible = false;
			this.gWins.add(tWin);

			if (hasPinTexture)
				l.pin = p;

			if (hasLineWinLabelTexture)
				l.win = w;

			l.winText = tWin;
			//if (this.parent.onBarCreated)
			//this.parent.onBarCreated(bar);
		}

    // add luck meter
    if(this.params.luckmeter_enabled)
    {
      var orientation = ad_orientation;

      switch(LUCK_METER_ORIENTATION)
      {
        case 0:
            break;
        case 1:
           orientation = "landscape";
            break;
        case 2:
           orientation = "portrait";
            break;
            default: break;
      }


      var luckyMeter = imageLoader.sprite(0, 0, 'luckMeter_' + orientation + '.png');
      var luckyMeterFill = imageLoader.sprite(0, 0, 'luckMeter_fill.png');
      this.luckyMeterCoinsBag = imageLoader.sprite(0, 0, 'luckMeter_coinsBag_'+ orientation + '.png');

      luckyMeterFill.anchor.setTo(0, 1);
      luckyMeterFill.scale.setTo(1, 0);

      if(orientation == 'landscape')
      {
        luckyMeterFill.angle = 90;
        luckyMeterFill.x += 60;
      }
      else
      {
       luckyMeterFill.angle = 180;
       luckyMeterFill.x += 80;
       luckyMeterFill.y += 60;
      }

      this.gLuckyMeter.add(luckyMeter);
      this.gLuckyMeter.add(luckyMeterFill);
      this.gLuckyMeter.add(this.luckyMeterCoinsBag);

      this.lucky_meter_tween = this.game.add.tween(luckyMeterFill.scale).to({x: 1,y: 1}, LM_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true).onUpdateCallback(function()
        {
			    self.luckChance = mathEx.map(luckyMeterFill.scale.y, 0, 1, LM_LOW_CHANCE, LM_HIGH_CHANCE, true, true, true);
        });

      if(orientation == 'landscape')
      {
      this.gLuckyMeter.pivot.x = 20;
      this.gLuckyMeter.pivot.y = 60;
      this.gLuckyMeter.x += 710 + LUCK_METER_OFFSET_X;
      this.gLuckyMeter.y += 700 + LUCK_METER_OFFSET_Y;
      }
      else {
        this.gLuckyMeter.pivot.x = 20;
        this.gLuckyMeter.pivot.y = 60;
        this.gLuckyMeter.x += 550 + LUCK_METER_OFFSET_X;
        this.gLuckyMeter.y += 880 + LUCK_METER_OFFSET_Y;
      }
      this.view.add(this.gLuckyMeter);
    }

		//this.btnMinusPayLine = this.game.make.button('btn_minus.png', this.onBtnMinusPayLine_Clicked, this);
		this.btnMinusPayLine = imageLoader.sprite(34, 567, 'btn_minus.png');
		this.btnMinusPayLine.inputEnabled = true;
		this.btnMinusPayLine.events.onInputDown.add(this.onBtnMinusPayLine_Clicked, this);
		this.view.add(this.btnMinusPayLine);

		//this.btnPlusPayLine = this.game.make.button(207, 567, 'btn_plus.png', this.onBtnPlusPayLine_Clicked, this);
		this.btnPlusPayLine = imageLoader.sprite(207, 567, 'btn_plus.png');
		this.btnPlusPayLine.inputEnabled = true;
		this.btnPlusPayLine.events.onInputDown.add(this.onBtnPlusPayLine_Clicked, this);
		this.view.add(this.btnPlusPayLine);

		this.tPayline = this.game.make.text(150, 577, '1', {
			font: "30px Arial Bold",
			fill: "#ffffff"
		});
		this.tPayline.anchor.set(0.5, 0);
		this.view.add(this.tPayline);

		//this.btnMinusBetPerLine = this.game.make.button(34, 567, 'btn_minus.png', this.onBtnMinusBet_Clicked, this);
		this.btnMinusBetPerLine = imageLoader.sprite(34, 567, 'btn_minus.png');
		this.btnMinusBetPerLine.inputEnabled = true;
		this.btnMinusBetPerLine.events.onInputDown.add(this.onBtnMinusBet_Clicked, this);
		this.view.add(this.btnMinusBetPerLine);

		//this.btnPlusBetPerLine = this.game.make.button(207, 567, 'btn_plus.png', this.onBtnPlusBet_Clicked, this);
		this.btnPlusBetPerLine = imageLoader.sprite(207, 567, 'btn_plus.png');
		this.btnPlusBetPerLine.inputEnabled = true;
		this.btnPlusBetPerLine.events.onInputDown.add(this.onBtnPlusBet_Clicked, this);
		this.view.add(this.btnPlusBetPerLine);

		this.tBet = this.game.make.text(635, 660, BETS[this.currentBetIndex].toString(), {
			font: "30px Arial Bold",
			fill: "#ffffff"
		});
		this.tBet.anchor.set(0.5, 0);
		this.view.add(this.tBet);

		this.tTotalBet = this.game.make.text(930, 660, this.calcTotalBet().toString(), {
			font: "30px Arial Bold",
			fill: "#ffffff"
		});
		this.tTotalBet.anchor.set(0.5, 0);
		this.view.add(this.tTotalBet);

		this.tBalance = this.game.make.text(920, 41, this.balance.toString(), {
			font: "33px Arial Bold",
			fill: "#ffffff"
		});
		this.tBalance.anchor.set(0.5, 0.5);
		this.view.add(this.tBalance);

		//this.btnSpin = this.game.make.button(1100, 529, 'btn_spin_on.png', this.onBtnSpin_Clicked, this);
		this.btnSpin = imageLoader.sprite(1100, 529, 'btn_spin_on.png')
		this.btnSpin.inputEnabled = true;
		this.btnSpin.events.onInputDown.add(this.onBtnSpin_Clicked, this);
		this.view.add(this.btnSpin);

		this.setPaylinesCount(this.numPaylines);
		this.toggleLines(false);
		//this.toggleLinesDebug(14);

		if (this.game.coin_stack_animation == true) {

			// add coin stack
			this.coinStack = imageLoader.sprite(0, 0, 'coin_stack2.png');
			this.coinStack.anchor.set(0.5, 0.5);
			this.coinStack.x = 615 + COINS_POS_OFFSET_X;
			this.coinStack.y = 510 + COINS_POS_OFFSET_Y;
			this.coinStack.y += 130;
			this.coinStack.init_y = this.coinStack.y;

			// add coin stack
			this.coinStackT = imageLoader.sprite(0, 0, 'coin_stack2.png');
			this.coinStackT.anchor.set(0.5, 0.5);
			this.coinStackT.x = 0;
			this.coinStackT.y = 0;
			this.coinStackT.alpha = 0;
			this.coinStackT.trans = this.game.add.tween(this.coinStackT).to({
				x: this.tBalance.x,
				y: this.tBalance.y
			}, 500, "Sine.easeOut");
			this.coinStackT.s_trans = this.game.add.tween(this.coinStackT.scale).to({
				x: 0.01,
				y: 0.01
			}, 450);
			var self = this;
			this.coinStackT.trans.onComplete.add(function() {
				self.coinStackT.alpha = 0;
			});

			this.coinStackWhite = imageLoader.sprite(800, 20, 'coin_stack2_white.png');
			this.coinStackWhite.anchor.set(0.5, 0.5);
			this.coinStackWhite.alpha = 0;
			this.coinStackWhite.x = 615 + COINS_POS_OFFSET_X;
			this.coinStackWhite.y = 510 + COINS_POS_OFFSET_Y;
			this.coinStackWhite.y += 130;
			this.view.cMask = game.make.graphics(COINS_POS_OFFSET_X, COINS_POS_OFFSET_Y);
			this.view.cMask.beginFill(0000000);
			this.view.cMask.drawRect(400, -145, 500, 700);
			this.coinStack.mask = this.view.cMask;
			this.coinStackT.mask = this.view.cMask;
			this.coinStackWhite.mask = this.view.cMask;
			this.view.add(this.view.cMask);
			this.view.add(this.coinStackWhite);
			this.view.add(this.coinStack);
			this.view.add(this.coinStackT);
			// tweens
			this.stackTween = this.game.add.tween(this.coinStackWhite).to({
				alpha: 1
			}, 100);
			this.stackTween_off = this.game.add.tween(this.coinStackWhite).to({
				alpha: 0
			}, 200);
			// reset function
			var self = this;
			this.coinStack.cReset = function() {
				self.stackTween_off.start();
				self.coinStack.y = self.coinStack.init_y;
				self.coinStack.alpha = 1;
				self.coinStack.scale.x = 1;
				self.coinStack.scale.y = 1;

				self.coinStackT.alpha = 1;
				self.coinStackT.x = self.coinStackWhite.x;
				self.coinStackT.y = self.coinStackWhite.y;
				self.coinStackT.scale.x = self.coinStackWhite.scale.x;
				self.coinStackT.scale.y = self.coinStackWhite.scale.y;
				self.coinStackT.trans.start();
				self.coinStackT.s_trans.start();
			}
			this.stackTween.onComplete.add(this.coinStack.cReset);
		}

		this.view.x += MACHINE_X_OFFSET;
		this.view.y += MACHINE_Y_OFFSET;

		if (this.parent.onInitUI)
			this.parent.onInitUI();
	},

	toggleLinesDebug: function(index){
        this.gPaylines.forEach(function(pl) {
            pl.alpha = pl.index == index ? 1 : 0;
			pl.visible = pl.index == index;
		});
  },

	getPaylineOffset: function(i){
		if (ad_orientation == 'landscape')
			return PL_OFFSETS[i];
		else
			return PL_OFFSETS_PORTRAIT[i];
	},

	createBar: function() {
	  var bar = this.game.add.group();
	  var bbar = this.game.add.group();
	  var fbar = this.game.add.group();

	  bar.index = this.bars.children.length;

	  for (var i = 0; i < BAR_ITEMS_COUNT; i++) {
	      var item = imageLoader.sprite(0, 0, 'icon_' + lu(i, bar.index) + '.png');
	      item.anchor.set(0.5, 0.5);

	      item.index = i;
	      item.tile = lu(i, bar.index);
	      item.x += BAR_ITEM_WIDTH / 2;

	      item.y = item.startY = ((i * BAR_ITEM_HEIGHT) + BAR_ITEM_HEIGHT) + BAR_NUDGE_Y;
	      item.y -= BAR_ITEM_HEIGHT / 2;

	      var bitem = imageLoader.sprite(0, 0, 'bicon_' + lu(i, bar.index) + '.png');
	      bitem.x = item.x;
	      bitem.y = item.y;
	      bitem.alpha = 0;
	      bitem.anchor.set(0.5, 0.5);

	      var fitem = imageLoader.sprite(0, 0, 'frame_0.png');
	      fitem.animations.add('idle', ['frame_0.png', 'frame_1.png', 'frame_2.png', 'frame_3.png'], 20, true);
	      fitem.animations.play('idle');
	      fitem.x = item.x;
	      fitem.y = item.y;
	      fitem.alpha = 0;
	      fitem.anchor.set(0.5, 0.5);
	      fbar.add(fitem);

	      item.hl = fitem;

	      item.blur = bitem;

	      bar.add(item);
	      bbar.add(bitem);

	      if (this.parent.onItemCreated)
		      this.parent.onItemCreated(bar, item, bitem, fitem);
	  }

	  bar.state = BAR_STATE_NONE;
	  bar.startTime = 0;
	  bar.startValue = 0;
	  bar.endValue = 0;
	  bar.duration = 0;
	  bar.currentValue = 0;
	  bar.currentSpeed = 0;
	  bar.lastY = 0;
	  bar.tileY = 0;
	  bar.currentTime = 0;
	  bar.dst = 0;

	  mask = game.make.graphics(0, 0);
	  mask.beginFill(0xffffff);
	  mask.beginFill(0xccffff);
	  mask.drawRect(this.gameArea.x, this.gameArea.y, this.gameArea.w, this.gameArea.h);
	  bar.mask = mask;
	  bbar.mask = mask;
	  this.view.add(mask);

	  bar.x += (this.bars.children.length * BAR_SPACING_H) + (BAR_ITEM_WIDTH * this.bars.children.length);
	  bbar.x = bar.x;
	  fbar.x = bar.x;

	  this.bars.add(bar);
	  this.bbars.add(bbar);
	  this.fbars.add(fbar);
  },

	calcTotalBet: function() {
		return BETS[this.currentBetIndex] * this.numPaylines;
	},

	onBtnMinusPayLine_Clicked: function() {
		this.setPaylinesCount(this.numPaylines - 1);
		this.setBet(this.currentBetIndex);

		if (MRAID_ENABLED)
			wrapper_mark_interaction();
	},

	onBtnPlusPayLine_Clicked: function() {
		this.setPaylinesCount(this.numPaylines + 1);
		this.setBet(this.currentBetIndex);
    if (MRAID_ENABLED)
			wrapper_mark_interaction();
	},

	onBtnMinusBet_Clicked: function() {
		this.setBet(this.currentBetIndex - 1);

		if (MRAID_ENABLED)
			wrapper_mark_interaction();
	},

	onBtnSpin_Clicked: function() {
		this.destroyIntro();

		this.spin();

		if (MRAID_ENABLED)
			wrapper_mark_interaction();
	},

	onBtnPlusBet_Clicked: function() {
		this.setBet(this.currentBetIndex + 1);

		if (MRAID_ENABLED)
			wrapper_mark_interaction();
	},

	// SLOT MACHINE
	findWinningLines: function(){
		var MAX_LINES = 10;
		var current = 0;
		this.winningLines = [];

		while (current < MAX_LINES)
		{
			this.generateSpin();
			this.checkLines();

			for (var i = 0; i < this.pendingLineWins.length; i++) {
				var l = this.pendingLineWins[i];
				if (l.win == 0)
					continue;

				this.winningLines.push({ spin: this.spins.slice(0), line: l.line});
				current++;
			}
		}
	},

	checkLines: function() {
		this.pendingLineWins = [];
		this.lastGameResults = [];

		for (var i = 0; i < this.numPaylines; i++) {
			var r = this.checkLine(i);
			this.lastGameResults.push(r);
			if (r.win > 0)
				this.pendingLineWins.push(r);
		}
	},

	checkLine: function(index) {
		var line = PL_DATA[index];
		var matches = 0;
		var tiles = [];

		var v0 = this.barsState[PL_DATA[index][0]][0];
		var v1 = this.barsState[PL_DATA[index][1]][1];
		var v2 = this.barsState[PL_DATA[index][2]][2];
		var v3 = this.barsState[PL_DATA[index][3]][3];
		var v4 = this.barsState[PL_DATA[index][4]][4];

		// hate loops
		if (v0 == v1 && v0 == v2 && v0 == v3 && v0 == v4) // [x] [x] [x] [x] [x]
			tiles.push( {bar: 0, tile: v0}, {bar: 1, tile: v1}, {bar: 2, tile: v2}, {bar: 3, tile: v3}, {bar: 4, tile: v4});
		else if (v1 == v2 && v1 == v3 && v1 == v4) // [ ] [x] [x] [x] [x]
			tiles.push( {bar: 1, tile: v1}, {bar: 2, tile: v2}, {bar: 3, tile: v3}, {bar: 4, tile: v4});
		else if (v0 == v1 && v0 == v2 && v0 == v3) // [x] [x] [x] [x] [ ]
			tiles.push( {bar: 0, tile: v0}, {bar: 1, tile: v0}, {bar: 2, tile: v0}, {bar: 3, tile: v0});
		else if (v0 == v1 && v0 == v2) // [x] [x] [x] [ ] [ ]
			tiles.push( {bar: 0, tile: v0}, {bar: 1, tile: v0}, {bar: 2, tile: v0});
		else if (v1 == v2 && v1 == v3) // [ ] [x] [x] [x] [ ]
			tiles.push( {bar: 1, tile: v1}, {bar: 2, tile: v1}, {bar: 3, tile: v1});
		else if (v2 == v3 && v2 == v4) // [ ] [ ] [x] [x] [x]
			tiles.push( {bar: 2, tile: v2}, {bar: 3, tile: v2}, {bar: 4, tile: v2});

		matches = tiles.length;

		var mul = 0;
		var win = 0;
		if (matches > 0)
		{
			mul = PAY_TABLE[v0][matches];
			win = mul * this.calcTotalBet();
		}
		var result = { matches: matches, line: index, win: win, tile: v0, tiles: tiles };

		if (VERBOSE)
			console.log('[SM] Line results:', result);
		return result;
	},

	setBet: function(index) {
		if (this.gameState != GS_READY)
			return;

		if (index < 0)
			index = 0;

		if (index >= BETS.length)
			index = BETS.length - 1;

		this.currentBetIndex = index;
		this.tBet.text = BETS[this.currentBetIndex].toString();
		this.tTotalBet.text = this.calcTotalBet().toString();
	},

	setPaylinesCount: function(num) {

		if (this.gameState != GS_READY)
			return;

		this.toggleLines(true);

		if (num < 1)
			num = 1;

		if (num > PL_MAX)
			num = PL_MAX;

		var self = this;
		this.numPaylines = num;

    this.gPaylines.visible = true;
		this.gPaylines.forEach(function(pl) {
			pl.visible = self.numPaylines > pl.index;
    	if (pl.pin)
				pl.pin.visible = pl.visible;
		});
		this.tPayline.text = this.numPaylines;

		if (this.parent.onSetPaylinesCount)
			this.parent.onSetPaylinesCount(num);

		if (VERBOSE)
			console.log('[SM] Num pay lines: ', this.numPaylines);
	},

	setBalance: function(value) {
		if (value < 0)
			return;

		this.balance = value;
		this.tweenBalance = value;
		this.tBalance.text = value.toString();
	},

	spin: function() {

    if(this.params.luckmeter_enabled)
    {
      this.lucky_meter_tween.pause();
      this.game.add.tween(this.gLuckyMeter.scale).to({x:1.2, y:1.2},500,Phaser.Easing.Sinusoidal.InOut,true,0,1,true);
    }

		if (this.gameState != GS_READY)
			return;

		var self = this;

		var newBalance = this.balance - this.calcTotalBet();
		if (newBalance < 0) {
			this.gameState = GS_GAMEOVER;
			console.log('gameover: not enought coins');
			return;
		}
		this.setBalance(this.balance - this.calcTotalBet());
		this.barsFinished = 0;

		this.generateSpin();
		this.onSpinGenerated();

		this.bars.forEach(function(bar) {
			bar.state = BAR_STATE_SPINNING;
			bar.startTime = (this.game.time.now + (BAR_SPIN_DELAY * (bar.index + 1)));
			bar.duration = (BAR_SPIN_DURATION + (BAR_SPIN_DELAY_END * bar.index)) * 0.001;

			bar.startValue = bar.endValue;

			var tileOff = self.findTileOffset(bar.index, self.spins[bar.index]);

			bar.endValue = bar.startValue;
			bar.endValue += BAR_HEIGHT - (tileOff * BAR_ITEM_HEIGHT);
			bar.endValue += bar.dst * BAR_ITEM_HEIGHT;
			bar.endValue += BAR_SPIN_COUNT * BAR_HEIGHT;

			bar.dst = tileOff;

			bar.currentValue = 0;
			bar.currentSpeed = 0;
			bar.currentTime = 0;
		});

    this.gPaylines.visible = false;
		this.checkLines();
		this.numSpins++;
		this.gameState = GS_SPIN;
	},

	lerp: function(a, b, t) {
		return a + t * (b - a);
	},

	sinerp: function(start, end, value) {
		return this.lerp(start, end, Math.sin(value * Math.PI * 0.5));
	},

	onSpinGenerated: function(){
    var rnd = Math.random();
		if ( rnd <= this.params.win_chance && this.winningLines  && this.winningLines.length)
      this.setWinningSpin();
    if( rnd <= ( this.luckChance/100))
      this.setWinningSpin();
	},

  setWinningSpin: function(){
    // todo: has winning lines
    this.spins = this.winningLines.pop().spin.slice(0);
    this.updateBars();
  },

	generateSpin: function(){
		this.spins[0] = this.game.rnd.integerInRange(0, BAR_ITEMS_COUNT-1);
		this.spins[1] = this.game.rnd.integerInRange(0, BAR_ITEMS_COUNT-1);
		this.spins[2] = this.game.rnd.integerInRange(0, BAR_ITEMS_COUNT-1);
		this.spins[3] = this.game.rnd.integerInRange(0, BAR_ITEMS_COUNT-1);
		this.spins[4] = this.game.rnd.integerInRange(0, BAR_ITEMS_COUNT-1);
		this.updateBars();
	},

  findTileOffset: function(bar, tile){
      for (var i = 0; i < BAR_ITEMS_COUNT; i++) {
          var real = BAR_TILES_LOOKUP[i][bar];
          if (real == tile)
              return i;
      }
      console.log('unable to find tile offset');
      return -1;
  },

	updateBars: function() {
		var s1 = this.spins[0];
		var s2 = this.spins[1];
		var s3 = this.spins[2];
		var s4 = this.spins[3];
		var s5 = this.spins[4];

    this.barsState = [
                    [this.spins[0], this.spins[1], this.spins[2], this.spins[3], this.spins[4]],
                    [luinv(0, s1, 1), luinv(1, s2, 1), luinv(2, s3, 1), luinv(3, s4, 1), luinv(4, s5, 1) ],
                    [luinv(0, s1, 2), luinv(1, s2, 2), luinv(2, s3, 2), luinv(3, s4, 2), luinv(4, s5, 2) ]];

		if (VERBOSE)
		{
			console.log('[SM] Bar state', this.barsState[0]);
			console.log('[SM] Bar state', this.barsState[1]);
			console.log('[SM] Bar state', this.barsState[2]);
		}
	},

	update: function(){
		this.mraid_update();

		BAR_HEIGHT = (BAR_ITEMS_COUNT * BAR_ITEM_HEIGHT);

		var now = this.game.time.now / 1000;
		var dt = this.game.time.elapsed / 1000;

		//this.wheel.rotation += 0.2 * dt;
		this.animTime += dt;

		this['update_'+this.gameState](dt);

		if (this.tweenBalance < this.balance)
      this.tweenBalance = this.sinerp(this.tweenBalance, this.balance, dt * 2) + 1;

    this.tBalance.text = ~~this.tweenBalance;
	},

	update_READY: function(dt){
		if (this.pendingGameOver)
		{
			console.log('pending game over');
			this.gameState = GS_GAMEOVER;
		}
		else
		{
			if (this.autoSpin)
				this.spin();
		}
	},

	update_SPIN: function(dt){

		if (this.barsFinished == 5 && this.gameState == GS_SPIN) {
			this.gameState = GS_WIN;
			this.animTime = PL_WIN_SHOWOFF_TIME * 0.001; // fake delay for now
			return;
		}

		var self = this;

		this.bars.forEach(function(bar) {

			if (bar.state != BAR_STATE_SPINNING)
				return;

			if (bar.startTime > this.game.time.now)
				return;

			bar.currentTime += dt;
			if (bar.currentTime >= bar.duration) {
				bar.state = BAR_STATE_STOPPED;
				bar.currenTime = bar.duration;
				bar.currentSpeed = 0;
				self.barsFinished++;
				self.update_tilePosition(bar, true);

				return;
			}

			self.update_tilePosition(bar, false);

			bar.currentSpeed = bar.tileY - bar.lastY;
			bar.lastY = bar.tileY;
		});
	},

	update_WIN: function(dt){
		var self = this;

    // resume luckmeter
    if(this.params.luckmeter_enabled)
    {
      this.lucky_meter_tween.resume();
    }

		if (this.animTime >= (PL_WIN_SHOWOFF_TIME * 0.001)){
			this.gPaylines.visible = this.gameState == GS_WIN;

			if (this.pendingLineWins.length == 0)
			{
    		this.gPaylines.visible = false;

				if (this.numSpins >= this.params.num_spins)
					this.gameState = GS_GAMEOVER;
				else
					this.gameState = GS_READY;
				return;
			}

			if (this.params.win_causes_cta === 1)
			{
				console.log('win causes cta', this.params.win_causes_cta);
				this.pendingGameOver = true;
			}

			var r = this.pendingLineWins.shift();
			this.animTime = 0;

			this.toggleLines(false);

			var line = this.gPaylines.getAt(r.line);
			line.visible = true;
			line.alpha = 0;
			if (line.win)
				line.win.visible = true;

			line.winText.visible = true;
			line.winText.text = r.win.toString();

      line.winText.x += WIN_TEXT_OFFSET_X;
      line.winText.y += WIN_TEXT_OFFSET_Y;

			var t = this.game.add.tween(line).to( { alpha: 1 }, 100);
			//t.repeat(5, 50);
			t.delay(900);
			t.start();

			var t2 = this.game.add.tween(line).to( { }, 100);
			t2.delay(900);
			t2.onComplete.add(function() {
				self.balance += r.win;
			});
			t2.start();

			var t3 = this.game.add.tween(line).to( { }, 1);
			t3.delay(2100);
			t3.onComplete.add(function() {
				self.toggleLines(false);

				if (line.win)
					line.win.visible = false;

				line.winText.visible = false;

				if(this.game.coin_stack_animation == true){
				    // coin_stack burst animation
				    self.coinStackWhite.x = self.coinStack.x;
				    self.coinStackWhite.y = self.coinStack.y;
				    self.coinStackWhite.scale.x = self.coinStack.scale.x;
				    self.coinStackWhite.scale.y = self.coinStack.scale.y;
				    self.coinStack.alpha = 0;
				    // starts
				    self.stackTween.start();
				}
			    });
			t3.start();

			this.animateWinCoins(r, line);
			this.animateTiles(r.tiles);
		}
	},

	update_GAMEOVER: function(){
		this.displayCTA();
	},

	mraid_update: function(){
		var self = this;

		if (ad_state == 'ready') {
			if (!this.timeSinceLastAction)
				this.timeSinceLastAction = new Date().getTime();

			ad_state = 'live';
		}

		if (ad_state == 'live') {

			if (this.timeSinceLastAction && cur_time > this.timeSinceLastAction + this.params.cta_on_idle_time && !this.callToAction.visible) {
				this.gameState = GS_GAMEOVER;
				return;
			}
		}
	},

  update_tilePosition: function(bar, finished) {
  	BAR_HEIGHT = (BAR_ITEMS_COUNT * BAR_ITEM_HEIGHT);

  	if (finished)
  		bar.currentValue = bar.endValue;
  	else
  		bar.currentValue = mathEx.lerp(bar.startValue, bar.endValue, mathEx.ease_inOutPowerBounce(bar.currentTime / bar.duration));

  	bar.tileY = bar.currentValue;

  	for (var i = 0; i < bar.children.length; i++) {
  		var item = bar.getAt(i);

  		item.y = (item.startY + bar.tileY) % BAR_HEIGHT;
  		item.y -= BAR_ITEM_HEIGHT / 2;
  		item.blur.y = item.y;
  		item.hl.y = item.y;

  		item.blur.alpha = mathEx.map(bar.currentSpeed, 10, 25, 0, 1, false, true, true);
  		item.alpha = 1 - item.blur.alpha;
  	}
  },

  toggleLines: function(visible) {
		this.gPaylines.forEach(function(pl) {
			pl.alpha = 1;
			pl.visible = visible;
		});
	},

	animateTiles: function(tiles) {

		for (var i = 0; i < tiles.length; i++) {
			var t = tiles[i];
			var view = this.getTileView(t.bar, t.tile);

			TweenEx.createYoyo(view, 0, 100, 50, {
				alpha: 0.7
			}, 1);
			TweenEx.createYoyo(view.scale, 0, 200, 50, {
				x: 1.35,
				y: 1.35
			}, 0);

			if (this.parent.onAnimateTiles)
				this.parent.onAnimateTiles(view);
		}
	},

	getTileView: function(bar, tile) {
		var view = null;
		this.bars.getAt(bar).forEach(function(child) {
			if (child.tile == tile) {
				view = child;
				return;
			}
		});
		return view;
	},

	animateWinCoins: function(result, line) {
		if (!this.coins) {
			this.coins = this.game.add.group();
			this.view.add(this.coins);
			for (var i = 0; i < MAX_COINS; i++) {
				var coin = imageLoader.sprite(0, 0, 'coin_1.png');
				coin.anchor.set(0.5);
				coin.kill();
				this.coins.add(coin);
			}
		}

		var self = this;

		var ix = 0;
		this.coins.forEach(function(coin) {

			var max = mathEx.map(result.win, 0, self.balance, 3, MAX_COINS, false, true, true);

			if (ix >= max)
				return;

			var p1 = ANIM_COINS_POINTS[0];
			var p2 = ANIM_COINS_POINTS[1];
			var p3 = ANIM_COINS_POINTS[2];

			p2.x += this.game.rnd.integerInRange(-50, 50);
			p2.y += this.game.rnd.integerInRange(-50, 50);

			coin.revive();
			coin.x = p1.x;
			coin.y = p1.y;
			coin.alpha = 0;

			var delay = ix * 100;

			var t0 = self.game.add.tween(coin).to({
				alpha: 1
			}, 100, "Sine.easeOut");

			var tScale = self.game.add.tween(coin.scale).to({x: [0.5, 3, 0.5],	y: [0.5, 3, 0.5]}, 800, "Sine.easeIn");
			tScale.start();

			var t;
			if (self.game.coin_stack_animation == true) {
				console.log("Coin Y: " + self.coinStack.y);
				//t = self.game.add.tween(coin).to( { x: p2.x, y: p2.y}, 800, "Sine.easeIn");
				t = self.game.add.tween(coin).to({x: 535 + COINS_SHOOT_OFFSET_X, y: 575 + COINS_SHOOT_OFFSET_Y}, 800, "Sine.easeIn");
				t.onComplete.add(function() {
					if (self.gameState == GS_READY)
						return;

					if (self.coinStack.y >= 485) {
						self.coinStack.y -= 7;
					} else {
						self.coinStack.scale.x += .02;
						self.coinStack.scale.y += .02;
					}
				});
			} else {
				t = self.game.add.tween(coin).to({x: [p2.x, p3.x], y: [p2.y, p3.y]}, 800, "Sine.easeIn");
				t.interpolation(Phaser.Math.catmullRomInterpolation);
			}
			t.delay(delay);

			var t3 = self.game.add.tween(coin).to({
				alpha: 0
			}, 100, "Sine.easeOut");

			t0.chain(t);
			t.chain(t3);

			t0.start();

			var t4 = self.game.add.tween(self.tBalance.scale).to({
				x: 1.2,
				y: 1.2
			}, 100, "Sine.easeOut");
			t4.yoyo(true, 50);
			t4.delay(800 + 650);
			t4.start();

			TweenEx.createYoyo(self.tBalance.scale, 1450, 100, 50, {x: 1.2,	y: 1.2});
			TweenEx.createYoyo(line.winText.scale, 100, 500, 50, {x: 1.5,	y: 1.5});
			ix++;
		});
	},

	displayIntro: function() {
		if (this.parent.onDisplayIntro)
			this.parent.onDisplayIntro();
	},

	destroyIntro: function() {
		if (!this.intro)
			return;

		if (this.parent.onDestroyIntro)
			this.parent.onDestroyIntro();
	},

	displayCTA: function() {
		if (this.parent.displayCTA)
			this.parent.displayCTA();
	},

	destroyCTA: function() {
		if (this.callToAction) {
			this.callToAction.removeAll();
		}

		if (this.parent.onDestroyCTA)
			this.parent.onDestroyCTA();
	},
};

TweenEx = function() {};
TweenEx.createYoyo = function(dst, delay, duration, fade, params, repeats) {
	var t = self.game.add.tween(dst).to(params, duration, "Sine.easeOut", 0, true, repeats);
	t.yoyo(true, fade);
	t.delay(delay);
	t.start();
};

var MathEx = function() {};
MathEx.prototype.lerp = function(start, end, progress) {
	return start + (end - start) * progress;
}

MathEx.prototype.map = function(num, min1, max1, min2, max2, round, constrainMin, constrainMax) {
	if (constrainMin && num < min1)

		return min2;
	if (constrainMax && num > max1)
		return max2;

	var num1 = (num - min1) / (max1 - min1);
	var num2 = (num1 * (max2 - min2)) + min2;
	if (round)
		return Math.round(num2);
	return num2;
}

MathEx.prototype.ease_linear = function(progress) {
	return progress;
}

MathEx.prototype.ease_inOutPower = function(progress, power) {
	progress *= 2;
	if (progress < 1) {
		return Math.pow(progress, power) / 2;
	} else {
		var sign = power % 2 == 0 ? -1 : 1;
		return (sign / 2.0 * (Math.pow(progress - 2, power) + sign * 2));
	}
}

// FULL RANDOM
MathEx.prototype.ease_inOutPowerBounce = function(k) {

	if (k < 0.93) {
		return Math.pow(k, 4);
	} else {
		var s = 5.70158;
		return --k * k * ((s + 1) * k + s) + 1;
	}
}

var mathEx = new MathEx();
