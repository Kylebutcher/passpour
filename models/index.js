const User = require('./User');
const Accolade = require('./Accolade');
const Bottle = require('./Bottle');
const UserAccolade = require('./UserAccolade')
const FavoriteBottle = require('./FavoriteBottle')


// Creates a relationship between User and Accolade model, with a "belongs to many" relationship of the Accolade to the User.

User.belongsToMany(Accolade, {
  through: {
    model: UserAccolade
  },
  as: 'user_accolade'
});

Accolade.belongsToMany(User, {
  through: {
    model: UserAccolade
  },
  as: 'accolade_user'
});

User.belongsToMany(Bottle, {
  through: {
    model: FavoriteBottle,
    foreignKey: 'user_id'
  },
  as: 'user_bottle'
});

Bottle.belongsToMany(User, {
  through: {
    model: FavoriteBottle,
    foreignKey: 'bottle_id'
  },
  as: 'bottle_user'
});

Bottle.belongsTo(User, {
  foreignKey: 'author'
});

User.hasMany(Bottle, {
  foreignKey: 'author'
})

module.exports = { User, Accolade, Bottle,UserAccolade, FavoriteBottle };
