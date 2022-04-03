'use strict';

const questionModel = (sequelize, DataTypes) => sequelize.define('Question', {
  name: { type: DataTypes.STRING, allowNull: false},
  questionID: { type: DataTypes.INTEGER, allowNull: false}
});

module.exports = questionModel;
