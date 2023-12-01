const express = require("express");
const methodOverride = require("method-override");
const routes = require("./routes/users");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", routes);
app.all("*", (req, res) => {
  res.render("oops");
});

app.listen(process.env.PORT);
