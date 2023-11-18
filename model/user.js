const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('User', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;