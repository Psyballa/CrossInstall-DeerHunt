console.log("wrapper - start");
genlog("funnel", "wrapper");

var time_wrapper_start = new Date().getTime();
var time_mraid_ready = null;
var time_mraid_viewable = null;
var time_app_preload_complete = null;
var time_app_start = null;
var close_button_time_remaining = null;
var close_button_showing = false;
var close_button_timeout_id = null;

var query_params = {};
location.search.substr(1).split("&").forEach(function(item) {query_params[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])});


function setupMraid(stage) {
  mraid.useCustomClose(true);
  time_mraid_ready = new Date().getTime();
  genlog_time_since(time_wrapper_start, "time_mraid_ready");
  console.log("setupMraid - start");
  genlog("funnel", "setupMraid."+ stage);
  registerMraidHandlers(mraid);
  showAd();
  console.log("setupMraid - end");
};


function registerMraidHandlers(mraid) {
  console.log("registerMraidHandlers - start");

  mraid.addEventListener('viewableChange', function(state) {
    console.log('viewable changed to: ' + state + " (" + typeof(state) + ")");
    genlog("mraidviewable", state);
    if (mraid.isViewable()) {
      console.log("showAd (viewable listener): calling");
      showAd();
    } else {
    }
  });

  mraid.addEventListener('error', function(message, action) {
    console.log('mraid error.  message: ' + message + '   action: ' + action);
    log_remote("mraid_error", 'message: ' + message + '   action: ' + action);
  });

  mraid.addEventListener("stateChange", function(state) {
    console.log("stateChange: " + state);
    genlog("mraidstate", state);
    switch (state) {
    // Event trigger when the ad-container goes offscreen
    case "hidden":
      break;
    // Event trigger when the ad-container is onscreen
    case "default":
      // This is where the impression beacon (if any) should be fired
      break;
    }
  });
  console.log("registerMraidHandlers - end");
}


function wrapper_click_go(depth) {
  console.log("clicked; going to click destination: " + ad_click_dest);
  genlog("funnel", "click_go");
  var url = ad_click_dest;
  if (ad_exchange == "adex")
    url += "%26sub12%3Dcta";
  else
    url += "&sub12=cta";
  if (depth)
    url += "." + depth.toString();
  mraid.open(url);
}


function showCloseButtonCountdown() {
  if (close_button_showing)
    return;

  var seconds_remaining = close_button_time_remaining / 1000;

  var closeTimer = document.getElementById("close_timer");
  closeTimer.innerHTML = seconds_remaining;

  var styleAttr = document.createAttribute("style");
  styleAttr.value = "display:block";
  closeTimer.setAttributeNode(styleAttr);

  close_button_time_remaining -= 1000;
  if (close_button_time_remaining > 0)
    setTimeout(function() {showCloseButtonCountdown()}, 1000);
}


function showCloseButton() {
  genlog("render", "showCloseButton");
  console.log("showCloseButton - start");

  var closeTimer = document.getElementById("close_timer");
  var timerStyleAttr = document.createAttribute("style");
  timerStyleAttr.value = "display:none";
  closeTimer.setAttributeNode(timerStyleAttr);

  var closeZone = document.getElementById("close_zone");
  var styleAttr = document.createAttribute("style");
  styleAttr.value = "display:block";
  closeZone.setAttributeNode(styleAttr);

  closeZone.onclick = function() {
    console.log("clicked close button");
    genlog("funnel", "close");
    mraid.close();
    return false;
  };

  close_button_showing = true;
  console.log("showCloseButton - end");
}


function showAd() {
  console.log("showAd");
  if (query_params['dev_nomraid'] || mraid.isViewable()) {
    time_mraid_viewable = new Date().getTime();
    genlog_time_since(time_mraid_ready, "time_mraid_viewable");
    console.log("showAd - viewable");
    genlog("funnel", "viewable");
    var addiv = document.getElementById("ad");
    if (addiv) {
      console.log("has ad div; setting style display:block");
      var styleAttr = document.createAttribute("style");
      styleAttr.value = "display:block";
      addiv.setAttributeNode(styleAttr);
    }

    wrapper_splash_shadows_start();
    if (ad_exchange == "mopub")
      close_button_timeout_id = setTimeout(function() {showCloseButton()}, ad_close_duration);

    console.log("ad_begin: calling");
    ad_begin();   // must be globally defined function called ad_begin() in app ad code
    genlog("lang", localization.getLanguage());
  }
}


function wrapper_preload_complete() {
  time_app_preload_complete = new Date().getTime();
  genlog_time_since(time_wrapper_start, "time_app_preload");
}


function wrapper_load_progress(percent) {
  var splash = document.getElementById("splash_loading_bar_full");
  if (splash) {
    var styleAttr = document.createAttribute("style");
    styleAttr.value = "width:" + Math.floor(135 * percent/100) + "px";
    splash.setAttributeNode(styleAttr);
  }
}


function wrapper_hide_splash() {
  wrapper_load_progress(100);

  time_app_start = new Date().getTime();
  genlog_time_since(time_mraid_viewable, "time_app_start");
  genlog("funnel", "hide_splash");
  var splash = document.getElementById("splash");
  if (splash) {
    var styleAttr = document.createAttribute("style");
    styleAttr.value = "display:none";
    splash.setAttributeNode(styleAttr);
  }

  var header_logo = document.getElementById("ad_header_logo");
  if (header_logo) {
    var styleAttr = document.createAttribute("style");
    styleAttr.value = "display:block";
    header_logo.setAttributeNode(styleAttr);
  }


  console.log("close duration:", ad_close_duration);
  if (close_button_timeout_id) {
    clearTimeout(close_button_timeout_id);
    close_button_timeout_id = null;
  }
  setTimeout(function() {showCloseButton()}, ad_close_duration);
  if (ad_exchange == "mopub" && ad_close_duration > 2000) {
    close_button_time_remaining = ad_close_duration;
    showCloseButtonCountdown();
  }
}


var hadFirstInteraction = false;
var hadSecondInteraction = false;
var hadThirdInteraction = false;
function wrapper_mark_interaction() {
  if (!hadFirstInteraction) {
    genlog("funnel", "first_interaction");
    hadFirstInteraction = true;
    return;
  }
  if (!hadSecondInteraction) {
    genlog("funnel", "second_interaction");
    hadSecondInteraction = true;
    return;
  }
  if (!hadThirdInteraction) {
    genlog("funnel", "third_interaction");
    hadThirdInteraction = true;
    return;
  }
}


function wrapper_mark_cta(depth) {
  var subbin = "cta";
  if (depth)
    subbin += "." + depth.toString();
  genlog("funnel", subbin);
}


function log_remote(bin, text) {
  console.log("%c[log_remote]  %s ==> %s", "background:tan;color:white", bin, text);
  var url = ad_logroot + "/log_string?bin=" + encodeURIComponent(ad_name + "." + bin) + "&s=" + encodeURIComponent(text);
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.send();
}


function genlog(bin, subbin) {
  console.log("%c[genlog]  %s ==> %s", "background:grey;color:white", bin, subbin);
  var url = ad_logroot + "/log?bin=" + encodeURIComponent(ad_name + "." + bin) + "&subbin=" + encodeURIComponent(subbin);
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.send();
}


function genlog_time_since(start, bin) {
  if (!start)
    return;
  var subbin = bucket_time_since(start);
  genlog(bin, subbin);
}


function bucket_time_since(start) {
  var end = new Date().getTime();
  var time = end - start;

  var bucket = get_bucket(time, 0, 10000, 40);

  var bucket_str = "[";
  if (bucket.start == Number.NEGATIVE_INFINITY)
    bucket_str += "-inf";
  else
    bucket_str += bucket.start;

  if (bucket.start != bucket.end) {
    bucket_str += " to ";

    if (bucket.end == Number.POSITIVE_INFINITY)
      bucket_str += "+inf";
    else
      bucket_str += bucket.end;
  }
  bucket_str += "]";
  return bucket_str;
}


function bucketObj() {
  this.offset = null;
  this.start = null;
  this.end = null;
  this.width = null;
}

function get_bucket(item, min, max, numBuckets) {
  var bucket = new bucketObj();
  bucket.width = (max - min) / numBuckets;

  if (item <= min || max == min) {
    bucket.offset = 0;
    bucket.start = Number.NEGATIVE_INFINITY;
    bucket.end = min + bucket.width;
  } else if (item >= max) {
    bucket.offset = numBuckets - 1;
    bucket.start = max - bucket.width;
    bucket.end = Number.POSITIVE_INFINITY;
  } else {
    var position = numBuckets * (item - min) / (max - min);
    var floored = Math.floor(position);
    bucket.offset = Math.round(floored);
    bucket.start = min + bucket.offset * bucket.width;
    bucket.end = bucket.start + bucket.width;
  }

  if (bucket.offset == 0)
    bucket.start = Number.NEGATIVE_INFINITY;
  if (bucket.offset == numBuckets - 1)
    bucket.end = Number.POSITIVE_INFINITY;

  return bucket;
}

localization.registerString('Mini game loading, please wait...',
  {'en': 'Mini game loading...',
   'ar': 'جاري تحميّل لعبة مُصغّرة، يُرجى الانتظار...',
   'bg': 'Мини-играта се зарежда, моля, изчакайте...',
   'zh': '小游戏加载中，请稍等……',
   'cs': 'Probíhá načítání minihry, prosím čekejte...',
   'da': 'Mini spil loader, vent venligst...',
   'nl': 'Mini-game is aan het laden, even geduld...',
   'fi': 'Minipeliä ladataan; ole hyvä ja odota...',
   'fr': 'Chargement du mini-jeu, merci de patienter...',
   'de': 'Mini-Spiel wird geladen. Bitte warten ...',
   'el': 'Φόρτωση μίνι παιχνιδιού, παρακαλώ περιμένετε... ',
   'he': 'מיני-משחק טוען, אנא המתן...',
   'hu': 'Kérem várjon, a mini játék betöltése folyamatban...',
   'id': 'Memuat mini game, silakan tunggu...',
   'it': 'Mini gioco in caricamento, attendere prego...',
   'ja': 'ミニゲームを読み込んでいます。少しお待ちください...',
   'ko': '미니게임 로딩 중, 기다려 주세요...',
   'ms': 'Permainan mini sedang dimuat turun, sila tunggu sebentar...',
   'no': 'Minispill laster, vennligst vent...',
   'pl': 'Zaczekaj, trwa wczytywanie minigry...',
   'pt': 'Minijogo carregando, aguarde…',
   'ro': 'Mini-jocul se încarcă, vă rugăm să așteptați...',
   'ru': 'Миниигра загружается, пожалуйста, подождите...',
   'sr': 'Mini igrica se učitava, molimo sačekajte...',
   'sk': 'Minihra sa načítava, čakajte prosím...',
   'es': 'Cargando minijuego, por favor espere...',
   'sv': 'Minispelet laddas, vänta...',
   'tl': 'Nagloload ang mini game, pakihintay...',
   'th': 'กำลังโหลดมินิเกม โปรดรอ...',
   'tr': 'Mini oyun yükleniyor, lütfen bekle...',
   'uk': 'Міні-гра завантажується, будь ласка, зачекайте...',
   'vi': 'Trò chơi đang tải, vui lòng chờ...'
 }
);


var bgNumShadows = 30;
function wrapper_splash_shadows_start() {
  var splash = document.getElementById("splash");
  if (!splash)
    return;

  for (var i = 0; i < bgNumShadows; i++) {
    var div = document.createElement("div");
    div.id = "bgShadow" + i;

    var width = 50 + i * Math.floor(150 / bgNumShadows);
    div.style.width = width + "px";
    div.style.height = Math.floor(width/5) + "px";

    var colorAdd = Math.floor((200 - width) / 20) * 3 + 1;
    if (colorAdd == 10)
      colorAdd = 'A';
    if (colorAdd == 11)
      colorAdd = 'B';
    if (colorAdd == 12)
      colorAdd = 'C';
    if (colorAdd == 13)
      colorAdd = 'D';
    if (colorAdd == 14)
      colorAdd = 'E';
    if (colorAdd == 15)
      colorAdd = 'F';
    if (colorAdd > 15)
      colorAdd = 'E';

    div.style.background = "#2" + colorAdd + "2" + colorAdd + "2" + colorAdd;
    div.style.borderRadius = Math.floor(width/2) + "px";
    div.style.position = "absolute";
    div.style.zIndex = 1;
    div.style.left = (-100 + Math.floor(Math.random() * (gameWidth + 1))) + "px";
    div.style.top = (50 + Math.floor(Math.random() * (gameHeight + 1))) + "px";
    splash.insertBefore(div, splash.firstChild);
  }
  setTimeout(wrapper_splash_shadows_move, 20);
}

function wrapper_splash_shadows_move() {
  for (var i = 0; i < bgNumShadows; i++) {
    var div = document.getElementById("bgShadow" + i);
    var left = parseInt(div.style.left);
    var width = parseInt(div.style.width);
    left += Math.floor((200 - width) / 15) + 1;
    if (left > gameWidth + 200)
      left = -200;
    div.style.left = left + "px";
  }
  setTimeout(wrapper_splash_shadows_move, 20);
}

function fitTitle(elem) {
  var title = document.getElementById("ad_title");
  console.log(title);

  var curSize = 1.25;
  while (title.scrollHeight > 28 && curSize > 0.5) {
    curSize -= 0.1;
    var styleAttr = document.createAttribute("style");
    styleAttr.value = "font-size: " + curSize + "em;line-height: " + curSize + "em";
    title.setAttributeNode(styleAttr);
  }
}

console.log("wrapper - html writing...");
document.write('<div id="ad_header"><div id="ad_header_logo" style="display:none"></div><div id="ad_title">' + ad_title + '</div><div id="close_timer" style="display:none"></div><div id="close_zone" style="display:none"><div class="close-button"></div></div></div><div id="orientation"></div>');
if (!ad_has_custom_load_screen) {
  document.write('<div id="splash"><div id="splash_icon_wrap"><a href="' + ad_click_dest + '&sub12=splash"><img src="' + ad_splash_image + '" id="splash_icon"/></a></div><div id="splash_wait" lang="' + localization.getLanguage() + '">' + localization.get('Mini game loading, please wait...') + '</div><div id="splash_loading"><div id="splash_loading_bar"></div><div id="splash_loading_bar_full"></div></div><div id="splash_footer"><div id="splash_footer_logo"></div></div></div>');
}
console.log("wrapper - html written");
fitTitle();

if (query_params['dev_nomraid']) {
  console.log("dev_nomraid showAd");
  showAd();
} else {
  if (mraid.getState() != 'ready') {
    console.log("MRAID Ad: adding event listener for ready");
    mraid.addEventListener('ready', function() { setupMraid('ready') });
  } else {
    console.log("MRAID default ready");
    setupMraid('default');
  }
}


console.log("wrapper - end");