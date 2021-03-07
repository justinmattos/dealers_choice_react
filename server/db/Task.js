const db = require('./db.js');
const { Model, DataTypes } = require('sequelize');

class Task extends Model {}
Task.init(
  {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
    taskDetail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: 'tasks' }
);

module.exports = Task;
