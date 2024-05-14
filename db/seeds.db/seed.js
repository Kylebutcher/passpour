const sequelize = require('../../config/connections');
const { User, Accolade, Bottle } = require('../../models');

const userData = require('./user-data.json');
const accoladeData = require('./accolade-data.json');
const bottleData = require('./bottle-data.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // I am not sure why the variable 'accolade' and 'bottle' (line 24) are not active, I set it up simalar to how our MVC Gary project was. 
  for (const accolade of accoladeData) {
    await Accolade.create({
      ...Accolade,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const bottle of bottleData) {
    await Bottle.create({
      ...Bottle,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
