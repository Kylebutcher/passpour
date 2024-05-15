const sequelize = require('../../config/connection');
const { User, Accolade, Bottle } = require('../../models');

const userData = require('./user-data.json');
const accoladeData = require('./accolade-data.json');
const bottleData = require('./bottle-data.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const usersUpdate = userData.map(user => {
    const { id, ...update } = user
    return update
  })
  const usersArray = await User.bulkCreate(usersUpdate, {
    individualHooks: true,
    returning: true,
  });
  const users = usersArray.map(user => user.get({plain:true}))

  const accoladesUpdate = accoladeData.map(accolade => {
    const { id, ...update } = accolade
    return update
  })
  const accoladesArray = await Accolade.bulkCreate(accoladesUpdate)
  const accolades = accoladesArray.map(accolade => accolade.get({plain:true}))

  let newBottles = []
  for (const bottle of bottleData) {
    const { id, order, ...update } = bottle
    newBottles.push({
      ...update,
      author: users[Math.floor(Math.random() * users.length)].id,
    })
  }
  const bottlesArray = await Bottle.bulkCreate(newBottles)
  const bottles = bottlesArray.map(bottle => bottle.get({plain:true}))

  console.log("Users: ", users)
  console.log("Accolades: ", accolades)
  console.log("Bottles: ", bottles)

  process.exit(0);
};

seedDatabase();
