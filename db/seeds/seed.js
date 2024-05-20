const sequelize = require('../../config/connection');
const { User, Bottle, FavoriteBottle } = require('../../models');

const userData = require('./user-data.json');
// const accoladeData = require('./accolade-data.json'); Scrapped
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

  // const accoladesUpdate = accoladeData.map(accolade => {
  //   const { id, ...update } = accolade
  //   return update
  // }) Scrapped


  // const accoladesArray = await Accolade.bulkCreate(accoladesUpdate)
  // const accolades = accoladesArray.map(accolade => accolade.get({plain:true})) Scrapped

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

  const orders = ['Neat', 'On the Rocks', 'Mixed drink']
  const notes = ['Oak', 'Caramel', 'Vanilla', 'Smoky', 'Fruity', 'Charcoal', 'Spice', 'Floral', 'Dry', 'Nutty', 'Clove', 'Sour', 'Honey', 'Toffee', 'Fig']
  const favoritesArray = await FavoriteBottle.bulkCreate(users.map(user => {
    const randomBottle = bottles[Math.floor(Math.random() * bottles.length)].id
    const randomOrder = orders[Math.floor(Math.random() * orders.length)]
    const randomNotes = notes[Math.floor(Math.random() * notes.length)]
    console.log(user.id)
    return { bottle_id: randomBottle, user_id: user.id, order: randomOrder, taste_notes: randomNotes}
  }))

  const favorites = favoritesArray.map(favorite => favorite.get({plain:true}))

  console.log(favorites)
  process.exit(0);
};

seedDatabase();
