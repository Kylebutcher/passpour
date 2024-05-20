const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Bottle } = require('../../models');

const userData = require("../../db/seeds/user-data.json")

router.post("/", async (req, res) => {

  // Tyler and I tried this adjustment to line 10, then rememebered that I needed to push the current code to make it available to Gary.
  await User.destroy({ truncate : true, cascade: false })

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