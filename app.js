const express = require("express");
const app = express();
const User = require("./model/user");
const moment = require("moment/moment");
const methodOverride = require("method-override");
const { Op } = require("sequelize");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  User.findAll()
    .then((result) => {
      res.render("index", { users: result, moment });
    })
    .catch((err) => console.log(err));
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", async (req, res) => {
  await User.findByPk(req.params.id)
    .then((result) => {
      res.render("user/edit", { user: result });
    })
    .catch((err) => console.log(err));
});

app.get("/view/:id", async (req, res) => {
  // await User.findAll({ where: { id: { [Op.eq]: req.params.id } } })
  await User.findByPk(req.params.id)
    .then((result) => {
      res.render("user/view", { user: result, moment });
    })
    .catch((err) => console.log(err));
});

app.delete("/user/delete/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    await User.destroy({ where: { id: userid } });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.put("/user/update/:id", async (req, res) => {
  try {
    console.log(req.body);
    const userid = req.params.id;
    await User.update({ ...req.body }, { where: { id: userid } });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/search", async (req, res) => {
  User.findAll({
    where: {
      [Op.or]: {
        firstname: req.body.search,
        lastname: req.body.search,
      },
    },
  })
    .then((result) => {
      console.log(result);
      res.render("user/search", { users: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/user/add.html", async (req, res) => {
  try {
    const oldUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (oldUser) {
      return res.send(
        '<script>alert("email already exist"); window.location.href = "/user/add.html"; </script>'
      );
    }
    await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.send(
      '<script>alert("invalid input"); window.location.href = "/user/add.html"; </script>'
    );
  }
});

app.listen(3000);
