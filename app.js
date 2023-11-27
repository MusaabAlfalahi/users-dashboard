const express = require("express");
const app = express();
const User = require("./model/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  User.findAll()
    .then((result) => {
      console.log(result);
      res.render("index", {users: result});
    })
    .catch((err) => console.log(err));
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

app.post("/user/add.html", async (req, res) => {
  try {
    const oldUser = await User.findOne({
      where: {
        email: req.body.eamil,
      },
    });
    if (oldUser) {
      return res.send('<script>alert("email already exist"); window.location.href = "/user/add.html"; </script>');
    }
    const phonenumber = req.body.phonenumber;
    const re = /((079)|(078)|(077)){1}[0-9]{7}/;
    if(!re.test(phonenumber)){
      return res.send('<script>alert("invalid input"); window.location.href = "/user/add.html"; </script>');
    }
    await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000);
