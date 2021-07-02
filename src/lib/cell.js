/// Get/set table cell state

var M = (module.exports = {});

var dom = require("../lib/dom");

var prefix = "data-copytables-";

M.set = function (td, state) {
  return td && td.setAttribute(prefix + state, "1");
};

M.is = function (td, state) {
  return td && td.hasAttribute(prefix + state);
};

M.clear = function (td, state) {
  return td && td.removeAttribute(prefix + state);
};

M.select = function (td) {
  return M.set(td, "selected");
};

M.selected = function (td) {
  return M.is(td, "selected");
};

M.unselect = function (td) {
  return M.clear(td, "selected");
};

M.mark = function (td) {
  return M.set(td, "marked");
};

M.marked = function (td) {
  return M.is(td, "marked");
};

M.unmark = function (td) {
  return M.clear(td, "marked");
};

M.lock = function (td) {
  return M.set(td, "locked");
};

M.locked = function (td) {
  return M.is(td, "locked");
};

M.unlock = function (td) {
  return M.clear(td, "locked");
};

M.find = function (states, where) {
  var sel = states
    .split(",")
    .map(function (s) {
      return "[" + prefix + s.trim() + "]";
    })
    .join(",");
  return dom.find(sel, where);
};

M.findSelected = function (where) {
  var sel = "[{}selected]:not([{}locked]), [{}marked]:not([{}locked])".replace(
    /{}/g,
    prefix
  );
  return dom.find(sel, where);
};

M.reset = function (td) {
  td.removeAttribute(prefix + "selected");
  td.removeAttribute(prefix + "marked");
  td.removeAttribute(prefix + "locked");
};
