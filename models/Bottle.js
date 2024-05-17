const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Bottle model and datatypes, including the user_id foreign key.
class Bottle extends Model {}

Bottle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    whiskey_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    whiskey_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

 

    // Referencing Keys
    author: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bottle',
  }
);

module.exports = Bottle;


