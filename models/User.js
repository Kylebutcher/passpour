const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Checks the password against the encrypted password in the database.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },

    // I imagined a drop down menue in the form, (about 20 or so countries?) and i dont know how to do the "drop down version" of that into here: I think I would have to choose the 20 or so countries and list them here, have an array built so it can select the correct one. 

    // potential path: grab the value from the form - and have that choice set to a string and can call it into regiaon: just like email or pass word
    region: {
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('myArrayField'));
      }, 
      set: function(val) {
          return this.setDataValue('myArrayField', JSON.stringify(val));
      },
      allowNull: false,
    },
  },

      
      




  {
    // Hooks are used so that if a user is created or updated, the password is encrypted before being stored in the database.
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;