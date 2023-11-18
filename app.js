const express = require("express");
const app = express();
const sequelize = require('./database/database');

app.get("/", (req, res) => {
  res.sendFile("/views/home.html", { root: __dirname });
});

app.listen(3000);
