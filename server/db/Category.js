const db = require('./db');
const { Model, DataTypes } = require('sequelize');

class Category extends Model {}
Category.init(
  {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize: db, modelName: 'categories' }
);

module.exports = Category;
