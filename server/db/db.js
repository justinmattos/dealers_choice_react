const { Sequelize } = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/react_tasks',
  {
    logging: false,
    timezone: 'America/New_York',
  }
);

module.exports = db;
