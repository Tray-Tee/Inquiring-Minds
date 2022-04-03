'use strict';

const answerModel = (sequelize, DataTypes) => sequelize.define('Answer', {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = answerModel;
