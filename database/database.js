const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("defaultdb", "avnadmin", "AVNS_g3lg5lWkKtO8Qh_8V6A", {
  host: "mysql-users-dashboard-mosaab.a.aivencloud.com",
  port: "12251",
  dialect: 'mysql',
});

sequelize
  .sync()
  .then(() => {
    console.log('DB sync');
  })
  .catch((err) => {
    console.log(err);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;