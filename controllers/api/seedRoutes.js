const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Bottle } = require('../../models');

const userData = require("../../db/seeds/user-data.json")

router.post("/", async (req, res) => {

  // Tyler and I tried this adjustment to line 10-19, added then/catch block, and some syntax was adjusted. Pleaes take a look at the file: models>index.js on line 40 there was a left over SET and we placed only CASCADE. 
  await User.destroy({
    truncate: true,
    cascade: true
  })
  .then(() => {
    console.log('Table truncated successfully.');
  })
  .catch((error) => {
    console.error('Error truncating table:', error);
  });

  const usersUpdate = userData.map(user => {
    const { id, ...update } = user
    return update
  })

  const usersArray = await User.bulkCreate(usersUpdate, {
    individualHooks: true,
    returning: true,
  });
  const users = usersArray.map(user => user.get({plain:true})) 


  res.json({ status: "ok", payload: users })

})



module.exports = router;