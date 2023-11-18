const express = require("express");
const app = express();
const sequelize = require("./database/database");
const User = require("./model/user");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("/views/home.html", { root: __dirname });
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
