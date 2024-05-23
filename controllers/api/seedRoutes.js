const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Bottle } = require('../../models');

const bottleData = require("../../db/seeds/bottle-data.json")

router.post("/", async (req, res) => {

  // Tyler and I tried this adjustment to line 10-19, added then/catch block, and some syntax was adjusted. Pleaes take a look at the file: models>index.js on line 40 there was a left over SET and we placed only CASCADE. 
  await Bottle.destroy({
    truncate: true,
    cascade: true
  })
  .then(() => {
    console.log('Table truncated successfully.');
  })
  .catch((error) => {
    console.error('Error truncating table:', error);
  });

  const bottlesUpdate = bottleData.map(bottle => {
    const { id, ...update } = bottle
    return update
  })

  const bottlesArray = await Bottle.bulkCreate(bottlesUpdate, {
    individualHooks: true,
    returning: true,
  });
  const bottles = bottlesArray.map(bottle => bottle.get({plain:true})) 


  res.json({ status: "ok", payload: bottles })

})



module.exports = router;
