/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/capture.js":
/*!********************************!*\
  !*** ./src/content/capture.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Handle selecting cells with mouse

var M = (module.exports = {});

var dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  cell = __webpack_require__(/*! ../lib/cell */ "./src/lib/cell.js"),
  event = __webpack_require__(/*! ../lib/event */ "./src/lib/event.js"),
  message = __webpack_require__(/*! ../lib/message */ "./src/lib/message.js"),
  preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js"),
  infobox = __webpack_require__(/*! ./infobox */ "./src/content/infobox.js"),
  table = __webpack_require__(/*! ./table */ "./src/content/table.js"),
  scroller = __webpack_require__(/*! ./scroller */ "./src/content/scroller.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:15
M.Capture = function () {
  this.anchorPoint = null;
  this.table = null;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:20
M.Capture.prototype.markRect = function (evt) {
  var cx = evt.clientX,
    cy = evt.clientY;

  var p = this.scroller.adjustPoint(this.anchorPoint);

  var rect = [
    Math.min(cx, p.x),
    Math.min(cy, p.y),
    Math.max(cx, p.x),
    Math.max(cy, p.y),
  ];

  var big = 10e6;

  if (this.mode === "column" || this.mode === "table") {
    rect[1] = -big;
    rect[3] = +big;
  }

  if (this.mode === "row" || this.mode === "table") {
    rect[0] = -big;
    rect[2] = +big;
  }

  return rect;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:48
M.Capture.prototype.setCaptured = function (rect) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:49
  dom.cells(this.table).forEach(function (td) {
    cell.unmark(td);
    if (util.intersect(dom.bounds(td).rect, rect)) {
      cell.mark(td);
    }
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:57
M.Capture.prototype.setLocked = function (rect, canSelect) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:58
  dom.cells(this.table).forEach(function (td) {
    cell.unlock(td);
    if (util.intersect(dom.bounds(td).rect, rect)) {
      if (!canSelect) {
        cell.unselect(td);
        cell.lock(td);
      }
    }
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:69
M.Capture.prototype.selection = function () {
  var self = this,
    tds = cell.findSelected(self.table);

  if (!self.selectedCells) {
    return [true, (self.selectedCells = tds)];
  }

  if (tds.length !== self.selectedCells.length) {
    return [true, (self.selectedCells = tds)];
  }

  var eq = true;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:83
  tds.forEach(function (td, i) {
    eq = eq && td === self.selectedCells[i];
  });

  if (!eq) {
    return [true, (self.selectedCells = tds)];
  }

  return [false, self.selectedCells];
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:94
M.Capture.prototype.start = function (evt, mode, extend) {
  var t = table.locate(evt.target);

  this.table = t.table;
  this.scroller = new scroller.Scroller(t.td);
  this.mode = mode;
  this.extend = extend;

  if (!this.anchorPoint) extend = false;

  if (!extend) {
    this.anchorPoint = {
      x: dom.bounds(t.td).x + 1,
      y: dom.bounds(t.td).y + 1,
    };
    this.setLocked(this.markRect(evt), !cell.selected(t.td));
  }

  var self = this;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:114
  var tracker = function (type, evt) {
    if (type === "move") self.scroller.reset();
    self.scroller.scroll(evt);
    self.setCaptured(self.markRect(evt));
    infobox.update(self.table);

    if (type === "up") {
      self.onDone(self.table);
    }
  };

  event.trackMouse(evt, tracker);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:128
M.Capture.prototype.stop = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\capture.js:129
  dom.find("td, th").forEach(function (td) {
    cell.unmark(td);
    cell.unlock(td);
  });
};


/***/ }),

/***/ "./src/content/index.js":
/*!******************************!*\
  !*** ./src/content/index.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Content script main

var M = (module.exports = {});

var preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js"),
  keyboard = __webpack_require__(/*! ../lib/keyboard */ "./src/lib/keyboard.js"),
  event = __webpack_require__(/*! ../lib/event */ "./src/lib/event.js"),
  message = __webpack_require__(/*! ../lib/message */ "./src/lib/message.js"),
  dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js"),
  capture = __webpack_require__(/*! ./capture */ "./src/content/capture.js"),
  infobox = __webpack_require__(/*! ./infobox */ "./src/content/infobox.js"),
  selection = __webpack_require__(/*! ./selection */ "./src/content/selection.js"),
  table = __webpack_require__(/*! ./table */ "./src/content/table.js"),
  loader = __webpack_require__(/*! ./loader */ "./src/content/loader.js");

var mouseButton = 0,
  currentCapture = null;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:20
function parseEvent(evt) {
  var key = keyboard.key(evt),
    emod = preferences.int("modifier.extend"),
    mods = key.modifiers.code,
    kmods = mods & ~emod;

  if (
    preferences.val("capture.enabled") &&
    preferences.val("_captureMode") &&
    !kmods
  ) {
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\index.js",31,"got capture", preferences.val("_captureMode"), mods & emod));
    return [preferences.val("_captureMode"), mods & emod];
  }

  if (!key.scan.code && kmods) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:36
    var cap = util.first(preferences.captureModes(), function (m) {
      return kmods === preferences.int("modifier." + m.id);
    });

    if (cap) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\index.js",41,"got modifier", cap.id, mods & emod));
      return [cap.id, mods & emod];
    }
  }
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:47
function destroyCapture() {
  if (currentCapture) {
    currentCapture.stop();
    currentCapture = null;
  }
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:54
function captureDone(tbl) {
  table.selectCaptured(tbl);
  if (preferences.val("capture.reset")) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:57
    preferences.set("_captureMode", "").then(function () {
      message.background("preferencesUpdated");
    });
  }
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:63
function startCapture(evt, mode, extend) {
  var t = table.locate(evt.target);

  if (!t) {
    destroyCapture();
    return false;
  }

  if (currentCapture && currentCapture.table !== t.table) {
    destroyCapture();
    extend = false;
  }

  if (currentCapture) {
    currentCapture.stop();
  }

  currentCapture = currentCapture || new capture.Capture();

  currentCapture.onDone = captureDone;

  selection.start(evt.target);
  currentCapture.start(evt, mode, extend);
}

var copyLock = false,
  copyWaitTimeout = 300,
  copyWaitTimer = 0;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:92
function beginCopy(msg) {
  var tbl = selection.table(),
    hasSelection = true;

  if (!tbl) {
    if (msg.broadcast) return null;
    var el = event.lastTarget(),
      t = table.locate(el);
    if (!t) return null;
    tbl = t.table;
    hasSelection = false;
  }

  copyLock = true;
  var data = table.copy(tbl, msg.options, hasSelection);

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:108
  copyWaitTimer = setTimeout(function () {
    dom.attr(document.body, "data-copytables-wait", 1);
  }, copyWaitTimeout);

  return data;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:115
function endCopy() {
  copyLock = false;
  clearTimeout(copyWaitTimer);
  dom.removeAttr(document.body, "data-copytables-wait");
}

var eventListeners = {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:122
  mousedownCapture: function (evt) {
    event.register(evt);

    if (evt.button !== mouseButton) {
      return;
    }

    var p = parseEvent(evt);
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\index.js",130,"parseEvent=", p));

    if (!p || !selection.selectable(evt.target)) {
      message.background("dropAllSelections");
      return;
    }

    window.focus();
    startCapture(evt, p[0], p[1]);
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:141
  copy: function (evt) {
    if (selection.active() && !copyLock) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\index.js",143,"COPY MINE"));
      message.background("genericCopy");
      event.reset(evt);
    } else if (copyLock) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\index.js",147,"COPY LOCKED"));
      event.reset(evt);
    } else {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\index.js",150,"COPY PASS"));
    }
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:154
  contextmenu: function (evt) {
    event.register(evt);

    message.background({
      name: "contextMenu",
      selectable: selection.selectable(evt.target),
      selected: selection.active(),
    });
  },
};

var messageListeners = {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:166
  dropSelection: function () {
    if (selection.table()) {
      selection.drop();
    }
    // hide infobox once a selection is dropped
    // this means users won't be able to click and copy from the infobox
    infobox.remove();
  },

  preferencesUpdated: preferences.load,

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:177
  enumTables: function (msg) {
    return table.enum(selection.table());
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:181
  selectTableByIndex: function (msg) {
    var tbl = table.byIndex(msg.index);
    if (tbl) {
      selection.select(tbl, "table");
      tbl.scrollIntoView(true);
      infobox.update(selection.table());
    }
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:190
  selectFromContextMenu: function (msg) {
    var el = event.lastTarget(),
      t = table.locate(el);

    if (t) {
      selection.toggle(t.td, msg.mode);
    } else if (msg.mode === "table") {
      selection.toggle(dom.closest(el, "table"), "table");
    }

    infobox.update(selection.table());
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:203
  tableIndexFromContextMenu: function () {
    var el = event.lastTarget(),
      tbl = dom.closest(el, "table");
    return tbl ? table.indexOf(tbl) : null;
  },

  beginCopy: beginCopy,
  endCopy: endCopy,

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:212
  endCopyFailed: function () {
    if (copyLock) {
      // inform the user that copy/paste failed
      console.error("Sorry, CopyTables was unable to copy this table.");
    }
    endCopy();
  },
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:221
function init() {
  event.listen(document, eventListeners);
  message.listen(messageListeners);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:226
M.main = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\index.js:227
  loader.load().then(function () {
    if (!document.body) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\index.js",229,"no body", document.URL));
      return;
    }
    preferences.load().then(init);
  });
};


/***/ }),

/***/ "./src/content/infobox.js":
/*!********************************!*\
  !*** ./src/content/infobox.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:1
/// Display diverse functions when dragging over a table

var M = (module.exports = {});

var cell = __webpack_require__(/*! ../lib/cell */ "./src/lib/cell.js"),
  dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  event = __webpack_require__(/*! ../lib/event */ "./src/lib/event.js"),
  preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js"),
  number = __webpack_require__(/*! ../lib/number */ "./src/lib/number.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:11
function getValue(td, fmt) {
  var val = { text: "", number: 0, isNumber: false };

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:14
  dom.textContentItems(td).some(function (t) {
    var n = number.extract(t, fmt);
    if (n !== null) {
      return (val = { text: t, number: n, isNumber: true });
    }
  });

  return val;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:24
function data(tbl) {
  if (!tbl) {
    return null;
  }

  var cells = cell.findSelected(tbl);

  if (!cells || !cells.length) {
    return null;
  }

  var fmt = preferences.numberFormat();
  var values = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:38
  cells.forEach(function (td) {
    values.push(getValue(td, fmt));
  });

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:42
  return preferences.infoFunctions().map(function (f) {
    return {
      title: f.name + ":",
      message: f.fn(values),
    };
  });
}

var boxId = "__copytables_infobox__",
  pendingContent = null,
  timer = 0,
  freq = 500;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:55
function getBox() {
  return dom.findOne("#" + boxId);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:59
function setTimer() {
  if (!timer) timer = setInterval(draw, freq);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:63
function clearTimer() {
  clearInterval(timer);
  timer = 0;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:68
function html(items, sticky) {
  var h = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:71
  items.forEach(function (item) {
    if (item.message !== null)
      h.push(" <b>" + item.title + "<i>" + item.message + "</i></b>");
  });

  h = h.join("");

  if (sticky) {
    h += "<span>&times;</span>";
  } else {
    h += "<b></b>";
  }

  return h;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:87
function init() {
  var box = dom.create("div", {
    id: boxId,
    "data-position": preferences.val("infobox.position") || "0",
  });
  document.body.appendChild(box);

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:94
  box.addEventListener("click", function (e) {
    if (dom.tag(e.target) === "SPAN") hide();
  });

  return box;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:101
function draw() {
  if (!pendingContent) {
    //console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\infobox.js",103,'no pendingContent'));
    clearTimer();
    return;
  }

  if (pendingContent === "hide") {
    //console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\infobox.js",109,'removed'));
    dom.remove([getBox()]);
    clearTimer();
    return;
  }

  var box = getBox() || init();

  dom.removeClass(box, "hidden");
  box.innerHTML = pendingContent;

  pendingContent = null;
  //console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\infobox.js",121,'drawn'));
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:124
function show(items) {
  var p = html(items, preferences.val("infobox.sticky"));

  if (p === pendingContent) {
    //console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\infobox.js",128,'same content'));
    return;
  }

  if (pendingContent) {
    //console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\infobox.js",133,'queued'));
  }

  pendingContent = p;
  setTimer();
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:140
function hide() {
  //console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\infobox.js",141,'about to remove...'));
  pendingContent = "hide";
  dom.addClass(getBox(), "hidden");
  setTimer();
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:147
M.update = function (tbl) {
  if (preferences.val("infobox.enabled")) {
    var d = data(tbl);
    if (d && d.length) show(d);
  }
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\infobox.js:154
M.remove = function () {
  if (!preferences.val("infobox.sticky")) {
    hide();
  }
};


/***/ }),

/***/ "./src/content/loader.js":
/*!*******************************!*\
  !*** ./src/content/loader.js ***!
  \*******************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\loader.js:3
M.load = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\loader.js:4
  return new Promise(function (resolve) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\loader.js:5
    function ready() {
      return (
        document &&
        (document.readyState === "interactive" ||
          document.readyState === "complete")
      );
    }

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\loader.js:13
    function onload(e) {
      if (ready()) {
        console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\loader.js",15,"loaded", document.readyState, document.URL));
        document.removeEventListener("readystatechange", onload);
        resolve();
      }
    }

    if (ready()) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\loader.js",22,"ready", document.readyState, document.URL));
      return resolve();
    }

    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\loader.js",26,"not loaded", document.readyState, document.URL));
    document.addEventListener("readystatechange", onload);
  });
};


/***/ }),

/***/ "./src/content/scroller.js":
/*!*********************************!*\
  !*** ./src/content/scroller.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  event = __webpack_require__(/*! ../lib/event */ "./src/lib/event.js"),
  preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:7
function isScrollable(el) {
  var css = window.getComputedStyle(el);
  if (
    !css.overflowX.match(/scroll|auto/) &&
    !css.overflowY.match(/scroll|auto/)
  )
    return false;
  return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:17
function closestScrollable(el) {
  while (el && el !== document.body && el !== document.documentElement) {
    if (isScrollable(el)) return el;
    el = el.parentNode;
  }
  return null;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:25
function position(base) {
  return base
    ? { x: base.scrollLeft, y: base.scrollTop }
    : { x: window.scrollX, y: window.scrollY };
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:31
M.Scroller = function (el) {
  (this.base = closestScrollable(el.parentNode)),
    (this.anchor = position(this.base));
  this.reset();
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:37
M.Scroller.prototype.reset = function () {
  this.amount = preferences.int("scroll.amount");
  this.acceleration = preferences.int("scroll.acceleration");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:42
M.Scroller.prototype.adjustPoint = function (pt) {
  var p = position(this.base);
  return {
    x: pt.x + this.anchor.x - p.x,
    y: pt.y + this.anchor.y - p.y,
  };
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:50
M.Scroller.prototype.scroll = function (e) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\scroller.js:51
  function adjust(a, sx, sy, ww, hh, cx, cy) {
    if (cx < a) sx -= a;
    if (cx > ww - a) sx += a;
    if (cy < a) sy -= a;
    if (cy > hh - a) sy += a;
    return { x: sx, y: sy };
  }

  if (this.base) {
    var b = dom.bounds(this.base);
    var p = adjust(
      this.amount,
      this.base.scrollLeft,
      this.base.scrollTop,
      this.base.clientWidth,
      this.base.clientHeight,
      e.clientX - b.x,
      e.clientY - b.y
    );

    this.base.scrollLeft = p.x;
    this.base.scrollTop = p.y;
  } else {
    var p = adjust(
      this.amount,
      window.scrollX,
      window.scrollY,
      window.innerWidth,
      window.innerHeight,
      e.clientX,
      e.clientY
    );

    if (p.x != window.scrollX || p.y != window.scrollY) {
      window.scrollTo(p.x, p.y);
    }
  }

  this.amount = Math.max(
    1,
    Math.min(100, this.amount + this.amount * (this.acceleration / 100))
  );
};


/***/ }),

/***/ "./src/content/selection.js":
/*!**********************************!*\
  !*** ./src/content/selection.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Selection tools.

var M = (module.exports = {});

var dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  message = __webpack_require__(/*! ../lib/message */ "./src/lib/message.js"),
  cell = __webpack_require__(/*! ../lib/cell */ "./src/lib/cell.js"),
  table = __webpack_require__(/*! ./table */ "./src/content/table.js"),
  infobox = __webpack_require__(/*! ./infobox */ "./src/content/infobox.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:11
function cellsToSelect(el, mode) {
  if (mode === "table") {
    var tbl = dom.closest(el, "table");
    return tbl ? dom.cells(tbl) : [];
  }

  var t = table.locate(el);

  if (!t) {
    return [];
  }

  if (mode === "cell") {
    return [t.td];
  }

  var sel = dom.bounds(t.td);

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:29
  return dom.cells(t.table).filter(function (td) {
    var b = dom.bounds(td);

    switch (mode) {
      case "column":
        return sel.x === b.x;
      case "row":
        return sel.y === b.y;
    }
  });
}

var excludeElements = "a, input, button, textarea, select, img";

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:43
M.selectable = function (el) {
  return !!(
    el &&
    dom.closest(el, "table") &&
    !dom.closest(el, excludeElements)
  );
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:51
M.selected = function (el) {
  var t = table.locate(el);
  return t && cell.selected(t.td);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:56
M.drop = function () {
  dom.find("td, th").forEach(cell.reset);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:60
M.active = function () {
  return !!cell.find("selected").length;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:64
M.table = function () {
  var cs = cell.find("selected");
  return cs.length ? dom.closest(cs[0], "table") : null;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:69
M.start = function (el) {
  var t = table.locate(el);

  if (!t) {
    return false;
  }

  window.getSelection().removeAllRanges();
  message.background("dropOtherSelections");

  if (M.table() !== t.table) {
    M.drop();
  }

  return true;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:86
M.select = function (el, mode) {
  if (dom.is(el, "table")) el = dom.cells(el)[0];
  if (el && M.start(el)) {
    var tds = cellsToSelect(el, mode);
    tds.forEach(cell.select);
  }
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\selection.js:94
M.toggle = function (el, mode) {
  if (dom.is(el, "table")) el = dom.cells(el)[0];
  if (el && M.start(el)) {
    var tds = cellsToSelect(el, mode),
      fn = tds.every(cell.selected) ? cell.reset : cell.select;
    tds.forEach(fn);
  }
};


/***/ }),

/***/ "./src/content/table.js":
/*!******************************!*\
  !*** ./src/content/table.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  cell = __webpack_require__(/*! ../lib/cell */ "./src/lib/cell.js"),
  css = __webpack_require__(/*! ../lib/css */ "./src/lib/css.js"),
  event = __webpack_require__(/*! ../lib/event */ "./src/lib/event.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:9
function listTables() {
  var all = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:12
  dom.find("table").forEach(function (tbl, n) {
    if (!dom.cells(tbl).length || !dom.visible(tbl)) return;
    all.push({
      index: n,
      table: tbl,
    });
  });

  return all;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:23
M.locate = function (el) {
  var td = dom.closest(el, "td, th"),
    tbl = dom.closest(td, "table");

  return td && tbl ? { td: td, table: tbl } : null;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:30
M.indexOf = function (tbl) {
  var res = -1;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:33
  listTables().forEach(function (r) {
    if (tbl === r.table) res = r.index;
  });

  return res;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:40
M.byIndex = function (index) {
  var res = null;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:43
  listTables().forEach(function (r) {
    if (index === r.index) res = r.table;
  });

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\table.js",47,"byIndex", res));
  return res;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:51
M.enum = function (selectedTable) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:52
  return listTables().map(function (r) {
    r.selected = r.table === selectedTable;
    delete r.table;
    return r;
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:59
M.copy = function (tbl, options, hasSelection) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\table.js",60,util.timeStart("table.copy")));

  var data = {
    hasSelection: hasSelection,
    url: document.location ? document.location.href : "",
  };

  if (hasSelection) {
    // lock selected cells to remove highlighting with no animation
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:69
    dom.cells(tbl).forEach(function (td) {
      if (cell.selected(td)) {
        cell.lock(td);
      }
    });
  }

  if (options.method === "transfer") {
    data.css = {};

    if (options.keepStyles) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:80
      dom.findSelf("*", tbl).forEach(function (el, uid) {
        dom.attr(el, "data-copytables-uid", uid);
        data.css[uid] = css.read(el);
      });
    }

    data.html = tbl.outerHTML;

    if (options.keepStyles) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:89
      dom.findSelf("*", tbl).forEach(function (el) {
        dom.removeAttr(el, "data-copytables-uid");
      });
    }
  }

  if (options.method === "clipboard") {
    // work around "unselectable" tables

    var style = document.createElement("STYLE");
    style.type = "text/css";
    style.innerHTML =
      "* { user-select: auto !important; -webkit-user-select: auto !important }";
    document.body.appendChild(style);

    dom.select(tbl);

    // wrap copy in a capturing handler to work around copy-hijackers

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:108
    var copyHandler = function (evt) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\table.js",109,"COPY IN TABLE"));
      evt.stopPropagation();
    };

    document.addEventListener("copy", copyHandler, true);
    document.execCommand("copy");
    document.removeEventListener("copy", copyHandler, true);

    dom.deselect();
    document.body.removeChild(style);
  }

  if (hasSelection) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:122
    dom.cells(tbl).forEach(function (td) {
      if (cell.selected(td)) {
        cell.unlock(td);
      }
    });
  }

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\table.js",129,"table.copy method=" + options.method));
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\content\\table.js",130,util.timeEnd("table.copy")));

  return data;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:135
M.selectCaptured = function (tbl) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content\table.js:136
  dom.cells(tbl).forEach(function (td) {
    if (cell.locked(td)) {
      cell.reset(td);
    } else if (cell.marked(td)) {
      cell.unmark(td);
      cell.select(td);
    }
  });
};


/***/ }),

/***/ "./src/lib/cell.js":
/*!*************************!*\
  !*** ./src/lib/cell.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Get/set table cell state

var M = (module.exports = {});

var dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js");

var prefix = "data-copytables-";

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:9
M.set = function (td, state) {
  return td && td.setAttribute(prefix + state, "1");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:13
M.is = function (td, state) {
  return td && td.hasAttribute(prefix + state);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:17
M.clear = function (td, state) {
  return td && td.removeAttribute(prefix + state);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:21
M.select = function (td) {
  return M.set(td, "selected");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:25
M.selected = function (td) {
  return M.is(td, "selected");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:29
M.unselect = function (td) {
  return M.clear(td, "selected");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:33
M.mark = function (td) {
  return M.set(td, "marked");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:37
M.marked = function (td) {
  return M.is(td, "marked");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:41
M.unmark = function (td) {
  return M.clear(td, "marked");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:45
M.lock = function (td) {
  return M.set(td, "locked");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:49
M.locked = function (td) {
  return M.is(td, "locked");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:53
M.unlock = function (td) {
  return M.clear(td, "locked");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:57
M.find = function (states, where) {
  var sel = states
    .split(",")
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:60
    .map(function (s) {
      return "[" + prefix + s.trim() + "]";
    })
    .join(",");
  return dom.find(sel, where);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:67
M.findSelected = function (where) {
  var sel = "[{}selected]:not([{}locked]), [{}marked]:not([{}locked])".replace(
    /{}/g,
    prefix
  );
  return dom.find(sel, where);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\cell.js:75
M.reset = function (td) {
  td.removeAttribute(prefix + "selected");
  td.removeAttribute(prefix + "marked");
  td.removeAttribute(prefix + "locked");
};


/***/ }),

/***/ "./src/lib/css.js":
/*!************************!*\
  !*** ./src/lib/css.js ***!
  \************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// CSS tools

var M = (module.exports = {});

var ignore = /^(width|height|display)$|^(-webkit|animation|motion)|-origin$/,
  props = null;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\css.js:8
M.read = function (el) {
  var cs = window.getComputedStyle(el);

  if (!props) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\css.js:12
    props = [].filter.call(cs, function (p) {
      return !ignore.test(p);
    });
  }

  var res = {};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\css.js:19
  props.forEach(function (p) {
    var val = cs.getPropertyValue(p);
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\css.js:21
    res[p] = val.replace(/\b(\d+\.\d+)(?=px\b)/g, function ($0, $1) {
      return Math.round(parseFloat($1));
    });
  });

  if (cs.getPropertyValue("display") === "none") {
    res["display"] = "none";
  }

  return res;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\css.js:33
M.compute = function (defaults, custom) {
  var rules = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\css.js:36
  Object.keys(custom).forEach(function (k) {
    if (custom[k] !== defaults[k]) {
      rules.push(k + ":" + custom[k]);
    }
  });

  return rules.join("; ");
};


/***/ }),

/***/ "./src/lib/dom.js":
/*!************************!*\
  !*** ./src/lib/dom.js ***!
  \************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Basic DOM library

var M = (module.exports = {});

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:5
function toArray(coll) {
  return Array.prototype.slice.call(coll || [], 0);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:9
function each(coll, fn) {
  Array.prototype.forEach.call(coll || [], fn);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:13
M.is = function (el, sel) {
  return el && el.matches && el.matches(sel);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:17
M.visible = function (el) {
  return el && !!(el.offsetHeight || el.offsetWidth);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:21
M.findOne = function (sel, where) {
  return (where || document).querySelector(sel);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:25
M.find = function (sel, where) {
  return (where || document).querySelectorAll(sel);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:29
M.tag = function (el) {
  if (!el || !el.tagName) return "";
  return String(el.tagName).toUpperCase();
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:34
M.indexOf = function (el, sel, where) {
  var idx = -1;
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:36
  M.find(sel, where).forEach(function (e, n) {
    if (e === el) {
      idx = n;
    }
  });
  return idx;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:44
M.nth = function (n, sel, where) {
  return M.find(sel, where).item(n);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:48
M.attr = function (el, name, value) {
  if (!el || !el.getAttribute) {
    return null;
  }
  if (arguments.length === 2) {
    return el.getAttribute(name);
  }
  if (value === null) {
    return el.removeAttribute(name);
  }
  return el.setAttribute(name, value);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:61
M.removeAttr = function (el, name) {
  if (el && el.removeAttribute) {
    el.removeAttribute(name);
  }
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:67
M.findSelf = function (sel, where) {
  return [where || document].concat(toArray(M.find(sel, where)));
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:71
M.rows = function (tbl) {
  if (tbl && tbl.rows) {
    return toArray(tbl.rows);
  }
  return [];
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:78
M.cells = function (tbl) {
  var ls = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:81
  M.rows(tbl).forEach(function (tr) {
    ls = ls.concat(toArray(tr.cells));
  });

  return ls;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:88
M.remove = function (els) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:89
  els.forEach(function (el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:94
M.closest = function (el, sel) {
  while (el && el.matches) {
    if (el.matches(sel)) return el;
    el = el.parentNode;
  }
  return null;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:102
M.contains = function (parent, el) {
  while (el) {
    if (el === parent) return true;
    el = el.parentNode;
  }
  return false;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:110
M.bounds = function (el) {
  var r = el.getBoundingClientRect();
  return {
    x: r.left,
    y: r.top,
    right: r.right,
    bottom: r.bottom,
    rect: [r.left, r.top, r.right, r.bottom],
  };
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:121
M.offset = function (el) {
  var r = { x: 0, y: 0 };
  while (el) {
    r.x += el.offsetLeft;
    r.y += el.offsetTop;
    el = el.offsetParent;
  }
  return r;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:131
M.addClass = function (el, cls) {
  return el && el.classList && el.classList.add(cls);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:135
M.removeClass = function (el, cls) {
  return el && el.classList && el.classList.remove(cls);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:139
M.hasClass = function (el, cls) {
  return el && el.classList && el.classList.contains(cls);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:143
function _strip(s) {
  return String(s || "").replace(/^\s+|\s+$/g, "");
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:147
M.textContentItems = function (node) {
  var c = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:150
  function walk(n) {
    if (!n) return;
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\dom.js",152,String(n.tagName)))
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\dom.js",153,String(n.nodeType)))
    if (n.nodeType === 3) {
      var t = _strip(n.textContent);
      
      if (t.length) c.push(t);
      return;
    }
    else if (n.nodeType === 1 && String(n.tagName) === 'IMG') {
      // get alt first
      var t
      if (n.alt) t = _strip(n.alt);
      else if (n.title) t = _strip(n.title);

      if (t.length) c.push(t);
      return;
    }
    

    if (!M.visible(n)) {
      return;
    }

    (n.childNodes || []).forEach(walk);
  }
 
  walk(node);
  return c;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:182
M.textContent = function (node) {
  return _strip(M.textContentItems(node).join(" "));
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:186
M.htmlContent = function (node) {
  if (!node) return "";
  return _strip(node.innerHTML);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:191
M.deselect = function () {
  var selection = window.getSelection();
  selection.removeAllRanges();
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:196
M.select = function (el) {
  var range = document.createRange();
  var selection = window.getSelection();
  selection.removeAllRanges();

  range.selectNodeContents(el);
  selection.addRange(range);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:205
M.create = function (tag, atts) {
  var e = document.createElement(tag);
  if (atts) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\dom.js:208
    Object.keys(atts).forEach(function (a) {
      e.setAttribute(a, atts[a]);
    });
  }
  return e;
};


/***/ }),

/***/ "./src/lib/event.js":
/*!**************************!*\
  !*** ./src/lib/event.js ***!
  \**************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Basic events library

var M = (module.exports = {});

var lastEvent = null;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:7
M.register = function (evt) {
  lastEvent = evt;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:11
M.last = function () {
  return lastEvent;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:15
M.lastTarget = function () {
  return lastEvent ? lastEvent.target : null;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:19
M.reset = function (evt) {
  evt.stopPropagation();
  evt.preventDefault();
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:24
M.listen = function (target, listeners) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:25
  Object.keys(listeners).forEach(function (key) {
    var m = key.match(/^(\w+?)(Capture)?$/);
    (target || document).addEventListener(m[1], listeners[key], !!m[2]);
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:31
M.unlisten = function (target, listeners) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:32
  Object.keys(listeners).forEach(function (key) {
    var m = key.match(/^(\w+?)(Capture)?$/);
    (target || document).removeEventListener(m[1], listeners[key], !!m[2]);
  });
};

var tracker = {
  active: false,
  lastEvent: null,
  timer: 0,
  freq: 5,
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:45
M.trackMouse = function (evt, fn) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:46
  function watch() {
    fn("tick", tracker.lastEvent);
    tracker.timer = setTimeout(watch, tracker.freq);
  }

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:51
  function reset() {
    clearInterval(tracker.timer);
    tracker.active = false;
    M.unlisten(document, listeners);
  }

  var listeners = {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:58
    mousemove: function (evt) {
      M.reset(evt);
      tracker.lastEvent = evt;

      if (evt.buttons === 1) {
        clearTimeout(tracker.timer);
        fn("move", tracker.lastEvent);
        watch();
      } else {
        reset();
        fn("up", evt);
      }
    },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\event.js:72
    mouseup: function (evt) {
      M.reset(evt);
      tracker.lastEvent = evt;
      reset();
      fn("up", evt);
    },
  };

  if (tracker.active) {
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\event.js",81,"mouse tracker already active"));
    reset();
  }

  tracker.active = true;
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\event.js",86,"mouse tracker started"));

  M.listen(document, listeners);
  listeners.mousemove(evt);
};


/***/ }),

/***/ "./src/lib/keyboard.js":
/*!*****************************!*\
  !*** ./src/lib/keyboard.js ***!
  \*****************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Keyboard events and keys

var M = (module.exports = {});

M.mac = navigator.userAgent.indexOf("Macintosh") > 0;
M.win = navigator.userAgent.indexOf("Windows") > 0;

M.modifiers = {
  SHIFT: 1 << 10,
  CTRL: 1 << 11,
  ALT: 1 << 12,
  META: 1 << 13,
};

M.mouseModifiers = {};

if (M.mac)
  M.mouseModifiers = [M.modifiers.SHIFT, M.modifiers.ALT, M.modifiers.META];
else if (M.win)
  M.mouseModifiers = [M.modifiers.SHIFT, M.modifiers.ALT, M.modifiers.CTRL];
else
  M.mouseModifiers = [
    M.modifiers.SHIFT,
    M.modifiers.ALT,
    M.modifiers.CTRL,
    M.modifiers.META,
  ];

M.modNames = {};

M.modNames[M.modifiers.CTRL] = "Ctrl";
M.modNames[M.modifiers.ALT] = M.mac ? "Opt" : "Alt";
M.modNames[M.modifiers.META] = M.mac ? "Cmd" : M.win ? "Win" : "Meta";
M.modNames[M.modifiers.SHIFT] = "Shift";

M.modHTMLNames = {};

M.modHTMLNames[M.modifiers.CTRL] = M.mac
  ? "&#x2303; control"
  : M.modNames[M.modifiers.CTRL];
M.modHTMLNames[M.modifiers.ALT] = M.mac
  ? "&#x2325; option"
  : M.modNames[M.modifiers.ALT];
M.modHTMLNames[M.modifiers.META] = M.mac
  ? "&#x2318; command"
  : M.modNames[M.modifiers.META];
M.modHTMLNames[M.modifiers.SHIFT] = M.mac
  ? "&#x21E7; shift"
  : M.modNames[M.modifiers.SHIFT];

M.keyNames = {
  8: "Backspace",
  9: "Tab",
  13: "Enter",
  19: "Break",
  20: "Caps",
  27: "Esc",
  32: "Space",
  33: "PgUp",
  34: "PgDn",
  35: "End",
  36: "Home",
  37: "Left",
  38: "Up",
  39: "Right",
  40: "Down",
  45: "Ins",
  46: "Del",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",
  93: "Select",
  96: "Num0",
  97: "Num1",
  98: "Num2",
  99: "Num3",
  100: "Num4",
  101: "Num5",
  102: "Num6",
  103: "Num7",
  104: "Num8",
  105: "Num9",
  106: "Num*",
  107: "Num+",
  109: "Num-",
  110: "Num.",
  111: "Num/",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "(",
  220: "\\",
  221: ")",
  222: "'",
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\keyboard.js:148
M.keyCode = function (name) {
  var code;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\keyboard.js:151
  Object.keys(M.keyNames).some(function (c) {
    if (M.keyNames[c] === name) {
      return (code = c);
    }
  });

  return code;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\keyboard.js:160
M.key = function (e) {
  var mods =
    (M.modifiers.ALT * e.altKey) |
    (M.modifiers.CTRL * e.ctrlKey) |
    (M.modifiers.META * e.metaKey) |
    (M.modifiers.SHIFT * e.shiftKey);

  var scan = e.keyCode,
    sname = M.keyNames[scan],
    mname = [],
    cname = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\keyboard.js:172
  Object.keys(M.modifiers).forEach(function (m) {
    if (mods & M.modifiers[m]) {
      mname.push(M.modNames[M.modifiers[m]]);
    }
  });

  mname = mname.join(" ");

  var r = {
    modifiers: { code: 0, name: "" },
    scan: { code: 0, name: "" },
  };

  if (mname) {
    r.modifiers = { code: mods, name: mname };
    cname.push(mname);
  }

  if (sname) {
    r.scan = { code: scan, name: sname };
    cname.push(sname);
  }

  r.code = mods | scan;
  r.name = cname.join(" ");

  return r;
};


/***/ }),

/***/ "./src/lib/message.js":
/*!****************************!*\
  !*** ./src/lib/message.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Wrappers for browser.sendMessage

var M = (module.exports = {});

var util = __webpack_require__(/*! ./util */ "./src/lib/util.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:7
function convertMessage(msg) {
  if (typeof msg !== "object") {
    return { name: msg };
  }
  return msg;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:14
function convertSender(sender) {
  if (!sender) {
    return {};
  }
  if (typeof sender !== "object") {
    return sender;
  }
  var k = Object.keys(sender);
  if (k.length === 1 && k[0] === "id") {
    return "background";
  }
  if (sender.tab) {
    var p = Object.assign({}, sender);
    p.tabId = sender.tab.id;
    return p;
  }
  return sender;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:33
function toBackground(msg) {
  msg.to = "background";
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:35
  return util.callBrowserAsync("runtime.sendMessage", msg).then(function (res) {
    return { receiver: "background", data: res };
  });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:40
function toFrame(msg, frame) {
  msg.to = frame;
  return util
    .callBrowserAsync("tabs.sendMessage", frame.tabId, msg, {
      frameId: frame.frameId,
    })
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:46
    .then(function (res) {
      return { receiver: frame, data: res };
    });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:51
function toFrameList(msg, frames) {
  return Promise.all(
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:53
    frames.map(function (frame) {
      return toFrame(msg, frame);
    })
  );
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:59
M.enumFrames = function (tabFilter) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:60
  function framesInTab(tab) {
    return util
      .callBrowserAsync("webNavigation.getAllFrames", { tabId: tab.id })
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:63
      .then(function (frames) {
        if (!frames) {
          // Vivaldi, as of 1.8.770.56, doesn't support getAllFrames() properly
          // let's pretend there's only one top frame
          frames = [
            {
              errorOccurred: false,
              frameId: 0,
              parentFrameId: -1,
            },
          ];
        }
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:75
        return frames.map(function (f) {
          f.tabId = tab.id;
          return f;
        });
      });
  }

  if (tabFilter === "active") {
    tabFilter = { active: true, currentWindow: true };
  }

  return util
    .callBrowserAsync("tabs.query", tabFilter || {})
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:88
    .then(function (tabs) {
      return Promise.all(tabs.map(framesInTab));
    })
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:91
    .then(function (res) {
      return util.flatten(res);
    });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:96
M.background = function (msg) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\message.js",97,"MESSAGE: background", msg));
  return toBackground(convertMessage(msg));
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:101
M.frame = function (msg, frame) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\message.js",102,"MESSAGE: frame", msg, frame));
  return toFrame(convertMessage(msg), frame);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:106
M.allFrames = function (msg) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\message.js",107,"MESSAGE: allFrames", msg));
  msg = convertMessage(msg);
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:109
  return M.enumFrames("active").then(function (frames) {
    return toFrameList(msg, frames);
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:114
M.topFrame = function (msg) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\message.js",115,"MESSAGE: topFrame", msg));
  msg = convertMessage(msg);
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:117
  return M.enumFrames("active").then(function (frames) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:118
    var top = frames.filter(function (f) {
      return f.frameId === 0;
    });
    if (top.length) {
      return toFrame(msg, top[0]);
    }
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:127
M.broadcast = function (msg) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\message.js",128,"MESSAGE: broadcast", msg));
  msg = convertMessage(msg);
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:130
  return M.enumFrames().then(function (frames) {
    return toFrameList(msg, frames);
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:135
M.listen = function (listeners) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\message.js:136
  util.callBrowser("runtime.onMessage.addListener", function (msg, sender, fn) {
    if (listeners[msg.name]) {
      msg.sender = convertSender(sender);
      var res = listeners[msg.name](msg);
      return fn(res);
    }
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\message.js",142,"LOST", msg.name));
  });
};


/***/ }),

/***/ "./src/lib/number.js":
/*!***************************!*\
  !*** ./src/lib/number.js ***!
  \***************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Tools to work with numbers

var M = (module.exports = {});

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:5
function isDigit(s) {
  return s.match(/^\d+$/);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:9
function parseInteger(s) {
  if (!isDigit(s)) {
    return null;
  }
  var n = Number(s);
  return isDigit(String(n)) ? n : null;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:17
function parseFraction(s) {
  var n = parseInteger("1" + s);
  return n === null ? null : String(n).slice(1);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:22
function parseGrouped(s, fmt) {
  if (!fmt.group || s.indexOf(fmt.group) < 0) {
    return parseInteger(s);
  }

  var g = "\\" + fmt.group;
  var re = new RegExp("^\\d{1,3}(" + g + "\\d{2,3})*$");

  if (!s.match(re)) {
    return null;
  }

  return parseInteger(s.replace(/\D+/g, ""));
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:37
M.parse = function (s, fmt) {
  if (s[0] === "-") {
    var n = M.parse(s.slice(1), fmt);
    return n === null ? null : -n;
  }

  if (!fmt.decimal || s.indexOf(fmt.decimal) < 0) {
    return parseGrouped(s, fmt);
  }

  if (s === fmt.decimal) {
    return null;
  }

  var ds = s.split(fmt.decimal);

  if (ds.length === 1) {
    return parseGrouped(ds[0], fmt);
  }

  if (ds.length === 2) {
    var a = ds[0].length ? parseGrouped(ds[0], fmt) : 0;
    var b = ds[1].length ? parseFraction(ds[1]) : 0;

    if (a === null || b === null) {
      return null;
    }

    return Number(a + "." + b);
  }

  return null;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:71
M.extract = function (text, fmt) {
  if (!text) {
    return null;
  }

  text = String(text).replace(/^\s+|\s+$/g, "");
  if (!text) {
    return null;
  }

  var g = fmt.group ? "\\" + fmt.group : "";
  var d = fmt.decimal ? "\\" + fmt.decimal : "";

  var re = new RegExp("-?[\\d" + g + d + "]*\\d", "g");
  var m = text.match(re);

  if (!m || m.length !== 1) {
    return null;
  }

  var n = M.parse(m[0], fmt);
  if (n === null) {
    return null;
  }

  return n;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:99
M.defaultFormat = function () {
  var f = { group: ",", decimal: "." };

  try {
    // Intl and formatToParts might not be available...

    var nf = new Intl.NumberFormat();

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:107
    nf.formatToParts(123456.78).forEach(function (p) {
      if (String(p.type) === "group") f.group = p.value;
      if (String(p.type) === "decimal") f.decimal = p.value;
    });
    return f;
  } catch (e) {}

  try {
    var s = (123456.78).toLocaleString().replace(/\d/g, ""),
      len = s.length;

    f.decimal = len > 0 ? s[len - 1] : ".";
    f.group = len > 1 ? s[len - 2] : "";
    return f;
  } catch (e) {}

  return f;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\number.js:126
M.format = function (n, prec) {
  n = prec ? Number(n.toFixed(prec)) : Number(n);
  return (n || 0).toLocaleString();
};


/***/ }),

/***/ "./src/lib/preferences.js":
/*!********************************!*\
  !*** ./src/lib/preferences.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Preferences, stored in browser.storage

var M = (module.exports = {});

var keyboard = __webpack_require__(/*! ./keyboard */ "./src/lib/keyboard.js"),
  number = __webpack_require__(/*! ./number */ "./src/lib/number.js"),
  util = __webpack_require__(/*! ./util */ "./src/lib/util.js");

var firstMod = keyboard.modifiers.ALT,
  secondMod = keyboard.mac ? keyboard.modifiers.META : keyboard.modifiers.CTRL;

var defaults = {
  "modifier.cell": firstMod,
  "modifier.column": firstMod | secondMod,
  "modifier.row": 0,
  "modifier.table": 0,
  "modifier.extend": keyboard.modifiers.SHIFT,

  "capture.enabled": true,
  "capture.reset": false,

  "scroll.amount": 30,
  "scroll.acceleration": 5,

  "copy.format.enabled.richHTMLCSS": true,
  "copy.format.enabled.richHTML": true,
  "copy.format.enabled.textTabs": true,
  "copy.format.enabled.textTabsSwap": true,
  "copy.format.enabled.textCSV": true,
  "copy.format.enabled.textCSVSwap": true,
  "copy.format.enabled.textHTMLCSS": true,
  "copy.format.enabled.textHTML": true,
  "copy.format.enabled.textTextile": true,

  "copy.format.default.richHTMLCSS": true,

  "infobox.enabled": true,
  "infobox.position": "0",
};

var captureModes = [
  {
    id: "zzz",
    name: "Off",
  },
  {
    id: "cell",
    name: "Cells",
  },
  {
    id: "column",
    name: "Columns",
  },
  {
    id: "row",
    name: "Rows",
  },
  {
    id: "table",
    name: "Tables",
  },
];

var copyFormats = [
  {
    id: "richHTMLCSS",
    name: "As is",
    desc: "Copy the table as seen on the screen",
  },
  {
    id: "richHTML",
    name: "Plain Table",
    desc: "Copy the table without formatting",
  },
  {
    id: "textTabs",
    name: "Text",
    desc: "Copy as tab-delimited text",
  },
  {
    id: "textTabsSwap",
    name: "Text+Swap",
    desc: "Copy as tab-delimited text, swap columns and rows",
  },
  {
    id: "textCSV",
    name: "CSV",
    desc: "Copy as comma-separated text",
  },
  {
    id: "textCSVSwap",
    name: "CSV+Swap",
    desc: "Copy as comma-separated text, swap columns and rows",
  },
  {
    id: "textHTMLCSS",
    name: "HTML+CSS",
    desc: "Copy as HTML source, retain formatting",
  },
  {
    id: "textHTML",
    name: "HTML",
    desc: "Copy as HTML source, without formatting",
  },
  {
    id: "textTextile",
    name: "Textile",
    desc: "Copy as Textile (Text content)",
  },
];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:112
function sum(vs) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:113
  return vs.reduce(function (x, y) {
    return x + (Number(y) || 0);
  }, 0);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:118
function getNumbers(values) {
  var vs = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:121
  values.forEach(function (v) {
    if (v.isNumber) vs.push(v.number);
  });

  return vs.length ? vs : null;
}

var infoFunctions = [
  {
    name: "count",
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:131
    fn: function (values) {
      return values.length;
    },
  },
  {
    name: "sum",
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:137
    fn: function (values) {
      var vs = getNumbers(values);
      return vs ? number.format(sum(vs)) : null;
    },
  },
  {
    name: "average",
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:144
    fn: function (values) {
      var vs = getNumbers(values);
      return vs ? number.format(sum(vs) / vs.length, 2) : null;
    },
  },
  {
    name: "min",
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:151
    fn: function (values) {
      var vs = getNumbers(values);
      return vs ? number.format(Math.min.apply(Math, vs)) : null;
    },
  },
  {
    name: "max",
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:158
    fn: function (values) {
      var vs = getNumbers(values);
      return vs ? number.format(Math.max.apply(Math, vs)) : null;
    },
  },
];

var prefs = {};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:167
function _constrain(min, val, max) {
  val = Number(val) || min;
  return Math.max(min, Math.min(val, max));
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:172
M.load = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:173
  return util.callBrowserAsync("storage.local.get", null).then(function (obj) {
    obj = obj || {};

    // from the previous version
    if ("modKey" in obj && String(obj.modKey) === "1") {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\preferences.js",178,"FOUND ALTERNATE MODKEY SETTING"));
      obj["modifier.cell"] = secondMod;
      delete obj.modKey;
    }

    prefs = Object.assign({}, defaults, prefs, obj);

    prefs["scroll.amount"] = _constrain(1, prefs["scroll.amount"], 100);
    prefs["scroll.acceleration"] = _constrain(
      0,
      prefs["scroll.acceleration"],
      100
    );

    if (!prefs["number.group"]) {
      prefs["number.group"] = number.defaultFormat().group;
    }

    if (!prefs["number.decimal"]) {
      prefs["number.decimal"] = number.defaultFormat().decimal;
    }

    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\preferences.js",200,"PREFS LOAD", prefs));
    return prefs;
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:205
M.save = function () {
  return util
    .callBrowserAsync("storage.local.clear")
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:208
    .then(function () {
      return util.callBrowserAsync("storage.local.set", prefs);
    })
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:211
    .then(function () {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\preferences.js",212,"PREFS SET", prefs));
      return prefs;
    });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:217
M.setAll = function (obj) {
  prefs = Object.assign({}, prefs, obj);
  return M.save();
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:222
M.set = function (key, val) {
  prefs[key] = val;
  return M.save();
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:227
M.val = function (key) {
  return prefs[key];
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:231
M.int = function (key) {
  return Number(M.val(key)) || 0;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:235
M.copyFormats = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:236
  return copyFormats.map(function (f) {
    f.enabled = !!M.val("copy.format.enabled." + f.id);
    f.default = !!M.val("copy.format.default." + f.id);
    return f;
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:243
M.numberFormat = function () {
  var g = M.val("number.group");
  var d = M.val("number.decimal");

  if (!g && !d) {
    return number.defaultFormat();
  }

  return {
    group: g || "",
    decimal: d || "",
  };
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:257
M.infoFunctions = function () {
  return infoFunctions;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\preferences.js:261
M.captureModes = function () {
  return captureModes;
};


/***/ }),

/***/ "./src/lib/util.js":
/*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:1
// Utility functions.

var M = (module.exports = {});

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:5
M.numeric = function (a, b) {
  return a - b;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:9
M.toArray = function (coll) {
  return Array.prototype.slice.call(coll || [], 0);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:13
M.flatten = function (a) {
  while (a.some(Array.isArray)) a = Array.prototype.concat.apply([], a);
  return a;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:18
M.first = function (a, fn) {
  for (var i = 0; i < a.length; i++) {
    if (fn(a[i], i)) {
      return a[i];
    }
  }
  return null;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:27
M.intersect = function (a, b) {
  return !(a[0] >= b[2] || a[2] <= b[0] || a[1] >= b[3] || a[3] <= b[1]);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:31
M.lstrip = function (s) {
  return s.replace(/^\s+/, "");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:35
M.rstrip = function (s) {
  return s.replace(/\s+$/, "");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:39
M.strip = function (s) {
  return s.replace(/^\s+|\s+$/g, "");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:43
M.reduceWhitespace = function (html) {
  return html
    .replace(/\n\r/g, "\n")
    .replace(/\n[ ]+/g, "\n")
    .replace(/[ ]+\n/g, "\n")
    .replace(/\n+/g, "\n");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:51
M.uid = function (len) {
  var s = "";
  while (len--) {
    s += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return s;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:59
M.nobr = function (s) {
  return s.replace(/[\r\n]+/g, " ");
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:63
M.format = function (s, obj) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:64
  return s.replace(/\${(\w+)}/g, function (_, $1) {
    return obj[$1];
  });
};

var _times = {};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:71
M.timeStart = function (name) {
  _times[name] = new Date();
  return "TIME START: " + name;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:76
M.timeEnd = function (name) {
  if (_times[name]) {
    var t = new Date() - _times[name];
    delete _times[name];
    return "TIME END: " + name + " " + t;
  }
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:84
function callBrowser(useAsync, fn, args) {
  var parts = fn.split("."),
    obj = browser,
    method = parts.pop();

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:89
  parts.forEach(function (p) {
    obj = obj[p];
  });

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\util.js",93,"CALL_BROWSER", useAsync, fn));

  if (!useAsync) {
    try {
      return obj[method].apply(obj, args);
    } catch (err) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\util.js",99,"CALL_BROWSER_ERROR", fn, err.message));
      return null;
    }
  }

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:104
  return new Promise(function (resolve, reject) {
    try {
      obj[method].apply(obj, args).then(
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:107
        function (res) {
          resolve(res);
        },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:110
        function (err) {
          console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\util.js",111,"CALL_BROWSER_LAST_ERROR", fn, err));
          resolve(null);
        }
      );
    } catch (err) {
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\lib\\util.js",116,"CALL_BROWSER_ERROR", fn, err.message));
      resolve(null);
    }
  });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:122
M.callBrowser = function (fn) {
  return callBrowser(false, fn, [].slice.call(arguments, 1));
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\util.js:126
M.callBrowserAsync = function (fn) {
  return callBrowser(true, fn, [].slice.call(arguments, 1));
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\content.js:1
(function () {
  (__webpack_require__(/*! ./content/index */ "./src/content/index.js").main)();
})();

})();

/******/ })()
;