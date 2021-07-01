let fs = require("fs"),
  express = require("express"),
  mustache = require("mustache"),
  glob = require("glob"),
  app = express();

Number.prototype.times = function (fn) {
  let a = [];
  for (let i = 0; i < Number(this); i++) a.push(fn(i));
  return a;
};

let file = (path) => fs.readFileSync(path, "utf8");

let renderHelpers = {
  textSource() {
    return `
      All Gaul is divided into three parts, one of which the Belgae inhabit, the Aquitani
      another, those who in their own language are called Celts, in our Gauls, the third. All
      these differ from each other in language, customs and laws. The river Garonne separates
      the Gauls from the Aquitani; the Marne and the Seine separate them from the Belgae. Of all
      these, the Belgae are the bravest, because they are furthest from the civilization and
      refinement of [our] Province, and merchants least frequently resort to them, and import
      those things which tend to effeminate the mind; and they are the nearest to the Germans,
      who dwell beyond the Rhine, with whom they are continually waging war; for which reason
      the Helvetii also surpass the rest of the Gauls in valor, as they contend with the Germans
      in almost daily battles, when they either repel them from their own territories, or
      themselves wage war on their frontiers. One part of these, which it has been said that the
      Gauls occupy, takes its beginning at the river Rhone; it is bounded by the river Garonne,
      the ocean, and the territories of the Belgae; it borders, too, on the side of the Sequani
      and the Helvetii, upon the river Rhine, and stretches toward the north. The Belgae rises
      from the extreme frontier of Gaul, extend to the lower part of the river Rhine; and look
      toward the north and the rising sun. Aquitania extends from the river Garonne to the
      Pyrenaean mountains and to that part of the ocean which is near Spain: it looks between
      the setting of the sun, and the north star.
    `;
  },

  text() {
    let text = this.textSource();
    let a = Math.floor(Math.random() * text.length);
    let b = Math.floor(Math.random() * text.length);

    return "<p>" + text.substr(a, b) + "</p>";
  },

  numTable(rows, cols) {
    let s = "";
    rows.times(function (r) {
      s += "<tr>";
      cols.times(function (c) {
        s += `<td>${r + 1}.${c + 1}</td>`;
      });
      s += "</tr>";
    });
    return `<table>${s}</table>`;
  },
};

let renderTemplate = (tpl) => {
  let path;

  path = `${__dirname}/templates/${tpl}.html`;
  if (fs.existsSync(path)) {
    return mustache.render(file(path), {
      text: renderHelpers.text(),
    });
  }

  path = `${__dirname}/templates/${tpl}.js`;
  if (fs.existsSync(path)) {
    return require(path).render(renderHelpers);
  }

  return `${tpl}=404`;
};

let renderDoc = (content) =>
  mustache.render(file(`${__dirname}/base.html`), { content: content });

//

app.use(express.static(__dirname + "/public"));

app.get("/only/:tpl", (req, res, next) => {
  let content = req.params.tpl.split(",").map(renderTemplate).join("");
  res.send(renderDoc(content));
});

app.get("/base", (req, res, next) => {
  res.send(renderDoc(""));
});

app.get("/frame", (req, res, next) => {
  res.send(file(`${__dirname}/frame.html`));
});

app.get("/raw/:tpl", (req, res, next) => {
  let content = req.params.tpl.split(",").map(renderTemplate).join("");
  res.send(content);
});

app.get("/all", (req, res, next) => {
  let content = "",
    all =
      "simple spans numbers forms hidden framea nested scroll frameb styled frameset dynamic";

  all.split(" ").forEach((tpl) => {
    content += `<h2>${tpl}</h2>`;
    content += renderTemplate(tpl);
    content += renderHelpers.text();
  });

  res.send(renderDoc(content));
});

app.listen(9876);
