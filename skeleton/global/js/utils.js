var Utils = function () {};

// specs should be an object containing the type and the default value for each dynamic ad parameter.  example:
//   {
//     param1: {type: 'boolean', default: false},
//     param2: {type: 'int', default: 20},
//   }
Utils.prototype.getAdParameters = function(specs) {
  var params = {};

  if (ad_dynamic_parameters) {
    ad_dynamic_parameters.split("&").forEach(function(item) {params[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])});
  }

  if (specs) {
    // parse the string values into their proper types
    for (var param in params) {
      if (typeof specs[param] !== 'undefined') {
        // see if we need to parse the string value into a particular type
        switch (specs[param].type.toLowerCase()) {
          case 'int':
          case 'integer':
          params[param] = parseInt(params[param]);
          break;

          case 'int[]':
          case 'integer[]':
          var intArray = params[param].split(",");
          for(var i=0; i<intArray.length; i++)
            intArray[i] = +intArray[i];
          params[param] = intArray;
          break;

          case 'float':
          params[param] = parseFloat(params[param]);
          break;

          case 'bool':
          case 'boolean':
          if (params[param].toLowerCase() == "true")
            params[param] = true;
          else
            params[param] = false;
          break;
        }
      }
    }

    // set default values on any dynamic parameters that were not provided in ad_dynamic_parameters
    for (var param in specs) {
      if (typeof params[param] === 'undefined') {
        params[param] = specs[param].default;
      }
    }
  }

  return params;
}


// 62
Utils.prototype.applyAdParameters = function(pTarget){
    var params = {};
    
    if (ad_dynamic_parameters) {
	ad_dynamic_parameters.split("&").forEach(function (pItem) {
		params[pItem.split("=")[0]] = decodeURIComponent(pItem.split("=")[1])
		    });
    }
    else {
	console.log('[UTILS]: ad_dynamic_parameters was not found.');
	return;
    }
    
    for(var k in params){
	var val = params[k];
	var o = pTarget;
	
	o = k == k.toUpperCase() ? window : pTarget;
	
	if (o.hasOwnProperty(k)){
	    var tp = o[k];
	    
	    if (tp.constructor === Array){
		o[k] = [];
		
		val.split(",").forEach(function (pItem) {
			o[k].push(utils.convertType(0, pItem)); // PASS 0 for number, smart?
		    });
	    }
	    else
		o[k] = utils.convertType(tp, val);
	}
	else {
	    console.log('[UTILS]: unable to find property:', k);
	}
    }
}

Utils.prototype.convertType = function(pTargetProperty, pVal){
    if(typeof(pTargetProperty) === 'boolean')
	return pVal == 'true' ? true : pVal == '1' ? true : false;
    else if(typeof(pTargetProperty) === 'number')
	return parseFloat(pVal);
    else
	return pVal;
}

Utils.prototype.checkOverlap = function(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}

Utils.prototype.checkPointInside = function(point, sprite) {
  var pointRect = new PIXI.Rectangle(point.x, point.y, 1, 1)
  var spriteBounds = sprite.getBounds();
  return Phaser.Rectangle.intersects(pointRect, spriteBounds);
}

Utils.prototype.lineLength = function(x, y, x0, y0) {
  var xd = Math.abs(x0 - x);
  var yd = Math.abs(y0 - y);
  return Math.sqrt(xd * xd + yd * yd);
}

// assumes you have an image called "mask.png" or "mask_small.png" loaded in the ImageLoader
Utils.prototype.highlightRegion = function(game, x, y, radius, alpha) {
  alpha = alpha || 0.4;

  var mask_small = null;
  if (imageLoader.hasFrameName('mask.png'))
    mask_small = false;
  else if (imageLoader.hasFrameName('mask_small.png'))
    mask_small = true;

  var highlight = imageLoader.sprite(x, y, mask_small ? 'mask_small.png' : 'mask.png');
  highlight.alpha = alpha;
  highlight.anchor.set(0.5, 0.5);
  var scale = radius / 20;
  if (mask_small)
    scale *= 2;
  highlight.scale.setTo(scale, scale);
  return highlight;
}

Utils.prototype.random = function(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

Utils.prototype.shuffle = function(obj) {
  var rand;
  var index = 0;
  var shuffled = [];
  var value;
  for (var i = obj.length - 1; i >= 0; i--) {
    value = obj[i]
    rand = this.random(index++);
    shuffled[index - 1] = shuffled[rand];
    shuffled[rand] = value;
  };
  return shuffled;
}

Utils.prototype.arrayDistinct = function(needles, haystack){
  var res_array = [];
  haystack.forEach(function(entry) {
      if(needles.indexOf(entry) == -1){
        // add to missing
        res_array.push(entry);
      }else{
        // do nothing
      }
    });
  return res_array;
}


Utils.prototype.forceOrientation = function(game, orientation) {
  if (game.device.desktop)
    return;

  console.log("forcing orientation: " + orientation);
  game.scale.forceOrientation(orientation == "landscape" ? true : false, orientation == "landscape" ? false : true);

  var ths = this;
  game.scale.enterIncorrectOrientation.add(function() {ths.handleIncorrectOrientation(game)});
  game.scale.leaveIncorrectOrientation.add(function() {ths.handleCorrectOrientation(game)});
}


Utils.prototype.handleIncorrectOrientation = function(game) {
  console.log("entered incorrect orientation");
  document.getElementById("orientation").style.display = "block";
}

Utils.prototype.handleCorrectOrientation = function() {
  console.log("resumed correct orientation");
  document.getElementById("orientation").style.display = "none";
}


Utils.prototype.parseXML = function(xmlStr) {
  if (typeof window.DOMParser != "undefined") {
    return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
  } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
    var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = "false";
    xmlDoc.loadXML(xmlStr);
    return xmlDoc;
  } else {
    return null;
  }
}


// 62
Utils.prototype.applyAdParameters = function(target){
    var params = utils.getAdParameters();
    for(var k in params){
        var val = params[k];
        var o = target;

        if (k == k.toUpperCase())
            o = window;
        else
            o = target;

        if (o.hasOwnProperty(k)){
            //target[k] = params[k];
            if(typeof(o[k]) === 'boolean')
                o[k] = val == 'true' ? true : val == '1' ? true : false;
            else
                o[k] = val;
        }
        else {
            console.log('Ad params: unable to find property:', k);
        }
    }
}

Object.prototype.hasOwnProperty = function(property) {
    return typeof this[property] !== 'undefined';
};


String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

String.prototype.isUpperCase = function (val) {
    return (val == val.toUpperCase());
}


Utils.prototype.lerp = function(a, b, t) {
    return a + t * (b - a)
}

Utils.prototype.hermite = function(start, end, value) {
    return this.lerp(start, end, value * value * (3.0 - 2.0 * value));
}

Utils.prototype.sinerp = function(start, end, value) {
    return this.lerp(start, end, Math.sin(value * Math.PI * 0.5));
}

// FIXES JS NEGATIVE VALUE BUG
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

Utils.prototype.fitIntoRect = function(sprite, bounds, fillRect, align) {
  var wD = sprite.width / sprite.scale.x;
  var hD = sprite.height / sprite.scale.y;

  var wR = bounds.width;
  var hR = bounds.height;

  var sX = wR / wD;
  var sY = hR / hD;

  var rD = wD / hD;
  var rR = wR / hR;

  var sH = fillRect ? sY : sX;
  var sV = fillRect ? sX : sY;

  var s = rD >= rR ? sH : sV;
  var w = wD * s;
  var h = hD * s;

  var tX = 0.0;
  var tY = 0.0;

  switch (align)
  {
    case 'left':
    case 'topLeft':
    case 'bottomLeft':
      tX = 0.0;
      break;

    case 'right':
    case 'topRight':
    case 'bottomRight':
      tX = w - wR;
      break;

    default:
      tX = 0.5 * (w - wR);
  }

  switch (align)
  {
    case 'top':
    case 'topLeft':
    case 'topRight':
      tY = 0.0;
      break;

    case 'bottom':
    case 'bottomLeft':
    case 'bottomRight':
      tY = h - hR;
      break;

    default:
      tY = 0.5 * (h - hR);
  }

  sprite.x = bounds.x - tX;
  sprite.y = bounds.y - tY;
  sprite.scale.set(s);
}

var utils = new Utils();
