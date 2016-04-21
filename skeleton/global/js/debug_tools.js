var DebugTools = function() {
  this.consoleLogs = [];
};

DebugTools.prototype.init = function() {
  // set timer to attempt writing out console logs to remote server after a
  // bit of time has elapsed, giving the ad enough time to do some setup work.
  var ths = this;
  setTimeout(function() {ths.remoteLog()}, 3000);
}

// record a line of console log output
DebugTools.prototype.record = function(message, arguments) {
  //this.consoleLogs.push(message);
  for (var i = 0; i < arguments.length; i++)
    this.consoleLogs.push(arguments[i].toString());
}

// send the captured console log messages to a remote server
DebugTools.prototype.remoteLog = function() {
  var url = ad_logroot + "/log_string?bin=" + encodeURIComponent(ad_name + ".console");
  var req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  var text = this.consoleLogs.join("\n");
  req.send('s=' + encodeURIComponent(text));
}


var debugTools = new DebugTools();
debugTools.init();


// redefine console.log/warn/error so we can capture all console.log calls
(function() {
  var exLog = console.log;
  console.log = function(msg) {
    exLog.apply(this, arguments);
    debugTools.record(msg, arguments);
  }
})();

(function() {
  var exLog = console.warn;
  console.warn = function(msg) {
    exLog.apply(this, arguments);
    debugTools.record(msg, arguments);
  }
})();

(function() {
  var exLog = console.error;
  console.error = function(msg) {
    exLog.apply(this, arguments);
    debugTools.record(msg, arguments);
  }
})();

// capture onerror as well
window.onerror = function(message, url, lineNumber) {
  console.log("onerror: " + message + "    url: " + url + "   line: " + lineNumber);
  return false; // let the error continue
};