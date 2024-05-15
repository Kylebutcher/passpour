const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Accolade model and datatypes, including the user_id foreign key.
class Accolade extends Model {}

Accolade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    badge: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'accolade',
  }
);

module.exports = Accolade;
