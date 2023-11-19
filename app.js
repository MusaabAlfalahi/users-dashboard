const express = require("express");
const app = express();
const User = require("./model/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index", {});
  // User.findAll()
  //   .then((result) => {
  //   })
  //   .catch((err) => console.log(err));
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

app.post("/", (req, res) => {
  try {
    User.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000);
