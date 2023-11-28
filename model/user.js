const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('User', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phonenumber: {
    type: Sequelize.STRING,
    validate: {
      is: /^(07[789]\d{7})$/,
    },
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;