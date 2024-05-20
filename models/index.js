const User = require('./User');
const Accolade = require('./Accolade');
const Bottle = require('./Bottle');

const UserAccolade = require('./UserAccolade')
const FavoriteBottle = require('./FavoriteBottle')



// Creates a relationship between User and Accolade model, with a "belongs to many" relationship of the Accolade to the User.


User.belongsToMany(Accolade, {
  through: {
    model: UserAccolade,
    foreignKey: "user_id"
  },
  as: 'user_accolade'
});

Accolade.belongsToMany(User, {
  through: {
    model: UserAccolade,
    foreignKey: 'accolade_id'
  },
  as: 'accolade_user'
});

// FavoriteBottle.hasMany(User, {
//   foreignKey: 'user_id', 
//   onDelete: 'CASCADE'
// })

User.belongsToMany(Bottle, {
  through: FavoriteBottle,
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Bottle.belongsToMany(User, {
  through: FavoriteBottle,
  foreignKey: 'bottle_id',
  onDelete: 'SET CASCADE'
});

// Bottle.belongsTo(User, {
//   foreignKey: 'author'
// });

// User.hasMany(Bottle, {
//   foreignKey: 'author'
// })

module.exports = { User, Bottle, FavoriteBottle };
