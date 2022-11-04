// WITH OUT DATA BASE WE ARE STORING IN ARRAY
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
var itemstobedisp = [];
var workitems = [];

app.get("/", function (req, res) {
  var day = date.getDay();
  res.render("list", {
    listTitle: day,
    newitems: itemstobedisp,
  });
});

app.post("/", function (req, res) {
  var itemname = req.body.it;
  console.log(req.body);
  if (req.body.btnname === "Work") {
    workitems.push(itemname);
    res.redirect("/work");
  } else {
    itemstobedisp.push(itemname);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newitems: workitems });
});

app.listen(4000, function (req, res) {
  console.log("App is listening on port 4000");
});
