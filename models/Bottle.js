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

    //Would we be creating an array for this and having it be selected out for when it is presented with the call request? Simalar to the Region Problem in User Model

    //Wait - would it just be string and the form will provide a pre-determined set of values that we are aware of and I dont have to worry about this?

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
