const { Sequelize } = require('sequelize');
const { DB } = require('../config/appConfig');

// Создаем соединение с базой данных
const sequelize = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: 'postgres',
});

module.exports = sequelize;
