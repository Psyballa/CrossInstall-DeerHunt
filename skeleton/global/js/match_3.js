// HELPER FUNCTIONS
function LP(a, b) {
	return ad_orientation === 'landscape' ? a : b;
}
var DEBUG = false;
var ENABLE_PARTICLES = true;

var ENABLE_MATCH_ANIM = false;

var LEVEL_OBJECTIVE_SCORE = false;

var DEAD = -1;
var NONE = -1;
var EMPTY = -2;

var ITEM_BLUE = 0;
var ITEM_GREEN = 1;
var ITEM_ORANGE = 2;
var ITEM_RED = 3;
var ITEM_YELLOW = 4;

var ITEM_CAKE = 15;

var AT_SOLVE = 0;
var AT_OFFSET = 1;
var AT_SWAP = 2;
var AT_SWAPBACK = 3;
var AT_SPAWN = 4;
var AT_FX = 5;
var AT_SWAP_TUTORIAL = 6;

var LM_DEFAULT = 0;
var LM_STRIPE = 1;
var LM_COLOR_BOMB = 2;
var LM_EASY = 3 ;

var TILE_AUTOCOMPLETE_START_POS_OFFSET_X = 0;
var TILE_AUTOCOMPLETE_START_POS_OFFSET_Y = 0;

// LANDSCAPE
var L_FIELD_MASK_0 = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var L_FIELD_MASK_1 = [
	[0, 0, 1, 1, 1, 1, 1, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 1, 0, 0, 1, 0, 0, 1, 0]
];

var L_FIELD_MASK_2 = [
	[0, 1, 1, 1, 1, 1, 1, 1, 0],
	[1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 1, 1, 1, 0]
];

var L_FIELD_MASK_3 = [
	[1, 0, 0, 1, 1, 1, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 1, 1, 1, 0, 0, 1]
];

var L_FIELD_MASK_4 = [
	[0, 1, 0, 0, 1, 0, 0, 1, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 1, 1, 0, 1, 1, 0, 1]
];

// PORTRAIT
var P_FIELD_MASK_0 = [
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
];

var P_FIELD_MASK_1 = [
	[0, 0, 1, 1, 0, 0],
	[0, 1, 1, 1, 1, 0],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 0],
	[0, 0, 1, 1, 0, 0],
];

var P_FIELD_MASK_2 = [
	[1, 1, 0, 0, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 0],
	[0, 0, 1, 1, 0, 0],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 0],
	[0, 0, 1, 1, 0, 0],
];

var P_FIELD_MASK_3 = [
	[0, 0, 1, 1, 0, 0],
	[0, 1, 1, 1, 1, 0],
	[1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 0, 1],
	[1, 1, 1, 1, 1, 1],
	[1, 0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 0],
	[0, 0, 1, 1, 0, 0],
];

var P_FIELD_MASK_4 = [
	[0, 1, 0, 1, 0, 1],
	[1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 0],
	[0, 1, 0, 1, 0, 1],
];
var boards = LP([L_FIELD_MASK_0, L_FIELD_MASK_1, L_FIELD_MASK_2, L_FIELD_MASK_3, L_FIELD_MASK_4], [P_FIELD_MASK_0, P_FIELD_MASK_1, P_FIELD_MASK_2, P_FIELD_MASK_3, P_FIELD_MASK_4]);

Match3 = function(parent) {
	this.parent = parent;
	this.game = parent.game;
};

Match3.prototype = {
	init: function(cfg) {
		this.level = cfg;

		//---------------
		// INIT GAME
		this.gBoard = this.game.add.group();
		this.gSlice = this.game.add.group();
		this.gCorner = this.game.add.group();
		this.slice = [];

		this.drag = false;
		this.pointerDown = false;

		this.groups = [];
		this.moves = [];
		this.currentmove = {
			column1: 0,
			row1: 0,
			column2: 0,
			row2: 0
		};

		this.gamestates = {
			init: 0,
			ready: 1,
			resolve: 2
		};

		this.gamestate = this.gamestates.init;
		this.score = 0;
		this.tweenscore = 0;
		this.pending = [];
		this.pendingTypeKill = [];
		this.pendingReceipSplashes = [];
		this.animState = 0;
		this.lastAnimState = 0;
		this.animTime = 0;
		this.animTimeTotal = 0.25;
		this.gameover = false;
		this.moveCounted = false;
		this.tutorialStep = 0;
		this.scoreTweenStartTime = 0;

		// INIT Autocomplete mode
		this.inAutoCompleteMode = false;
		this.changeType = false;
		this.autoCompliteFirstRun = true;

		//INIT AutoHelp mode
		this.isFirstMove = false;
		this.startHelp = false;
		this.timerStart = false;
		this.helperTimerCountdown = this.level.helpOnTime;
		this.tileMatchPos_1 = {
			c: 0,
			r: 0,
			startX: 0,
			startY: 0
		};
		this.tileMatchPos_2 = {
			c: 0,
			r: 0,
			startX: 0,
			startY: 0
		};

    // Set scaling

    // In psome project when the board-scale don't working this parameter is set up to 1.26
    // to avoid any issuses and hardcoding we can adjust only donw scale of the board
    if(this.level.board_scale > 1)
      this.level.board_scale = 1;

    this.level.tilewidth *= this.level.board_scale;
    this.level.tileheight *= this.level.board_scale;

		// setup the field mask
		if (this.level.field_type < 0)
			this.field_mask = Phaser.ArrayUtils.getRandomItem(boards);
		else
			this.field_mask = boards[this.level.field_type];

		this.level.rows = this.field_mask.length;
		this.level.columns = this.field_mask[0].length;

		for (var i = 0; i < this.level.columns; i++) {
			this.level.tiles[i] = [];
			for (var j = 0; j < this.level.rows; j++) {
				var title = undefined;
				var view = imageLoader.sprite(0, 0, 'gem_01.png');
				view.animations.add('gem', Phaser.Animation.generateFrameNames('gem_', 1, 16, '.png', 2), 30);
				tile = {
					type: 0,
					newtype: NONE,
					offset: 0,
					offsetX: 0,
					view: view,
					falling: false,
					alpha: 1,
					is_empty: this.field_mask[j][i] == 0,
					spawnOffsetY: 0,
					pending: false
				};
				if (DEBUG) {
					tile.debug_text = game.add.text(0, 0, 'DEBUG');
					tile.debug_text.anchor.set(0.5);
					tile.debug_text.align = 'center';
					tile.debug_text.font = 'Arial Black';
					tile.debug_text.fontSize = 18;
					tile.debug_text.stroke = '#000000';
					tile.debug_text.strokeThickness = 4;
					tile.debug_text.fill = '#ffffff';
				}
				tile.view.anchor.set(0.5);
				this.level.tiles[i][j] = tile;
			}
		}
		// INIT PLAY BOARD
		this.setBackground();
		// SPLASH POOL
		// NOTE: 50 may be too much on mobiles!
		if (ENABLE_PARTICLES) {
			this.asplash = this.game.add.group();
			for (var i = 0; i < 50; i++) {
				var boom = imageLoader.sprite(0, 0, 'splash.png');
				boom.rotation = Math.random() * 360;
				boom.anchor.set(0.2);
				boom.kill();
				this.asplash.add(boom);
			}
			this.gsplash = this.game.add.group();
			for (var i = 0; i < 10; i++) {
				var boom = imageLoader.sprite(0, 0, 'gem_01.png');
				boom.animations.add('gem', Phaser.Animation.generateFrameNames('gem_', 1, 16, '.png', 2), 30);
				boom.anchor.set(0.2);
				boom.kill();
				this.gsplash.add(boom);
			}
		}
		this.lsplash = this.game.add.group();
		for (var i = 0; i < 10; i++) {
			var boom = imageLoader.sprite(0, 0, 'splashline.png');
			boom.anchor.set(0.2);
			boom.kill();
			this.lsplash.add(boom);
		}
		this.newGame();

		this.delayForMatchAnim = 0;
	},

	setBackground: function() {
		for (var i = 0; i < this.level.columns; i++) {
			for (var j = 0; j < this.level.rows; j++) {
				var tile = this.tileAt(i, j);
				if (!tile.is_empty) {
					// Set background part
					var board;
					if ((i + j) % 2) {
						board = imageLoader.sprite(this.getTilePos(i, j, 0, 0).tilex, this.getTilePos(i, j, 0, 0).tiley, 'playboard_01.png');
					} else {
						board = imageLoader.sprite(this.getTilePos(i, j, 0, 0).tilex, this.getTilePos(i, j, 0, 0).tiley, 'playboard_02.png');
					}
					board.anchor.set(0.5);
					board.scale.set(1.25 * this.level.board_scale);
					board.alpha = 0.75;
					this.gBoard.add(board);

					// Set slice part
					var neighbor = this.checkNeighbor(i, j);

					if (!neighbor.top)
						this.drawSlice('playboard_04.png', i, j, (Math.PI / 2), 0, -50, this.gSlice);

					if (!neighbor.bottom)
						this.drawSlice('playboard_04.png', i, j, (-Math.PI / 2), 0, 50, this.gSlice);

					if (!neighbor.left)
						this.drawSlice('playboard_04.png', i, j, 0, -50, 0, this.gSlice);

					if (!neighbor.right)
						this.drawSlice('playboard_04.png', i, j, Math.PI, 50, 0, this.gSlice);

					//Set corners
					if (!neighbor.top && !neighbor.left)
						this.drawSlice('playboard_03.png', i, j, 0, -49, -49, this.gCorner);

					if (!neighbor.top && !neighbor.right)
						this.drawSlice('playboard_03.png', i, j, (Math.PI / 2), 49, -49, this.gCorner);

					if (!neighbor.bottom && !neighbor.left)
						this.drawSlice('playboard_03.png', i, j, (-Math.PI / 2), -49, 49, this.gCorner);

					if (!neighbor.bottom && !neighbor.right)
						this.drawSlice('playboard_03.png', i, j, Math.PI, 49, 49, this.gCorner);

					if (neighbor.top_left)
						this.drawSlice('playboard_05.png', i, j, 0, -50, -50, this.gCorner);

					if (neighbor.top_right)
						this.drawSlice('playboard_05.png', i, j, -Math.PI / 2, 50, -50, this.gCorner);

					if (neighbor.bottom_left)
						this.drawSlice('playboard_05.png', i, j, Math.PI / 2, -50, 50, this.gCorner);

					if (neighbor.bottom_right)
						this.drawSlice('playboard_05.png', i, j, -Math.PI, 50, 50, this.gCorner);
				}
			}
		}
	},

	drawSlice: function(img_name, tileColumn, tileRow, rotation, offsetX, offsetY, group) {
		var position = this.getTilePos(tileColumn, tileRow, 0, 0);
		var slice = imageLoader.sprite(position.tilex + offsetX* this.level.board_scale, position.tiley + offsetY* this.level.board_scale, img_name);
		slice.anchor.set(0.5);
		slice.scale.set(1.25 * this.level.board_scale);
		slice.rotation = rotation;
		group.add(slice);
	},

	newGame: function() {
		this.score = 0;
		this.pendingTypeKill = [];
		this.gamestate = this.gamestates.ready;
		this.gameover = false;
		this.createLevel();
		this.findMoves();
		this.findgroups();
	},

	receipesLeft: function() {
		var left = 0;
		for (var i = 0; i < this.level.receipes.length; i++)
			left += this.level.receipes[i].left;
		return left;
	},

	changeTile: function(newType, add) {
		if (!this.level.selectedtile)
			return;

		if (!this.level.selectedtile.selected)
			return;

		if (newType == -1 && add) {
			return;
		}

		this.level.selectedtile.selected = false;

		var tile = this.level.tiles[this.mt.x][this.mt.y];

		if (add)
			tile.type = tile.type + newType;
		else
			tile.type = newType;

		this.findMoves();
		this.findgroups();

		this.setAnimState(AT_SWAP);
		this.gamestate = this.gamestates.resolve;
	},

	createLevel: function() {
	var self = this;
	var done = false;
	while (!done) {

	if (this.level.mode == LM_EASY) {
		this.type_1 = utils.random(0, 4);
		this.type_2 = this.getRandomExcept(0, 4, this.type_1);
		this.forEachTile(function(tile, x, y) {
			if (utils.random(0, 1) == 0)
	  		tile.type = self.type_1;
			else {
				tile.type = self.type_2;
			} //self.getRandomTile();
			console.log('random');
			});
		} else if (this.level.mode == LM_COLOR_BOMB) {
			this.forEachTile(function(tile, x, y) {
			tile.type = ITEM_CAKE; //self.getRandomTile();
			console.log('random');
			});
		} else {
			this.forEachTile(function(tile, x, y) {
				tile.type = self.getRandomTile();
			});
		}
		if (this.level.mode != LM_COLOR_BOMB && this.level.mode != LM_EASY)
			this.resolvegroups();

    this.findMoves();
		if (this.moves.length > 0)
			done = true;
	}

	if (!LEVEL_OBJECTIVE_SCORE) {
			if (this.parent.generateRandomReceipe)
				this.parent.generateRandomReceipe();
			else
				this.generateRandomReceipe();
		}

},

	createReceipViewItem: function(type, amount) {

		var gem = imageLoader.sprite(0, 0, 'gem_01.png');
		gem.animations.add('gem', Phaser.Animation.generateFrameNames('gem_', 1, 16, '.png', 2), 30);
		gem.anchor.set(0.5);
		gem.x = (gem.width / 2);
		gem.y = (gem.height / 2);
		gem.frameName = this.getGemFrameName(type);

		var text = this.game.add.bitmapText(50, 50, 'fmain', amount.toString(), 28);
		text.anchor.set(0.5);

		var check = imageLoader.sprite(30, 25, 'check.png');
		check.visible = false;

		return {
			view: gem,
			text: text,
			check: check
		};
	},

	kill: function(target, time) {
		setTimeout(function() {
			target.kill();
		}, time);
	},

	forEachTile: function(func) {
		for (var i = 0; i < this.level.columns; i++)
			for (var j = 0; j < this.level.rows; j++) {
				// return only filled tiles
				if (!this.level.tiles[i][j].is_empty)
					func(this.level.tiles[i][j], i, j);
			}
	},

	generateRandomReceipe: function() {
		this.level.receipes = [];

    console.log(ad_name);

		var am1 = this.game.rnd.integerInRange(5, 20);
		var am2 = this.game.rnd.integerInRange(10, 20);

		var r1 = this.game.rnd.integerInRange(0, 4);
		var r2 = this.getRandomExcept(0, 4, r1);

		var v1 = this.createReceipViewItem(r1, am1);
		var v2 = this.createReceipViewItem(r2, am2);
		this.level.receipes.push({
			type: r1,
			amount: am1,
			left: am1,
			view: v1.view,
			viewText: v1.text,
			viewCheck: v1.check
		});
		this.level.receipes.push({
			type: r2,
			amount: am2,
			left: am2,
			view: v2.view,
			viewText: v2.text,
			viewCheck: v2.check
		});
	},

	lerp: function(a, b, t) {
		return a + t * (b - a)
	},

	hermite: function(start, end, value) {
		return this.lerp(start, end, value * value * (3.0 - 2.0 * value));
	},

	sinerp: function(start, end, value) {
		return this.lerp(start, end, Math.sin(value * Math.PI * 0.5));
	},

	state_solve: function(dt) {
		if (this.animTime > 0.01) {
			this.findgroups();

			if (this.moveCounted && this.level.movesLeft > 0) {
				this.level.movesLeft--;
				this.moveCounted = false;
			}

			if (this.groups.length > 0) {
				for (var i = 0; i < this.groups.length; i++) {
					this.score += 10 * (this.groups[i].length - 1);
					this.scoreTweenStartTime = this.game.time.now;
				}

				this.removeGroups(false);
				this.renderPendingEffects();

				this.lastAnimState = this.animState;
				this.animState = AT_OFFSET;
			} else {
				this.gamestate = this.gamestates.ready;
			}
			this.animTime = 0;
		}
	},

	state_offset: function(dt) {
		if (this.animTime - this.delayForMatchAnim / 2 > this.animTimeTotal + this.delayForMatchAnim / 2) {
			this.delayForMatchAnim = 0;

			var totalNew = this.offsetTiles(false);

			if (totalNew > 0) {
				this.setAnimState(AT_SPAWN);
				return;
			} else {
				this.setAnimState(AT_SOLVE);
				this.findgroups();

				if (this.groups.length <= 0)
					this.gamestate = this.gamestates.ready;
			}
		}
	},

	state_swap: function(dt) {
		if (this.animTime > this.animTimeTotal) {
			this.swap(this.currentmove.column1, this.currentmove.row1, this.currentmove.column2, this.currentmove.row2);

			var t1 = this.level.tiles[this.currentmove.column1][this.currentmove.row1];
			var t2 = this.level.tiles[this.currentmove.column2][this.currentmove.row2];

			if ((t1.type == ITEM_CAKE || t2.type == ITEM_CAKE) && (t1.type < 5 || t2.type < 5)) {
				if (t1.type == ITEM_CAKE) {
					this.killType(t2.type);
					t1.type = DEAD;
				} else {
					this.killType(t1.type);
					t2.type = DEAD;
				}

				this.findMoves();
				this.findgroups();
				this.removeGroups();
				this.setAnimState(AT_OFFSET);
				this.gamestate = this.gamestates.resolve;
				return;
			} else if (t1.type >= 5 && t2.type >= 5) {
				// check 5-14 types items mathing
				// if 5-14 tuype match with cacke - kill 3 rows and 3 columns elese kill only 1 row and 1 column
				if (t1.type == ITEM_CAKE) {
					if (this.currentmove.row1 > 0)
						this.killRow(this.currentmove.row1 - 1, false);

					this.killRow(this.currentmove.row1, false);

					if (this.currentmove.row1 < this.level.rows - 1)
						this.killRow(this.currentmove.row1 + 1, false);

					if (this.currentmove.column1 > 0)
						this.killColumn(this.currentmove.column1 - 1, false);

					this.killColumn(this.currentmove.column1, false);

					if (this.currentmove.column1 < this.level.columns - 1)
						this.killColumn(this.currentmove.column1 + 1, false);

				} else if (t2.type == ITEM_CAKE) {
					if (this.currentmove.row2 > 0)
						this.killRow(this.currentmove.row2 - 1, false);

					this.killRow(this.currentmove.row2, false);

					if (this.currentmove.row2 < this.level.rows - 1)
						this.killRow(this.currentmove.row2 + 1, false);

					if (this.currentmove.column2 > 0)
						this.killColumn(this.currentmove.column2 - 1, false);

					this.killColumn(this.currentmove.column2, false);

					if (this.currentmove.column2 < this.level.columns - 1)
						this.killColumn(this.currentmove.column2 + 1, false);

				} else {
					this.killRow(this.currentmove.row1, false);
					this.killColumn(this.currentmove.column1, false);
				}

				this.findMoves();
				this.findgroups();
				this.removeGroups();
				this.setAnimState(AT_OFFSET);

				this.renderPendingEffects();

				this.gamestate = this.gamestates.resolve;
				return;
			}

			this.findgroups();
			if (this.groups.length > 0) {
				this.setAnimState(AT_SOLVE);
				this.gamestate = this.gamestates.resolve;
			} else {
				this.setAnimState(AT_SWAPBACK);
			}

			this.findMoves();
			this.findgroups();
		}
	},

	state_swapback: function(dt) {
		if (this.animTime > this.animTimeTotal) {
			this.swap(this.currentmove.column1, this.currentmove.row1, this.currentmove.column2, this.currentmove.row2);
			this.gamestate = this.gamestates.ready;
		}
	},

	onInputMove: function() {
		if (this.gameover)
			return;
		if (this.inAutoCompleteMode)
			return;
		if (!this.pointerDown)
			return;

		if (this.drag && this.level.selectedtile.selected) {
			this.mt = this.getMouseTile({
				x: this.game.input.x,
				y: this.game.input.y
			});
			if (this.mt.valid)
				if (this.canSwap(this.mt.x, this.mt.y, this.level.selectedtile.column, this.level.selectedtile.row))
					this.mouseSwap(this.mt.x, this.mt.y, this.level.selectedtile.column, this.level.selectedtile.row);
		}
	},

	processTutorial: function() {
		if (!this.level.tutorial_enabled)
			return;

		var self = this;
		if (this.tutorialStep == 0) {
			this.gtutorial.tutorial_overlay.turn_off.start();
			this.tutorialStep++;


      if (this.parent.initTutorialStep2)
        this.parent.initTutorialStep2(this.tutorial_strings)
      else
			  this.initTutorialStep2(this.tutorial_strings);

			setTimeout(function() {
				self.tutorialStep++;
				self.destroyTutorial();
			}, 4000);
		}
	},

	mouseSwap: function(c1, r1, c2, r2) {
		this.processTutorial();

    // stop AutoHelp swipe mode if player swap the tiles
		if (this.startHelp)
			this.stopTilesTweenMoves();

		this.currentmove = {
			column1: c1,
			row1: r1,
			column2: c2,
			row2: r2
		};

		this.level.selectedtile.selected = false;
		this.moveCounted = true;

		this.setAnimState(AT_SWAP);
		this.gamestate = this.gamestates.resolve;
	},

	onInputUp: function() {
		this.pointerDown = false;
	},

	onInputDown: function() {
		if (this.gameover)
			return;

		this.pointerDown = true;
		this.timeSinceLastAction = new Date().getTime();

		wrapper_mark_interaction();

		if (this.gamestate != this.gamestates.ready)
			return;

		var pos = {
			x: this.game.input.x,
			y: this.game.input.y
		};

		if (!this.drag) {
			this.mt = this.getMouseTile(pos);

			if (this.mt.valid) {
				var swapped = false;
				if (this.level.selectedtile.selected) {
					if (this.mt.x == this.level.selectedtile.column && this.mt.y == this.level.selectedtile.row) {
						this.level.selectedtile.selected = false;
						this.drag = true;
						return;
					} else if (this.canSwap(this.mt.x, this.mt.y, this.level.selectedtile.column, this.level.selectedtile.row)) {
						this.mouseSwap(this.mt.x, this.mt.y, this.level.selectedtile.column, this.level.selectedtile.row);
						swapped = true;
					}
				}
				if (!swapped) {
					this.level.selectedtile.column = this.mt.x;
					this.level.selectedtile.row = this.mt.y;
					this.level.selectedtile.selected = true;
				}
			} else {
				this.level.selectedtile.selected = false;
			}
			this.drag = true;
		}
	},

	movesAutocomplete: function() {
		// Show the bravo logo when the firs loop run
		var self = this;
		if (this.autoCompliteFirstRun) {

    // init cta after 1second after autocomplete is started
      setTimeout(function() {
        self.gameover = true;
      }, 5000);

      var bt;
      if(this.parent.bravoLogoShow)
      {
        bt = this.parent.bravoLogoShow();
      }
      else
      {
        bt = this.bravoLogoShow();
      }

			bt.onComplete.add(function() {
				this.autoMoveTiles();
			}, this);
			this.autoCompliteFirstRun = false;
		} else {
			this.autoMoveTiles()
		}
	},

	autoMoveTiles: function() {
		var self = this;
		// check for the end of the game by last moves count
		if (this.gamestate == this.gamestates.ready) {
			if (this.level.movesLeft <= 0) {
				this.gameover = true;
			}
		}

		this.changeType = true;

		//get random tile for replacing to the Cake type
		var rnd = this.getRandomTilePos();
		//get random neightbor empty tile for swipe
		var rnd_m = this.getRandomTileMatchPos(rnd.x, rnd.y);
		var tile = this.level.tiles[rnd.x][rnd.y];

		// meke tile appear effect from the moves panel
		var twn_alpha_1 = this.game.add.tween(tile)
			.to({
				alpha: 0
			}, 200, Phaser.Easing.Sinusoidal.InOut, true);
		twn_alpha_1.start();

		var twn_scale_1 = this.game.add.tween(tile.view.scale)
			.to({
				x: 0,
				y: 0,
			}, 200, Phaser.Easing.Sinusoidal.InOut, true);
		twn_scale_1.start();

		twn_scale_1.onComplete.add(function() {
			tile.type = ITEM_CAKE;
			var tileX = tile.view.x;
			var tileY = tile.view.y;
			tile.view.x = LP(150, 580) + TILE_AUTOCOMPLETE_START_POS_OFFSET_X;
			tile.view.y = LP(600, 210) + TILE_AUTOCOMPLETE_START_POS_OFFSET_Y;



			var twn_alpha_2 = this.game.add.tween(tile)
				.to({
					alpha: 1
				}, 50, Phaser.Easing.Sinusoidal.InOut, true);
			twn_alpha_2.start();

			var twn_scale_2 = this.game.add.tween(tile.view.scale)
				.to({
					x: 1,
					y: 1
				}, 200, Phaser.Easing.Sinusoidal.InOut, true);
			twn_scale_2.start();

			var twn_move = this.game.add.tween(tile.view)
				.to({
					x: [tile.view.x, tile.view.x + (tileX - tile.view.x) / 2, tileX],
					y: [tile.view.y, tileY - 200, tileY],
				}, 400, "Sine.easeInOut", true);

			twn_move.interpolation(Phaser.Math.linearInterpolation);
			twn_move.start();
			twn_move.onComplete.add(function() {
				self.changeType = false;
				// when effect is done the mouseSwap function is calling
				self.mouseSwap(rnd.x, rnd.y, rnd_m.x, rnd_m.y);
			}, this);
		});
	},

	gameUpdate: function() {


		//check if there are left moves when the reciepe is completed and automatically ends the game
		if (!LEVEL_OBJECTIVE_SCORE && this.receipesLeft() == 0 && this.gamestate == this.gamestates.ready && this.level.movesLeft > 0 && !this.changeType) {
			this.inAutoCompleteMode = true;
			this.animTimeTotal = 0.15;
			this.movesAutocomplete();
		}
		if (LEVEL_OBJECTIVE_SCORE && this.score >= this.level.scoreToGet && this.gamestate == this.gamestates.ready && this.level.movesLeft > 0 && !this.changeType) {
			this.inAutoCompleteMode = true;
			this.animTimeTotal = 0.15;
			this.movesAutocomplete();
		}

		if (this.gameover) {
      // set CTA on the top to cover the row and colum kill effects
      this.game.world.bringToTop(this.callToAction);
			if (!this.callToAction.visible) {
				genlog("funnel", "won");
				this.endScreen();
			}
		}
		this.helpTimerUpdate();
		this.onInputMove();

		var dt = this.game.time.elapsed / 1000;

		if (this.tweenscore < this.score)
			this.tweenscore = this.sinerp(this.tweenscore, this.score, dt * 5) + 1;
		// console.log(this)
		if (this && this.tScore)
			this.tScore.text = ~~this.tweenscore;

		if (this.gamestate == this.gamestates.ready) {
			if (this.moves.length <= 0 || this.level.movesLeft == 0 && !this.inAutoCompleteMode)
				this.gameover = true;
		} else if (this.gamestate == this.gamestates.resolve) {
			this.animTime += dt;

			if (this.animState == AT_SOLVE) {
				this.state_solve(dt);
			} else if (this.animState == AT_OFFSET) {
				this.state_offset(dt);
			} else if (this.animState == AT_SWAP) { /* swap */
				this.state_swap(dt);
			} else if (this.animState == AT_SWAPBACK) { /* swap back */
				this.state_swapback(dt);
			} else if (this.animState == AT_SPAWN) { /* basic respawn */
				this.state_spawn(dt);
			} else if (this.animState == AT_FX) { /* upgrades  respawn */
				this.renderPendingEffects();
				this.setAnimState(AT_OFFSET);
			}
			this.findMoves();
			this.findgroups();
		}
		if (!this.pointerDown)
			this.drag = false;
	},

	helpTimerUpdate: function() {
		// start to swap two matched tiles when player don't make any moves for a some time
		var self = this;

		if (this.timerStart == false) {
			this.game.time.create(false);
			this.timerStart = true;
			game.time.events.loop(Phaser.Timer.SECOND, function() {
				if (!self.startHelp && !self.inTutorial && !self.gameover && !this.inAutoCompleteMode && self.gamestate == self.gamestates.ready) {
					if (self.helperTimerCountdown > 0)
						self.helperTimerCountdown -= 1;
					else {
						self.findMoves();
						var move = self.moves[0];
						self.tileMatchPos_1.c = move.column1;
						self.tileMatchPos_1.r = move.row1;
						self.tileMatchPos_2.c = move.column2;
						self.tileMatchPos_2.r = move.row2;
						self.startTilesTweenMove();
					}
				} else {
					self.helperTimerCountdown = self.level.helpOnTime;
				}
			});
		}
	},

	state_spawn: function(dt) {
		var self = this;
		this.forEachTile(function(tile, x, y) {
			if (tile.alpha < 1)
				tile.alpha = self.animTime / self.animTimeTotal;
		});
		if (this.animTime > this.animTimeTotal) {
			this.forEachTile(function(tile, x, y) {
				tile.alpha = 1;
				tile.spawnOffsetY = 0;
			});
			this.setAnimState(AT_OFFSET);
		}
	},

	initTutorial: function() {
		var gTut = this.game.add.group();
		var hand = imageLoader.sprite(0, 0, 'hand.png');
		hand.anchor.set(0.3, 0);
		hand.scale.set(1.2);
    hand.visible = false;
		gTut.add(hand);
		this.inTutorial = true;
		this.findMoves();

		var move = this.moves[0];
		if (ad_orientation == 'portrait') {
			// but see if we can find a better move, something in the 3rd row
			for (var i = 0; i < this.moves.length; i++) {
				if (this.moves[i].row1 == 2) {
					move = this.moves[i];
					break;
				}
			}
		}

		if (this.level.mode == LM_STRIPE) {
			var old = this.level.tiles[move.column1][move.row1].type;
			this.level.tiles[move.column1][move.row1].type = old + 5;

			old = this.level.tiles[move.column2][move.row2].type;
			this.level.tiles[move.column2][move.row2].type = old + 5;
		}

		var c1 = this.getTilePos(move.column1, move.row1, 0, 0);
		var c2 = this.getTilePos(move.column2, move.row2, 0, 0);

		var tile_1 = this.tileAt(move.column1, move.row1);
		var tile_2 = this.tileAt(move.column2, move.row2);

		hand.x = c1.tilex;
		hand.y = c1.tiley;

    //init the start tilese positions for match help mode and start tween effects
		this.tileMatchPos_1.c = move.column1;
		this.tileMatchPos_1.r = move.row1;
		this.tileMatchPos_2.c = move.column2;
		this.tileMatchPos_2.r = move.row2;

		this.tileMatchPos_1.view = tile_1.view;
		this.tileMatchPos_2.view = tile_2.view;
    // the firs move variable makes able player to match only two tiles that are showed in helps
		this.isFirstMove = true;
		this.startTilesTweenMove();

		var t = this.game.add.tween(hand)
			.to({
				x: c2.tilex,
				y: c2.tiley
			}, 700, Phaser.Easing.Sinusoidal.Out, true, 300, 2500, true)
			.loop(true);
		t.start();

		gTut.thand = t;

		var text1 = imageLoader.sprite(0, 0, 'tut_text1.png');
		text1.anchor.set(0.5);
		text1.scale.set(2);
		text1.x = this.game.world.centerX;
		text1.y = this.game.world.centerY + gameHeight / 4;
		this.game.add.tween(text1.scale).to({
			x: 1.8,
			y: 1.8
		}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
		gTut.add(text1);

		if (this.tutorial_strings && this.tutorial_strings[0]) {
			var text_string1 = this.game.add.bitmapText(0, 0, 'fmain', this.tutorial_strings[0], 85);
			text_string1.anchor.set(0.5);
			text_string1.scale.set(1.2);
			text_string1.x = text1.x;
			text_string1.y = text1.y - 30;
			this.game.add.tween(text_string1.scale).to({
				x: 1.0,
				y: 1.0
			}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
			gTut.add(text_string1);
		}

		var tutorial_overlay = utils.highlightRegion(this.game, c1.tilex, c1.tiley, 320);
		tutorial_overlay.alpha = 0;
		tutorial_overlay.turn_on = this.game.add.tween(tutorial_overlay)
			.to({
				alpha: 0.6
			}, 600);
		tutorial_overlay.turn_on.start();
		tutorial_overlay.turn_off = this.game.add.tween(tutorial_overlay)
			.to({
				alpha: 0
			}, 200);

		gTut.tutorial_overlay = tutorial_overlay;
		this.gtutorial = gTut;
		this.game.world.bringToTop(this.gtutorial);
	},

	startTilesTweenMove: function() {
    // get to mathing tiles positions and swap them by using tweens
		this.startHelp = true;

		var c1 = this.getTilePos(this.tileMatchPos_1.c, this.tileMatchPos_1.r, 0, 0);
		var c2 = this.getTilePos(this.tileMatchPos_2.c, this.tileMatchPos_2.r, 0, 0);

		var tile_1 = this.tileAt(this.tileMatchPos_1.c, this.tileMatchPos_1.r);
		var tile_2 = this.tileAt(this.tileMatchPos_2.c, this.tileMatchPos_2.r);

		this.tileMatchPos_1.startX = c1.tilex;
		this.tileMatchPos_1.startY = c1.tiley;
		this.tileMatchPos_2.startX = c2.tilex;
		this.tileMatchPos_2.startY = c2.tiley;

		tile_1.view.position.x = c1.tilex;
		tile_1.view.position.y = c1.tiley;
		tile_2.view.position.x = c2.tilex;
		tile_2.view.position.y = c2.tiley;

		this.t1 = this.game.add.tween(tile_1.view)
			.to({
				x: c2.tilex,
				y: c2.tiley
			}, 700, Phaser.Easing.Sinusoidal.Out, true, 0, -1, true);

		this.t2 = this.game.add.tween(tile_2.view)
			.to({
				x: c1.tilex,
				y: c1.tiley
			}, 700, Phaser.Easing.Sinusoidal.Out, true, 0, -1, true);
	},

	stopTilesTweenMoves: function() {

    // finish swapping tiles by stopping previouse tweens
    // starting a short back to the start position tween and then remove it
		this.startHelp = false;
		var self = this;

		var c1 = this.getTilePos(this.tileMatchPos_1.c, this.tileMatchPos_1.r, 0, 0);
		var c2 = this.getTilePos(this.tileMatchPos_2.c, this.tileMatchPos_2.r, 0, 0);

		var tile_1 = this.tileAt(this.tileMatchPos_1.c, this.tileMatchPos_1.r);
		var tile_2 = this.tileAt(this.tileMatchPos_2.c, this.tileMatchPos_2.r);
		this.t1.stop();
		this.t2.stop();

		this.t1 = this.game.add.tween(tile_1.view)
			.to({
				x: this.tileMatchPos_1.startX,
				y: this.tileMatchPos_1.startY
			}, 100, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);

		this.t2 = this.game.add.tween(tile_2.view)
			.to({
				x: this.tileMatchPos_2.startX,
				y: this.tileMatchPos_2.startY
			}, 100, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);

		this.t1.onComplete.add(function() {
			self.game.tweens.remove(self.t1);
		}, this);
		this.t2.onComplete.add(function() {
			self.game.tweens.remove(self.t2);
		}, this);

		if (!this.isFirstMove)
			this.helperTimerCountdown = this.level.helpOnTime;
	},

	initTutorialStep2: function() {
		var self = this;
		this.gtutorial.removeAll();

		var v = this.level.receipes[0].view;
		var rec = this.level.receipes[0].view.world;

		var tutorial_overlay = utils.highlightRegion(this.game, rec.x + v.width - 20, rec.y, 160);
		tutorial_overlay.alpha = 0;
		tutorial_overlay.turn_on = this.game.add.tween(tutorial_overlay)
			.to({
				alpha: .6
			}, 600);
		tutorial_overlay.turn_on.start();
		tutorial_overlay.turn_off = this.game.add.tween(tutorial_overlay)
			.to({
				alpha: 0
			}, 200);
		tutorial_overlay.turn_off.onComplete.add(function() {
			if (self.gtutorial) {
				self.gtutorial.destroy();
				self.gtutorial = null;
			}
		});

		var text1 = imageLoader.sprite(0, 0, 'tut_text2.png');
		text1.anchor.set(0.5);
		text1.scale.set(2);
		text1.x = this.game.world.centerX;
		text1.y = 330;
		if (ad_orientation == 'landscape') {
			text1.x = 400;
			text1.y = 550;
		}
		this.game.add.tween(text1.scale).to({
			x: 1.8,
			y: 1.8
		}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
		this.gtutorial.add(text1);

		if (this.tutorial_strings && this.tutorial_strings[1]) {
			var text_string1 = this.game.add.bitmapText(0, 0, 'fmain', this.tutorial_strings[1], 85);
			text_string1.anchor.set(0.5);
			text_string1.scale.set(1.2);
			text_string1.x = text1.x;
			text_string1.y = text1.y - 30;
			this.game.add.tween(text_string1.scale).to({
				x: 1.0,
				y: 1.0
			}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
			this.gtutorial.add(text_string1);
		}

		this.gtutorial.tutorial_overlay = tutorial_overlay;
		this.game.world.bringToTop(this.gtutorial);
	},

	destroyTutorial: function() {
		if (this.gtutorial) {
			this.inTutorial = false;
			this.gtutorial.tutorial_overlay.turn_off.start();
		}
		wrapper_mark_interaction();
	},

	endScreen: function() {
		if (this.callToAction.visible)
			return;

		var self = this;
		self.destroyTutorial(); // in case it's still showing
		if (this.autoCompliteFirstRun) {
      if(this.parent.bravoLogoShow)
      {
        bt = this.parent.bravoLogoShow();
      }
      else
      {
        bt = this.bravoLogoShow();
      }

		}

		var background_overlay = this.game.add.graphics(0, 0);
		background_overlay.beginFill(0x000000, 1);
		background_overlay.drawRect(0, 0, this.game.width, this.game.height);
		background_overlay.alpha = 0;
		background_overlay.endFill();
		background_overlay.inputEnabled = true;
		background_overlay.events.onInputDown.add(function() {
			wrapper_click_go();
		});

		var t = this.game.add.tween(background_overlay)
			.to({
				alpha: 0.7
			}, 500, Phaser.Easing.Sinusoidal.InOut);
		t.delay(1500);
		t.start();

		this.callToAction.star1.scale.set(0);
		this.callToAction.star2.scale.set(0);
		this.callToAction.star3.scale.set(0);

		this.emitter = game.add.emitter(game.world.centerX, -25, 200);
		this.emitter.makeParticles('assets', ['confetti_1.png', 'confetti_2.png', 'confetti_3.png', 'confetti_4.png', 'confetti_5.png']);
		this.emitter.minParticleScale = 0.5;
		this.emitter.maxParticleScale = 2;
		this.emitter.gravity = 550;
		//this.emitter.start(false, 5000, 20);

		this.game.world.bringToTop(this.callToAction);
		this.callToAction.visible = true;

		this.game.add.tween(this.callToAction.star1.scale)
			.to({
				x: 1,
				y: 1
			}, 150, Phaser.Easing.Bounce.InOut)
			.delay(1500)
			.start();

		this.game.add.tween(this.callToAction.star2.scale)
			.to({
				x: 1.2,
				y: 1.2
			}, 150, Phaser.Easing.Bounce.InOut)
			.delay(1800)
			.start();

		this.game.add.tween(this.callToAction.star3.scale)
			.to({
				x: 1,
				y: 1
			}, 150, Phaser.Easing.Bounce.InOut)
			.delay(2200)
			.start();

		var oldy = this.callToAction.y;
		this.callToAction.y = this.world.height + this.callToAction.height;

		var t2 = this.game.add.tween(this.callToAction)
			.to({
				y: oldy
			}, 500, Phaser.Easing.Back.InOut);
		t2.delay(800);
		t2.onComplete.add(function() {
			wrapper_mark_cta();
		});
		t2.start();
	},

	bravoLogoShow: function() {
		// Init and show Bravo Logo, that used in the end game or before autocomple tiles mode
		var bravo = imageLoader.sprite(this.game.world.centerX, this.game.world.centerY, 'bravo.png');
		bravo.anchor.set(0.5);
		bravo.alpha = 0;

		this.game.add.tween(bravo)
			.to({
				alpha: 1
			}, 150, Phaser.Easing.Bounce.InOut)
			.delay(200)
			.start();
		this.game.add.tween(bravo.scale)
			.to({
				x: 2,
				y: 2
			}, 150, Phaser.Easing.Bounce.InOut)
			.delay(200)
			.start();
		this.game.add.tween(bravo)
			.to({
				y: bravo.y - 200,
			}, 500)
			.delay(1600)
			.start();

		var bravoTween = this.game.add.tween(bravo)
			.to({
				alpha: 0,
			}, 500);
		bravoTween.delay(1800);
		bravoTween.start();

		return bravoTween;
	},

	renderPendingEffects: function() {
		if (this.pending.length == 0)
			return;

		this.game.world.bringToTop(this.lsplash);

		for (var i = 0; i < this.pending.length; i++) {
			var p = this.pending[i];
			if (p.type == 0) { /* horizontal */
				var s = this.lsplash.getFirstDead();
				if (s) {
					var coord = this.getTilePos(p.column, p.row, 0, 0);

					s.revive();
					s.anchor.set(0.5);
					s.alpha = 1;
					s.scale.set(1 * this.level.board_scale);
					s.x = coord.tilex;
					s.y = coord.tiley;

					var ts1 = this.game.add.tween(s.scale)
						.to({
							x: 50 * this.level.board_scale,
							y: 1 * this.level.board_scale
						}, 850)
						.start();
					var ts2 = this.game.add.tween(s)
						.to({
							alpha: 0
						}, 405)
						.delay(150)
						.start();
					this.kill(s, 775);
				}
			} else if (p.type == 1) { /* vertical */
				if (ENABLE_PARTICLES) {
					var s = this.lsplash.getFirstDead();
					if (s) {
						var coord = this.getTilePos(p.column, p.row, 0, 0);

						s.revive();
						s.anchor.set(0.5);
						s.alpha = 1;
						s.scale.set(1 * this.level.board_scale);
						s.x = coord.tilex;
						s.y = coord.tiley;
						s.rotation = Math.PI / 2;

						var ts1 = this.game.add.tween(s.scale)
							.to({
								x: 50 * this.level.board_scale,
								y: 1 * this.level.board_scale
							}, 850)
							.start();
						var ts2 = this.game.add.tween(s)
							.to({
								alpha: 0
							}, 405)
							.delay(150)
							.start();

						this.kill(s, 775);
					}
				}
			}
		}
		this.pending = [];
	},

	setAnimState: function(state) {
		this.lastAnimState = this.animState;
		this.animState = state;
		this.animTime = 0;
	},

	getMouseTile: function(pos) {
		var tx = Math.floor((pos.x - this.level.x + (this.level.tilewidth / 2)) / this.level.tilewidth);
		var ty = Math.floor((pos.y - this.level.y + (this.level.tileheight / 2)) / this.level.tileheight);

		// Chek if tile was clicked
		if ((tx >= 0 && tx < this.level.columns && ty >= 0 && ty < this.level.rows) && (!this.tileAt(tx, ty).is_empty))
			return {
				valid: true,
				x: tx,
				y: ty
			};
		return {
			valid: false,
			x: 0,
			y: 0
		};
	},

	getRandomExcept: function(min, max, except) {
		var r = this.game.rnd.integerInRange(min, max);
		if (r == except)
			return this.getRandomExcept(min, max, except);
		return r;
	},

	getRandomTilePos: function() {
		// get random exist tile position
		var c = 0;
		var r = 0;
		do {
			c = this.game.rnd.integerInRange(0, this.level.columns - 1);
			r = this.game.rnd.integerInRange(0, this.level.rows - 1);

		} while (this.tileAt(c, r).is_empty);

		return {
			x: c,
			y: r
		};
	},

	getRandomTileMatchPos: function(x, y) {
		// get random neightbour mathing tile position
		var rand = 1;
		var c = 0;
		var r = 0;

		do {
			rand = this.game.rnd.integerInRange(1, 4);
			switch (rand) {
				case 1:
					c = x - 1;
					r = y;
					break;
				case 2:
					c = x + 1;
					r = y;
					break;
				case 3:
					c = x;
					r = y + 1;
					break;
				case 4:
					c = x;
					r = y - 1;
			}
		} while (c < 0 || c >= this.level.columns || r < 0 || r >= this.level.rows || this.tileAt(c, r).is_empty);

		return {
			x: c,
			y: r
		};
	},

	getWeightedRandomItem: function(list, weight) {
		var totalWeight = weight.reduce(function(prev, cur, i, arr) {
			return prev + cur;
		});

		var choice = this.game.rnd.integerInRange(0, totalWeight);
		var sum = 0;

		for (var i = 0; i < list.length; i++) {
			for (var j = 0; j < weight[i] + sum; j++) {
				if (j >= choice)
					return list[i];
			}
			sum += weight[i];
		}
		return list[0];
	},

	getRandomTile: function() {
		var weight = [this.level.normalTileChange, this.level.stripeTileChange, this.level.stripeTileChange];

		var r = this.getWeightedRandomItem([0, 1, 2], weight);

		switch (r) {
			case 0:
				return Math.floor(Math.random() * 5);
			case 1:
				return Math.floor(Math.random() * 5) + 5;
			case 2:
				return ITEM_CAKE;
			default:
				return Math.floor(Math.random() * 5);
		}
	},

	getGemFrameName: function(type) {
		return 'gem_' + (type + 1)
			.toString()
			.lpad('0', 2) + '.png';
	},

	resolvegroups: function() {
		this.findgroups();
		while (this.groups.length > 0) {
			this.removeGroups(true);
			this.offsetTiles(true);
			this.findgroups();
		}
	},

	checkTypes: function(a, b) {

		if (a == b)
			return true;

		if (a + 5 == b)
			return true;

		if (a + 10 == b)
			return true;

		if (b + 5 == a)
			return true;

		if (b + 10 == a)
			return true;

		if (a + 5 == b + 5)
			return true;

		if (a + 10 == b + 5)
			return true;

		if (b + 10 == a + 5)
			return true;

		return false;
	},

	findgroups: function() {
		var self = this;
		this.groups = [];

		for (var j = 0; j < this.level.rows; j++) {
			var matchlength = 1;
			for (var i = 0; i < this.level.columns; i++) {
				var checkgroup = false;
				var t1 = this.level.tiles[i][j];

				if (i == this.level.columns - 1) {
					checkgroup = true;
				} else {
					var t2 = this.level.tiles[i + 1][j];

					if ((this.checkTypes(t1.type, t2.type) && t1.type != DEAD) && (!t1.is_empty && !t2.is_empty))
						matchlength += 1;
					else
						checkgroup = true;
				}

				if (checkgroup) {
					if (matchlength >= 3)
						this.createGroup(i + 1 - matchlength, j, matchlength, true);
					matchlength = 1;
				}
			}
		}

		for (var i = 0; i < this.level.columns; i++) {
			var matchlength = 1;
			for (var j = 0; j < this.level.rows; j++) {
				var checkgroup = false;
				var t1 = this.level.tiles[i][j];

				if (j == this.level.rows - 1) {
					checkgroup = true;
				} else {
					var t2 = this.level.tiles[i][j + 1];

					if ((this.checkTypes(t1.type, t2.type) && t1.type != DEAD) && (!t1.is_empty && !t2.is_empty))
						matchlength += 1;
					else
						checkgroup = true;
				}

				if (checkgroup) {
					if (matchlength >= 3)
						this.createGroup(i, j + 1 - matchlength, matchlength, false);
					matchlength = 1;
				}
			}
		}
	},

	createGroup: function(col, row, lenght, isHorizontal) {
		this.groups.push({
			column: col,
			row: row,
			length: lenght,
			horizontal: isHorizontal
		});
	},

	loopgroups: function(func) {
		for (var i = 0; i < this.groups.length; i++) {
			var group = this.groups[i];
			var coffset = 0;
			var roffset = 0;
			for (var j = 0; j < group.length; j++) {
				func(i, group.column + coffset, group.row + roffset, group, j);

				if (group.horizontal)
					coffset++;
				else
					roffset++;
			}
		}
	},

	killType: function(type, boot) {
		var self = this;
		this.forEachTile(function(tile, c, r) {
			if (tile.type == type && !tile.is_empty) {
				tile.type = DEAD;

				if (!boot)
					self.decreaseReceipeType(type, c, r);
			}
		});
	},

	killRow: function(r, boot) {
		for (var i = 0; i < this.level.columns; i++) {
			var tile = this.level.tiles[i][r];
			var type = tile.type;

			if (!boot)
				this.decreaseReceipeType(tile.type, i, r);
			tile.type = DEAD;
			if (type > 4 && type < 10) {
				this.killRow(r, boot);
				this.pending.push({
					type: 0,
					row: r,
					column: i
				});
			} else if (type > 9 && type < 15) {
				this.killColumn(i, boot);
				this.pending.push({
					type: 1,
					row: r,
					column: i
				});
			}
		}
	},

	killColumn: function(c, boot) {
		for (var j = 0; j < this.level.rows; j++) {
			var tile = this.level.tiles[c][j];

			var type = tile.type;

			if (!boot)
				this.decreaseReceipeType(tile.type, c, j);
			tile.type = DEAD;

			if (type > 4 && type < 10) {
				this.killRow(j, boot);
				this.pending.push({
					type: 0,
					row: j,
					column: c
				});
			} else if (type > 9 && type < 15) {
				this.killColumn(c, boot);
				this.pending.push({
					type: 1,
					row: j,
					column: c
				});
			}
		}
	},

	decreaseReceipeType: function(type, col, row) {

    if(this.parent.decreaseReceipeType)
    {
      this.parent.decreaseReceipeType(type, col, row);
      return;
    }

		for (var i = 0; i < this.level.receipes.length; i++) {
			var r = this.level.receipes[i];

			if ((r.type == type || r.type - 5 == type || r.type - 10 == type) && r.left > 0) {
				r.left--;

				if (r.left == 0) {
					// view hack
					r.viewText.visible = false;
					r.viewCheck.visible = true;
				} else {
					r.viewText.text = r.left.toString();
				}

				if (ENABLE_PARTICLES) {
					var s = this.gsplash.getFirstDead();
					if (s) {
						var coord = this.getTilePos(col, row, 0, 0);

						s.revive();
						s.frameName = this.getGemFrameName(r.type);
						s.anchor.set(0.5);
						s.alpha = 1;
						s.scale.set(1 * this.level.board_scale);
						s.x = coord.tilex;
						s.y = coord.tiley;
						s.rotation = 0;

						var twn = this.game.add.tween(s)
							.to({
								x: r.view.world.x,
								y: r.view.world.y,
							}, 500, Phaser.Easing.Linear.None, true);
						twn.start();
						this.kill(s, 520);
					}
				}
				this.game.world.bringToTop(r.viewText);
			}
		}
	},

	getTileAboveIsEmpty: function(c, r) {
		if (r < 1)
			return false;

		var t = this.tileAt(c, r - 1);
		return t.is_empty;
	},

	getTileBelowIsEmpty: function(c, r) {
		if (r >= this.level.rows)
			return false;

		var t = this.tileAt(c, r + 1);
		if (!t)
			return false;
		return t.is_empty;
	},

	removeGroups: function(boot) {
		var self = this;

		this.loopgroups(function(index, column, row, group, tileIndex) {
			var tile = self.tileAt(column, row);
			var type = tile.type;

			if (!boot)
				self.decreaseReceipeType(tile.type, column, row);

			if (boot) {
				tile.type = DEAD;
			} else {
				var tileAboveIsEmpty = self.getTileAboveIsEmpty(column, row);

				if (tileAboveIsEmpty)
					tile.type = EMPTY;
				else
					tile.type = DEAD;

				tile.type = DEAD;
			}

			if (group.length == 3) {
				if (type > 4 && type < 10) {
					self.killRow(row, boot);
					self.pending.push({
						type: 0,
						row: row,
						column: column
					});
				} else if (type > 9 && type < 15) {
					self.killColumn(column, boot);
					self.pending.push({
						type: 1,
						row: row,
						column: column
					});
				}
			} else if (group.length == 4) {
				if (tileIndex == group.length - 1) {
					tile.newtype = type + 5;
					if (tile.newtype > 14)
						tile.newtype = type

					if (group.horizontal) {
						tile.newtype = type + 5;
						if (tile.newtype > 14)
							tile.newtype = type
					} else {
						tile.newtype = type + 10;
						if (tile.newtype > 14)
							tile.newtype = type
					}
				}
			} else if (group.length == 5) {
				if (tileIndex == group.length - 1)
					tile.newtype = ITEM_CAKE;
			}
		});

		for (var i = 0; i < this.level.columns; i++) {
			var offset = 0;
			for (var j = this.level.rows - 1; j >= 0; j--) {
				var tile = this.level.tiles[i][j];

				if (tile.type == DEAD) {
					if (tile.newtype == NONE && !this.tileAt(i, j).is_empty) {

						if ((i < this.level.columns - 1) && !this.tileAt(i, j).is_empty && j < this.level.rows - 1 && !this.tileAt(i, j + 1).is_empty)
							offset++;
						tile.offset = 0;
					} else {
						tile.offset = 0;
					}
				} else {
					if (tile.newtype == NONE && !this.tileAt(i, j).is_empty) {
						if ((i < this.level.columns - 1) && !this.tileAt(i, j).is_empty && j < this.level.rows - 1 && !this.tileAt(i, j + 1).is_empty)
							tile.offset = offset;
					} else
						tile.offset = 0;
				}
			}
		}
	},

	getTileOffsetX: function(x, y) {
		var offset_x = 0;

		if (x > 0 && y > 0 && x < this.level.columns - 1 && y < this.level.rows - 1) {
			if (this.tileAt(x + 1, y + 1).is_freezed) {
				offset_x = -1;
			}
			if (this.tileAt(x - 1, y + 1).is_freezed) {
				offset_x = 1;
			}
		}
		return offset_x
	},

	offsetTiles: function(boot) {
		var totalNew = 0;

		for (var i = 0; i < this.level.columns; i++) {
			for (var j = this.level.rows - 1; j >= 0; j--) {
				var tile = this.tileAt(i, j);

				if (tile.type == DEAD && !tile.is_empty) {
					if (tile.newtype != NONE) {
						tile.type = tile.newtype;
						tile.offset = 0;
						tile.newtype = NONE;
					} else {
						tile.type = this.getRandomTile();
						if (!boot) {
							tile.alpha = 0;
						}
					}
					if (!boot) {
						tile.alpha = 0;
						totalNew++;
					}
				} else {
					if (tile.offset > 0 && !tile.is_empty && !this.tileAt(i, j + tile.offset).is_empty)
						this.swap(i, j, i, j + tile.offset);

					tile.offset = 0;
				}
			}
		}
		return totalNew;
	},

	findMoves: function() {
		var self = this;
		this.moves = [];

    // adding ability to check if first two tiles arn't the same
		var firstHorizontalPass = true;
		var firstVerticalPass = true;

		for (var j = 0; j < this.level.rows; j++) {
			for (var i = 0; i < this.level.columns - 1; i++) {
				var t_1 = this.tileAt(i, j);
				var t_2 = this.tileAt(i + 1, j);

				if ((t_1.type != t_2.type) || !firstHorizontalPass) {
					this.swap(i, j, i + 1, j);
					this.findgroups();
					this.swap(i, j, i + 1, j);

					if (this.groups.length > 0 && (!this.tileAt(i, j).is_empty && !this.tileAt(i + 1, j).is_empty)) {
						firstHorizontalPass = false;
						this.moves.push({
							column1: i,
							row1: j,
							column2: i + 1,
							row2: j,
							len: this.groups[0].length
						});
					}
				}
			}
		}

		for (var i = 0; i < this.level.columns; i++) {
			for (var j = 0; j < this.level.rows - 1; j++) {

				var t_1 = this.tileAt(i, j);
				var t_2 = this.tileAt(i, j + 1);

				if ((t_1.type != t_2.type) || !firstVerticalPass) {
					this.swap(i, j, i, j + 1);
					this.findgroups();
					this.swap(i, j, i, j + 1);

					if (this.groups.length > 0 && (!this.tileAt(i, j).is_empty && !this.tileAt(i, j + 1).is_empty)) {
						firstVerticalPass = false;
						this.moves.push({
							column1: i,
							row1: j,
							column2: i,
							row2: j + 1,
							len: this.groups[0].length
						});
					}
				}
			}
		}

		this.groups = [];
	},

	canSwap: function(x1, y1, x2, y2) {

		// check if the first move in the tutorial is mutched with that the helper is puprose
		if (this.isFirstMove && this.level.tutorial_enabled) {
			if ((x1 == this.tileMatchPos_1.c && y1 == this.tileMatchPos_1.r && x2 == this.tileMatchPos_2.c && y2 == this.tileMatchPos_2.r) ||
				(x1 == this.tileMatchPos_2.c && y1 == this.tileMatchPos_2.r && x2 == this.tileMatchPos_1.c && y2 == this.tileMatchPos_1.r)) {
				this.isFirstMove = false;
				return true;
			}
		} else {
			if (((Math.abs(x1 - x2) == 1 && y1 == y2) || (Math.abs(y1 - y2) == 1 && x1 == x2)) && ((!this.tileAt(x1, y1).is_empty) && (!this.tileAt(x2, y2).is_empty)))

				return true;
		}

		return false;
	},

	swap: function(x1, y1, x2, y2) {
		var t1 = this.tileAt(x1, y1);
		var t2 = this.tileAt(x2, y2);

		var typeswap = t1.type;
		var viewswap = t1.view;
		var alphaswap = t1.alpha;
		var newtypeswap = t1.newtype;

		t1.type = t2.type;
		t2.type = typeswap;

		t1.view = t2.view;
		t2.view = viewswap;

		t1.alpha = t2.alpha;
		t2.alpha = alphaswap;

		t1.newtype = t2.newtype;
		t2.newtype = newtypeswap;
	},

	gameRender: function() {
		this.renderTiles();

		if (this && this.tMoves)
			this.tMoves.text = this.level.movesLeft;
	},

	renderTiles: function() {
		var self = this;
		for (var i = 0; i < this.level.columns; i++) {
			for (var j = 0; j < this.level.rows; j++) {

				var tile = this.tileAt(i, j);
				var offset = tile.offset;
				var coord = this.getTilePos(i, j, 0, this.bounce(0, offset, ((this.animTime - this.delayForMatchAnim) / (this.animTimeTotal + this.delayForMatchAnim)), 1.4, 0.6));

				//Dont' render tile if it's empty
				if (tile.type >= 0 && !tile.is_empty) {
					tile.view.frameName = this.getGemFrameName(tile.type);

					tile.view.x = coord.tilex;
					tile.view.y = coord.tiley;

					tile.view.alpha = tile.alpha;
					tile.view.scale.set((tile.alpha + 0.4) * this.level.board_scale);

					tile.view.hasScaleDownTween = false;

					if (DEBUG) {
						tile.debug_text.text = tile.offset;
						tile.debug_text.x = tile.view.x;
						tile.debug_text.y = tile.view.y;
					}

				} else {

					if (!tile.view.hasScaleDownTween) {
						tile.view.hasScaleDownTween = true;

						this.game.add.tween(tile.view.scale)
							.to({
								x: 0,
								y: 0
							}, 75, Phaser.Easing.Sinusoidal.InOut)
							.start();

						if (ENABLE_PARTICLES && !tile.is_empty) {
							var s = this.asplash.getFirstDead();
							if (s) {
								s.revive();
								s.anchor.set(0.5);
								s.alpha = 1;
								s.scale.set(1.5 * this.level.board_scale);
								s.x = tile.view.x;
								s.y = tile.view.y;

								var ts1 = this.game.add.tween(s.scale)
									.to({
										x: 3 * this.level.board_scale,
										y: 3 * this.level.board_scale
									}, 575)
									.start();

								var ts2 = this.game.add.tween(s)
									.to({
										alpha: 0
									}, 205)
									.delay(150)
									.start();

								if (!ENABLE_MATCH_ANIM) {
									this.game.add.tween(tile.view.scale)
										.to({
											x: 0,
											y: 0
										}, 205)
										.start();
								}

								this.kill(s, 875);
							}
						}

						if (ENABLE_MATCH_ANIM && !tile.is_empty) {
							this.delayForMatchAnim = 0.18;

							var tw1 = this.game.add.tween(tile.view.scale)
								.to({
									x: "+0.9",
									y: "-0.6"
								}, 120, Phaser.Easing.Back.Out, false, 0, 0, true);

							var tw2 = this.game.add.tween(tile.view.scale)
								.to({
									x: 0,
									y: 0
								}, 40, Phaser.Easing.Back.Out);

							tw1.chain(tw2);
							tw1.start();
						}
					}
				}

				// SCALE SELECTED
				if (this.level.selectedtile.selected) {
					if (this.level.selectedtile.column == i && this.level.selectedtile.row == j) {
						tile.view.frameName = this.getGemFrameName(tile.type);
						tile.view.x = coord.tilex;
						tile.view.y = coord.tiley;
						tile.view.scale.set(1.4 * this.level.board_scale);
					}
				}
			}
		}

		// SWAP ANIMATIONS
		if (this.gamestate == this.gamestates.resolve && (this.animState == AT_SWAP || this.animState == AT_SWAPBACK)) {
			var offsetx = this.currentmove.column2 - this.currentmove.column1;
			var offsety = this.currentmove.row2 - this.currentmove.row1;

			var coord1 = this.getTilePos(this.currentmove.column1, this.currentmove.row1, 0, 0);
			var tile1 = this.tileAt(this.currentmove.column1, this.currentmove.row1);
			var coord1offset = this.getTilePos(this.currentmove.column1, this.currentmove.row1, (this.animTime / this.animTimeTotal) * offsetx, (this.animTime / this.animTimeTotal) * offsety);

			var coord2 = this.getTilePos(this.currentmove.column2, this.currentmove.row2, 0, 0);
			var tile2 = this.tileAt(this.currentmove.column2, this.currentmove.row2);
			var coord2offset = this.getTilePos(this.currentmove.column2, this.currentmove.row2, (this.animTime / this.animTimeTotal) * -offsetx, (this.animTime / this.animTimeTotal) * -offsety);

			// SELECTED GEM SWAP ANIMATION
			tile1.view.x = coord1offset.tilex;
			tile1.view.y = coord1offset.tiley;
			tile2.view.x = coord2offset.tilex;
			tile2.view.y = coord2offset.tiley;
		}
	},

	tileAt: function(x, y) {
		return this.level.tiles[x][y];
	},

	getTilePos: function(column, row, columnoffset, rowoffset) {
		var tilex = this.level.x + (column + columnoffset) * this.level.tilewidth;
		var tiley = this.level.y + (row + rowoffset) * this.level.tileheight;
		return {
			tilex: tilex,
			tiley: tiley
		};
	},

	bounce: function(start, end, value, bounceOffset, offsetStartTime) {
		// bounce effect used when tiles are falling down
		var result = start;
		if (value < offsetStartTime) {
			result = this.lerp(start, end * bounceOffset, Math.sin(value * Math.PI * 0.5));
		} else {
			result = this.lerp(end * bounceOffset, end, Math.sin(value * Math.PI * 0.5));
		}
		return result;
	},

	checkNeighbor: function(x, y) {
		// return the information about neightbour tiles ( are they empty or no)
		// used for setuping the background slices
		var top = false;
		var bottom = false;
		var left = false;
		var right = false;

		var top_right = false;
		var top_left = false;

		var bottom_right = false;
		var bottom_left = false;

		top = (y - 1) >= 0 && !this.tileAt(x, y - 1).is_empty;
		bottom = (y + 1) < this.level.rows && !this.tileAt(x, y + 1).is_empty;

		left = (x - 1) >= 0 && !this.tileAt(x - 1, y).is_empty;
		right = (x + 1) < this.level.columns && !this.tileAt(x + 1, y).is_empty;

		top_right = ((y - 1) >= 0 && (x + 1) < this.level.columns) && !this.tileAt(x + 1, y - 1).is_empty && !right;
		top_left = ((y - 1) >= 0 && (x - 1) >= 0) && !this.tileAt(x - 1, y - 1).is_empty && !left;

		bottom_right = ((y + 1) < this.level.rows && (x + 1) < this.level.columns) && !this.tileAt(x + 1, y + 1).is_empty && !right;
		bottom_left = ((y + 1) < this.level.rows && (x - 1) >= 0) && !this.tileAt(x - 1, y + 1).is_empty && !left;

		return {
			top: top,
			bottom: bottom,
			left: left,
			right: right,

			top_right: top_right,
			top_left: top_left,

			bottom_right: bottom_right,
			bottom_left: bottom_left,
		};
	},
};
