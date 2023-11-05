/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var dom = __webpack_require__(/*! ./lib/dom */ "./src/lib/dom.js"),
  preferences = __webpack_require__(/*! ./lib/preferences */ "./src/lib/preferences.js"),
  message = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js"),
  event = __webpack_require__(/*! ./lib/event */ "./src/lib/event.js"),
  util = __webpack_require__(/*! ./lib/util */ "./src/lib/util.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:7
function captureButtons() {
  var mode = preferences.val("_captureMode") || "zzz";

  return preferences
    .captureModes()
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:12
    .map(function (m) {
      return util.format(
        '<button class="${cls}" data-command="capture_${id}">${name}</button>',
        {
          id: m.id,
          name: m.name,
          cls: m.id === mode ? "on" : "",
        }
      );
    })
    .join("");
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:25
function copyButtons() {
  return preferences
    .copyFormats()
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:28
    .filter(function (f) {
      return f.enabled;
    })
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:31
    .map(function (f) {
      return util.format(
        '<button data-command="copy_${id}" title="${desc}">${name}</button>',
        f
      );
    })
    .join("");
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:40
function update() {
  dom.findOne("#copy-buttons").innerHTML = copyButtons();

  if (preferences.val("capture.enabled")) {
    dom.findOne("#capture-row").style.display = "";
    dom.findOne("#capture-buttons").innerHTML = captureButtons();
  } else {
    dom.findOne("#capture-row").style.display = "none";
  }
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:51
function init() {
  update();

  event.listen(document, {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:55
    click: function (e) {
      var cmd = dom.attr(e.target, "data-command");
      if (cmd) {
        message.background({ name: "command", command: cmd });
      }
      if (!dom.attr(e.target, "data-keep-open")) {
        window.close();
      }
    },
  });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\popup.js:67
window.onload = function () {
  preferences.load().then(init);
};

})();

/******/ })()
;