'use strict';

const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' || 'sqlite::memory';

const sequelize = new Sequelize(DATABASE_URL, 
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
});

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
};
