'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const questionModel = require('./questions/model.js');
const answerModel = require('./answers/model.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(DATABASE_URL);
const Question = questionModel(sequelize, DataTypes);
const Answer = answerModel(sequelize, DataTypes);

Question.hasMany(Answer, { foreignKey: 'questionID', sourceKey: 'id'});
Answer.belongsTo(Question, { foreignKey: 'questionID', targetKey: 'id'})

module.exports = {
  database: sequelize,
  questionCollection: new Collection(Question),
  answerCollection: new Collection(Answer),
};
