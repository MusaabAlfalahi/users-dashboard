const User = require("../model/user");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports.getAllUsers = async (req, res) => {
  User.findAll()
    .then((result) => {
      res.render("index", { users: result, moment });
    })
    .catch((err) => console.log(err));
};

module.exports.getAdd = (req, res) => {
  res.render("user/add");
};

module.exports.getEdit = async (req, res) => {
  await User.findByPk(req.params.id)
    .then((result) => {
      res.render("user/edit", { user: result });
    })
    .catch((err) => console.log(err));
};

module.exports.getView = async (req, res) => {
  // await User.findAll({ where: { id: { [Op.eq]: req.params.id } } })
  await User.findByPk(req.params.id)
    .then((result) => {
      res.render("user/view", { user: result, moment });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteUser = async (req, res) => {
  try {
    const userid = req.params.id;
    await User.destroy({ where: { id: userid } });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const userid = req.params.id;
    await User.update({ ...req.body }, { where: { id: userid } });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports.search = async (req, res) => {
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
};

module.exports.addUser = async (req, res) => {
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
};
