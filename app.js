const express = require("express");
const app = express();
const sequelize = require("./database/database");
const User = require("./model/user");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  User.findAll()
    .then((result) => {
      res.render("home", { users: result });
    })
    .catch((err) => console.log(err));
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
