const express = require("express");
const app = express();
const methodOverride = require("method-override");
const routes = require("./routes/users");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use('/', routes);

app.listen(3000);
