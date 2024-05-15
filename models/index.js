const User = require('./User');
const Accolade = require('./Accolade');
const Bottle = require('./Bottle');



// Creates a relationship between User, Bottle, and Accolade model, with the User having a "has many" relationship with other models.
User.hasMany(Bottle, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Accolade, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Accolade model, with a "belongs to" relationship of the Accolade to the User.
Accolade.belongsTo(User, {
  foreignKey: 'user_id'
});



// Creates a relationship between User and Accolade model, with a "belongs to" relationship of the Accolade to the User.
Bottle.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Accolade, Bottle };
