/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/clipboard.js":
/*!*************************************!*\
  !*** ./src/background/clipboard.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\clipboard.js:6
M.copyRich = function (text) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\clipboard.js",7,util.timeStart("copyRich")));

  var t = document.createElement("div");
  document.body.appendChild(t);

  t.contentEditable = true;
  t.innerHTML = text;

  dom.select(t);
  document.execCommand("copy");
  document.body.removeChild(t);

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\clipboard.js",19,util.timeEnd("copyRich")));
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\clipboard.js:22
M.copyText = function (text) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\clipboard.js",23,util.timeStart("copyText")));

  var t = document.createElement("textarea");
  document.body.appendChild(t);

  t.value = text;
  t.focus();
  t.select();

  document.execCommand("copy");
  document.body.removeChild(t);

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\clipboard.js",35,util.timeEnd("copyText")));
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\clipboard.js:38
M.content = function () {
  var cc = "",
    pasted = false;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\clipboard.js:42
  var pasteHandler = function (evt) {
    if (pasted) return;
    pasted = true;
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\clipboard.js",45,"paste handler toggled"));
    cc = evt.clipboardData.getData("text/html");
    evt.stopPropagation();
    evt.preventDefault();
  };

  document.addEventListener("paste", pasteHandler, true);
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\clipboard.js",52,"exec paste"));
  document.execCommand("paste");
  document.removeEventListener("paste", pasteHandler);
  return cc;
};


/***/ }),

/***/ "./src/background/commands.js":
/*!************************************!*\
  !*** ./src/background/commands.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var message = __webpack_require__(/*! ../lib/message */ "./src/lib/message.js"),
  preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js"),
  menu = __webpack_require__(/*! ./menu */ "./src/background/menu.js"),
  copy = __webpack_require__(/*! ./copy */ "./src/background/copy.js"),
  helpers = __webpack_require__(/*! ./helpers */ "./src/background/helpers.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:10
function findTableCommand(direction, sender) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\commands.js",11,"findTableCommand", direction, sender));

  if (!sender) {
    return helpers.findTable(direction);
  }

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:17
  message.frame("tableIndexFromContextMenu", sender).then(function (res) {
    if (res.data !== null) {
      helpers.findTable(direction, {
        tabId: sender.tabId,
        frameId: sender.frameId,
        index: res.data,
      });
    } else {
      helpers.findTable(direction);
    }
  });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:30
function copyCommand(format, sender) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\commands.js",31,util.timeStart("copyCommand")));

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\commands.js",33,"copyCommand", format, sender));

  var msg = {
    name: "beginCopy",
    broadcast: !sender,
    options: copy.options(format),
  };

  var ok = true;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:43
  function doCopy(r) {
    if (r.data) {
      ok = copy.exec(format, r.data);
      return true;
    }
  }

  if (sender) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:51
    message.frame(msg, sender).then(function (r) {
      doCopy(r);
      message.frame(ok ? "endCopy" : "endCopyFailed", sender);
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\commands.js",54,util.timeEnd("copyCommand")));
    });
  } else {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:57
    message.allFrames(msg).then(function (res) {
      res.some(doCopy);
      message.allFrames(ok ? "endCopy" : "endCopyFailed");
      console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\commands.js",60,util.timeEnd("copyCommand")));
    });
  }
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:65
function captureCommand(mode) {
  if (mode === "zzz") {
    mode = "";
  }

  var m = preferences.val("_captureMode");
  if (m === mode) {
    mode = "";
  }

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:75
  preferences.set("_captureMode", mode).then(function () {
    helpers.updateUI();
    message.allFrames("preferencesUpdated");
  });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:81
function selectCommand(mode, sender) {
  if (sender) {
    message.frame({ name: "selectFromContextMenu", mode: mode }, sender);
  }
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:87
M.exec = function (cmd, sender) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\commands.js",88,"GOT COMMAND", cmd, sender));

  if (sender && typeof sender.tabId === "undefined") {
    sender = null; // this comes from the popup
  }

  if (cmd === "copy") {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\commands.js:95
    preferences.copyFormats().forEach(function (f) {
      if (f.default) {
        cmd = "copy_" + f.id;
      }
    });
  }

  var m;

  m = cmd.match(/^copy_(\w+)/);
  if (m) {
    return copyCommand(m[1], sender);
  }

  m = cmd.match(/^capture_(\w+)/);
  if (m) {
    return captureCommand(m[1], sender);
  }

  m = cmd.match(/^select_(\w+)/);
  if (m) {
    return selectCommand(m[1], sender);
  }

  switch (cmd) {
    case "find_next":
      return findTableCommand(+1, sender);
    case "find_previous":
      return findTableCommand(-1, sender);
    case "open_options":
      return util.callBrowser("runtime.openOptionsPage");
  }
};


/***/ }),

/***/ "./src/background/copy.js":
/*!********************************!*\
  !*** ./src/background/copy.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var paste = __webpack_require__(/*! ./paste */ "./src/background/paste.js"),
  dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  matrix = __webpack_require__(/*! ../lib/matrix */ "./src/lib/matrix.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js"),
  clipboard = __webpack_require__(/*! ./clipboard */ "./src/background/clipboard.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:9
function trimTextMatrix(mat) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:10
  mat = matrix.map(mat, function (row, cell) {
    return util.strip(util.nobr(cell));
  });
  return matrix.trim(mat, Boolean);
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:16
function asTabs(mat) {
  return trimTextMatrix(mat)
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:18
    .map(function (row) {
      return row.join("\t");
    })
    .join("\n");
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:24
function asCSV(mat) {
  return trimTextMatrix(mat)
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:26
    .map(function (row) {
      return row
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:28
        .map(function (cell) {
          if (cell.match(/^\w+$/) || cell.match(/^-?[0-9]+(\.[0-9]*)?$/))
            return cell;
          return '"' + cell.replace(/"/g, '""') + '"';
        })
        .join(",");
    })
    .join("\n");
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:38
function asTextile(mat) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:39
  var rows = mat.map(function (row) {
    var cells = row
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:41
      .filter(function (node) {
        return node.td;
      })
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:44
      .map(function (node) {
        var t = "",
          s = "";

        t = dom.textContent(node.td);

        if (node.colSpan) s += "\\" + (node.colSpan + 1);
        if (node.rowSpan) s += "/" + (node.rowSpan + 1);
        if (s) s += ".";

        return "|" + s + " " + t.replace("|", "&#124;");
      });

    return cells.join(" ") + " |";
  });

  return rows.join("\n");
}

M.formats = {};

M.formats.richHTMLCSS = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: true,
    keepHidden: false,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:72
  exec: function (t) {
    clipboard.copyRich(t.html());
  },
};

M.formats.richHTML = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: false,
    keepHidden: false,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:84
  exec: function (t) {
    clipboard.copyRich(t.html());
  },
};

M.formats.textTabs = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: false,
    keepHidden: false,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:96
  exec: function (t) {
    clipboard.copyText(asTabs(t.textMatrix()));
  },
};

M.formats.textTabsSwap = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: false,
    keepHidden: false,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:108
  exec: function (t) {
    clipboard.copyText(asTabs(matrix.transpose(t.textMatrix())));
  },
};

M.formats.textCSV = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: false,
    keepHidden: false,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:120
  exec: function (t) {
    clipboard.copyText(asCSV(t.textMatrix()));
  },
};

M.formats.textCSVSwap = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: false,
    keepHidden: false,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:132
  exec: function (t) {
    clipboard.copyText(asCSV(matrix.transpose(t.textMatrix())));
  },
};

M.formats.textHTML = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: false,
    keepHidden: true,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:144
  exec: function (t) {
    clipboard.copyText(util.reduceWhitespace(t.html()));
  },
};

M.formats.textHTMLCSS = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: true,
    keepHidden: true,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:156
  exec: function (t) {
    clipboard.copyText(util.reduceWhitespace(t.html()));
  },
};

M.formats.textTextile = {
  opts: {
    method: "clipboard",
    withSelection: true,
    keepStyles: false,
    keepHidden: false,
  },
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:168
  exec: function (t) {
    clipboard.copyText(asTextile(t.nodeMatrix()));
  },
};

//

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:175
M.options = function (format) {
  return M.formats[format].opts;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\copy.js:179
M.exec = function (format, data) {
  var ok = false,
    t = new paste.table(),
    fmt = M.formats[format];

  if (t.init(data, fmt.opts)) {
    fmt.exec(t);
    ok = true;
  }

  t.destroy();
  return ok;
};


/***/ }),

/***/ "./src/background/helpers.js":
/*!***********************************!*\
  !*** ./src/background/helpers.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var message = __webpack_require__(/*! ../lib/message */ "./src/lib/message.js"),
  preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js"),
  menu = __webpack_require__(/*! ./menu */ "./src/background/menu.js");
var badgeColor = "#1e88ff";

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:9
M.updateUI = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:10
  preferences.load().then(function () {
    menu.create();
    M.updateBadge();
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:16
M.setBadge = function (s) {
  util.callBrowser("browserAction.setBadgeText", { text: s });
  util.callBrowser("browserAction.setBadgeBackgroundColor", {
    color: badgeColor,
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:23
M.updateBadge = function () {
  var mode = preferences.val("_captureMode");

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\helpers.js",26,"updateBadge mode=" + mode));

  switch (mode) {
    case "column":
      return M.setBadge("C");
    case "row":
      return M.setBadge("R");
    case "cell":
      return M.setBadge("E");
    case "table":
      return M.setBadge("T");
    default:
      M.setBadge("");
  }
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:42
M.enumTables = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:43
  return message.allFrames("enumTables").then(function (res) {
    var all = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:46
    res.forEach(function (r) {
      all = all.concat(
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:48
        (r.data || []).map(function (t) {
          t.frame = {
            tabId: r.receiver.tabId,
            frameId: r.receiver.frameId,
          };
          return t;
        })
      );
    });

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:58
    return all.sort(function (a, b) {
      return a.frame.frameId - b.frame.frameId || a.index - b.index;
    });
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:64
M.findTable = function (direction, start) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:65
  M.enumTables().then(function (allTables) {
    if (!allTables.length) {
      return;
    }

    var curr = -1;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\helpers.js:72
    allTables.some(function (t, n) {
      if (
        start &&
        t.frame.frameId == start.frameId &&
        t.frame.tabId === start.tabId &&
        t.index === start.index
      ) {
        curr = n;
        return true;
      }
      if (!start && t.selected) {
        curr = n;
        return true;
      }
    });

    if (direction === +1) {
      if (curr === -1 || curr === allTables.length - 1) curr = 0;
      else curr += 1;
    } else {
      if (curr === -1 || curr === 0) curr = allTables.length - 1;
      else curr--;
    }

    var t = allTables[curr];
    message.frame({ name: "selectTableByIndex", index: t.index }, t.frame);
  });
};


/***/ }),

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Background script main

var M = (module.exports = {});

var message = __webpack_require__(/*! ../lib/message */ "./src/lib/message.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js"),
  preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js"),
  menu = __webpack_require__(/*! ./menu */ "./src/background/menu.js"),
  commands = __webpack_require__(/*! ./commands */ "./src/background/commands.js"),
  copy = __webpack_require__(/*! ./copy */ "./src/background/copy.js"),
  helpers = __webpack_require__(/*! ./helpers */ "./src/background/helpers.js");

var messageListeners = {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:14
  dropAllSelections: function (msg) {
    message.allFrames("dropSelection");
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:18
  dropOtherSelections: function (msg) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:19
    message.enumFrames("active").then(function (frames) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:20
      frames.forEach(function (frame) {
        if (frame.frameId !== msg.sender.frameId) {
          message.frame("dropSelection", frame);
        }
      });
    });
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:28
  contextMenu: function (msg) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:29
    helpers.enumTables().then(function (ts) {
      menu.enable(
        ["select_row", "select_column", "select_table"],
        msg.selectable
      );
      menu.enable(["copy"], msg.selectable);
      menu.enable(["find_previous", "find_next"], ts.length > 0);
    });
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:39
  genericCopy: function (msg) {
    commands.exec("copy", msg.sender);
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:43
  preferencesUpdated: function (msg) {
    helpers.updateUI();
    message.broadcast("preferencesUpdated");
  },

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:48
  command: function (msg) {
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\index.js",49,"messageListeners.command", msg.sender));
    commands.exec(msg.command, msg.sender);
  },
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:54
function init() {
  menu.create();
  message.listen(messageListeners);

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:58
  util.callBrowser("contextMenus.onClicked.addListener", function (info, tab) {
    commands.exec(info.menuItemId, { tabId: tab.id, frameId: info.frameId });
  });

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:62
  util.callBrowser("commands.onCommand.addListener", function (cmd) {
    commands.exec(cmd, null);
  });

  helpers.updateUI();
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\index.js:69
M.main = function () {
  preferences.load().then(init);
};


/***/ }),

/***/ "./src/background/menu.js":
/*!********************************!*\
  !*** ./src/background/menu.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var preferences = __webpack_require__(/*! ../lib/preferences */ "./src/lib/preferences.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js");

var mainMenu = {
  id: "root",
  title: "Table...",
  children: [
    {
      id: "select_row",
      title: "Select Row",
    },
    {
      id: "select_column",
      title: "Select Column",
    },
    {
      id: "select_table",
      title: "Select Table",
    },
    "---",
    {
      id: "find_previous",
      title: "Previous Table",
    },
    {
      id: "find_next",
      title: "Next Table",
    },
    "---",
    {
      id: "copy",
      title: "Copy",
    },
    {
      id: "copyAs",
      title: "Copy...",
    },
  ],
};

var uid = 0;

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:45
function createMenu(menu, parent) {
  var desc = {
    enabled: true,
    contexts: ["page", "selection", "link", "editable"],
  };

  if (parent) {
    desc.parentId = parent;
  }

  if (menu === "---") {
    desc.id = "uid" + ++uid;
    desc.type = "separator";
  } else {
    desc.id = menu.id;
    desc.title = menu.title;
  }

  var sub = menu.children;

  if (menu.id === "copyAs") {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:66
    var cf = preferences.copyFormats().filter(function (f) {
      return f.enabled;
    });

    if (!cf.length) {
      return;
    }

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:74
    sub = cf.map(function (f) {
      return {
        id: "copy_" + f.id,
        title: f.name,
      };
    });
  }

  var mobj = util.callBrowser("contextMenus.create", desc);

  if (sub) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:85
    sub.forEach(function (subMenu) {
      createMenu(subMenu, mobj);
    });
  }

  return mobj;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:93
M.create = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:94
  util.callBrowserAsync("contextMenus.removeAll").then(function () {
    createMenu(mainMenu);
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:99
M.enable = function (ids, enabled) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:100
  ids.forEach(function (id) {
    util.callBrowser("contextMenus.update", id, { enabled: enabled });
    if (id === "copy") {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:103
      var cf = preferences.copyFormats().filter(function (f) {
        return f.enabled;
      });
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\menu.js:106
      cf.forEach(function (f) {
        util.callBrowser("contextMenus.update", "copy_" + f.id, {
          enabled: enabled,
        });
      });
    }
  });
};


/***/ }),

/***/ "./src/background/paste.js":
/*!*********************************!*\
  !*** ./src/background/paste.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
var M = (module.exports = {});

var dom = __webpack_require__(/*! ../lib/dom */ "./src/lib/dom.js"),
  matrix = __webpack_require__(/*! ../lib/matrix */ "./src/lib/matrix.js"),
  util = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js"),
  cell = __webpack_require__(/*! ../lib/cell */ "./src/lib/cell.js"),
  css = __webpack_require__(/*! ../lib/css */ "./src/lib/css.js"),
  clipboard = __webpack_require__(/*! ./clipboard */ "./src/background/clipboard.js");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:10
function toMatrix(tbl) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",11,util.timeStart("toMatrix")));

  var tds = {},
    rows = {},
    cols = {};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:17
  dom.cells(tbl).forEach(function (td) {
    var bounds = dom.bounds(td);
    var c = bounds.x,
      r = bounds.y;
    cols[c] = rows[r] = 1;
    tds[r + "/" + c] = td;
   
  });
  rows = Object.keys(rows).sort(util.numeric);
  cols = Object.keys(cols).sort(util.numeric);

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:28
  var mat = rows.map(function (r) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:29
    return cols.map(function (c) {
      var td = tds[r + "/" + c];
      return td ? { td: td } : {};
    });
  });

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:35
  matrix.each(mat, function (row, node, ri, ni) {
    if (!node.td) return;

    var rs = parseInt(dom.attr(node.td, "rowSpan")) || 1;
    var cs = parseInt(dom.attr(node.td, "colSpan")) || 1;

    for (var i = 1; i < cs; i++) {
      if (row[ni + i] && !row[ni + i].td) row[ni + i].colRef = node;
    }

    for (var i = 1; i < rs; i++) {
      if (mat[ri + i] && mat[ri + i][ni] && !mat[ri + i][ni].td)
        mat[ri + i][ni].rowRef = node;
    }
  });

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",51,util.timeEnd("toMatrix")));

  return mat;
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:56
function computeSpans(mat) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:57
  matrix.each(mat, function (_, node) {
    if (node.colRef) node.colRef.colSpan = (node.colRef.colSpan || 0) + 1;
    if (node.rowRef) node.rowRef.rowSpan = (node.rowRef.rowSpan || 0) + 1;
  });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:63
function trim(tbl) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",64,util.timeStart("trim.filter")));

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:66
  var mat = matrix.trim(toMatrix(tbl), function (node) {
    return cell.selected(node.td);
  });

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",70,util.timeEnd("trim.filter")));

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",72,util.timeStart("trim.remove")));

  var tds = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:76
  matrix.each(mat, function (row, node) {
    if (node.td) {
      tds.push(node.td);
    }
  });

  var junk = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:84
  dom.cells(tbl).forEach(function (td) {
    if (tds.indexOf(td) < 0) junk.push(td);
    else if (!cell.selected(td)) td.innerHTML = "";
  });

  dom.remove(junk);
  junk = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:92
  dom.find("tr", tbl).forEach(function (tr) {
    if (dom.find("td, th", tr).length === 0) {
      junk.push(tr);
    }
  });

  dom.remove(junk);

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",100,util.timeEnd("trim.remove")));

  computeSpans(mat);

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:104
  matrix.each(mat, function (_, node) {
    if (node.td) {
      dom.attr(node.td, "rowSpan", node.rowSpan ? node.rowSpan + 1 : null);
      dom.attr(node.td, "colSpan", node.colSpan ? node.colSpan + 1 : null);
    }
  });
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:112
function fixRelativeLinks(where, fixCssUrls) {
  var aa = where.ownerDocument.createElement("A");

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:115
  function fixUrl(url) {
    // since we've set BASE url, this works
    aa.href = url;
    return aa.href;
  }

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:121
  function fixTags(tags, attrs) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:122
    dom.find(tags, where).forEach(function (t) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:123
      attrs.forEach(function (attr) {
        var v = dom.attr(t, attr);
        if (v) {
          dom.attr(t, attr, fixUrl(v));
        }
      });
    });
  }

  fixTags("A, AREA, LINK", ["href"]);
  fixTags("IMG, INPUT, SCRIPT", ["src", "longdesc", "usemap"]);
  fixTags("FORM", ["action"]);
  fixTags("Q, BLOCKQUOTE, INS, DEL", ["cite"]);
  fixTags("OBJECT", ["classid", "codebase", "data", "usemap"]);

  if (fixCssUrls) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:139
    dom.find("*", where).forEach(function (el) {
      var style = dom.attr(el, "style");

      if (!style || style.toLowerCase().indexOf("url") < 0) return;

      var fixStyle = style.replace(
        /(\burl\s*\()([^()]+)/gi,
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:146
        function (_, pfx, url) {
          url = util.strip(url);
          if (url[0] === '"' || url[0] === "'") {
            return pfx + url[0] + fixUrl(url.slice(1, -1)) + url[0];
          }
          return pfx + fixUrl(url);
        }
      );

      if (fixStyle !== style) dom.attr(el, "style", fixStyle);
    });
  }
}

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:160
function removeHiddenElements(node) {
  var hidden = [];

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:163
  dom.find("*", node).forEach(function (el) {
    if (!dom.visible(el)) {
      hidden.push(el);
    }
  });

  if (hidden.length) {
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",170,"removeHidden: " + hidden.length));
    dom.remove(hidden);
  }
}
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:174
tcc = function (text) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",175,util.timeStart("textCopy")));

  var t = document.createElement("textarea");
  document.body.appendChild(t);

  t.value = text;
  t.focus();
  t.select();

  document.execCommand("copy");
  document.body.removeChild(t);

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",187,util.timeEnd("textCopy")));
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:190
M.table = function () {};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:192
M.table.prototype.init = function (data, options) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",193,util.timeStart("paste.init")));

  this.frame = document.createElement("IFRAME");
  this.frame.setAttribute("sandbox", "allow-same-origin");
  document.body.appendChild(this.frame);

  this.doc = this.frame.contentDocument;
  this.body = this.doc.body;

  var base = this.doc.createElement("BASE");
  dom.attr(base, "href", data.url);
  this.body.appendChild(base);

  // some cells (e.g. containing an image) could become width=0
  // after paste, breaking toMatrix calculations
  var css = this.doc.createElement("STYLE");
  css.type = "text/css";
  css.innerHTML = "td { min-width: 1px; }";
  this.body.appendChild(css);

  this.div = this.doc.createElement("DIV");
  this.div.contentEditable = true;
  this.body.appendChild(this.div);

  var ok = this.initTable(data, options);

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",219,"paste.init=" + ok + " method=" + options.method));
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",220,util.timeEnd("paste.init")));

  return ok;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:225
M.table.prototype.initTable = function (data, options) {
  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",226,util.timeStart("paste.insertTable")));

  if (options.method === "clipboard") {
    this.div.focus();

    // NB: just pasting the clipboard via `this.doc.execCommand('paste')`
    // is very slow for some reason. Instead, intercept paste
    // to obtain the clipboard and insert it via innerHTML which is waaay faster

    this.div.innerHTML = clipboard.content();

    // destroy the clipboard to avoid pasting of intermediate results
    // this doesn't really fix that because they can hit paste before
    // .content() finishes, but still...
    clipboard.copyText("");
  }

  if (options.method === "transfer") {
    this.div.innerHTML = data.html;
  }

  console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",247,util.timeEnd("paste.insertTable")));

  this.table = dom.findOne("table", this.div);

  if (!this.table || dom.tag(this.table) !== "TABLE") return false;

  if (data.hasSelection) {
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",254,util.timeStart("paste.trim")));
    trim(this.table);
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",256,util.timeEnd("paste.trim")));
  }

  if (options.method === "transfer" && options.keepStyles) {
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",260,util.timeStart("paste.restoreStyles")));

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:262
    dom.findSelf("*", this.table).forEach(function (el) {
      var uid = dom.attr(el, "data-copytables-uid");
      if (uid && el.style) {
        dom.removeAttr(el, "style");
        el.style.cssText = css.compute(css.read(el), data.css[uid] || {});
      }
      dom.removeAttr(el, "data-copytables-uid");
    });

    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",271,util.timeEnd("paste.restoreStyles")));
  }

  if (options.method === "transfer" && !options.keepHidden) {
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",275,util.timeStart("paste.removeHidden")));
    removeHiddenElements(this.div);
    console.log(__dbg("C:\\Users\\Nous\\Documents\\Devt\\FirefoxExtensions\\copytables\\src\\background\\paste.js",277,util.timeEnd("paste.removeHidden")));
  }

  fixRelativeLinks(this.div, options.keepStyles);
  dom.cells(this.table).forEach(cell.reset);

  if (!options.keepStyles) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:284
    dom.findSelf("*", this.table).forEach(function (el) {
      dom.removeAttr(el, "style");
      dom.removeAttr(el, "class");
    });
  }

  return true;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:293
M.table.prototype.html = function () {
  return this.table.outerHTML;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:297
M.table.prototype.nodeMatrix = function () {
  var mat = toMatrix(this.table);
  computeSpans(mat);
  return mat;
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:303
M.table.prototype.textMatrix = function () {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:304
  return matrix.map(toMatrix(this.table), function (_, node) {
    return dom.textContent(node.td);
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background\paste.js:309
M.table.prototype.destroy = function () {
  if (this.frame) document.body.removeChild(this.frame);
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

/***/ "./src/lib/matrix.js":
/*!***************************!*\
  !*** ./src/lib/matrix.js ***!
  \***************************/
/***/ ((module) => {

function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
/// Matrix manipulations

var M = (module.exports = {});

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:5
M.column = function (mat, ci) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:6
  return mat.map(function (row) {
    return row[ci];
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:11
M.transpose = function (mat) {
  if (!mat.length) return mat;
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:13
  return mat[0].map(function (_, ci) {
    return M.column(mat, ci);
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:18
M.trim = function (mat, fn) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:19
  var fun = function (row) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:20
    return row.some(function (cell) {
      return fn(cell);
    });
  };

  mat = mat.filter(fun);
  mat = M.transpose(mat).filter(fun);
  return M.transpose(mat);
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:30
M.each = function (mat, fn) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:31
  mat.forEach(function (row, ri) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:32
    row.forEach(function (cell, ci) {
      fn(row, cell, ri, ci);
    });
  });
};

 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:38
M.map = function (mat, fn) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:39
  return mat.map(function (row, ri) {
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\lib\matrix.js:40
    return row.map(function (cell, ci) {
      return fn(row, cell, ri, ci);
    });
  });
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
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
function __dbg() { var nl = "\n", buf = []; function type(x) { try { return Object.prototype.toString .call(x) .replace("[object ", "") .replace("]", ""); } catch (e) { return ""; } } function props(x, depth) { var r = Array.isArray(x) ? [] : {}; try { Object.keys(x).forEach(function (k) { r[k] = inspect(x[k], depth + 1); }); return r; } catch (e) { return "error"; } } function inspect(x, depth) { if (depth > 5) return "..."; if (typeof x !== "object" || x === null) return x; var t = type(x), p = props(x, depth); if (t === "Object" || t === "Array") return p; var r = {}; r[t] = p; return r; } buf.push(location ? location.href : "??"); [].forEach.call(arguments, function (arg) { buf.push(inspect(arg, 0)); }); return "@@CT<<" + JSON.stringify(buf) + ">>CT@@"; }
 // C:\Users\Nous\Documents\Devt\FirefoxExtensions\copytables\src\background.js:1
(function () {
  (__webpack_require__(/*! ./background/index */ "./src/background/index.js").main)();
})();

})();

/******/ })()
;