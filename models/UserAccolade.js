const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Accolade model and datatypes, including the user_id foreign key.
class UserAccolade extends Model {}

UserAccolade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      allowNull: false,
    },
    accolade_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'accolade',
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
    modelName: 'useraccolade',
  }
);

module.exports = UserAccolade;
