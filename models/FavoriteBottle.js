const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Accolade model and datatypes, including the user_id foreign key.
class FavoriteBottle extends Model {}

FavoriteBottle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    taste_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      allowNull: false,
    },
    bottle_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bottle',
        key: 'id'
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favoritebottle',
  }
);

module.exports = FavoriteBottle;