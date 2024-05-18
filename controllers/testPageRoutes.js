const router = require('express').Router();
const User = require('../models/User');

router.get("/", async (req, res) => {
  const userData = await User.findByPk(req.session.user_id)
  const user = userData.get({plain: true})
  res.render("test", {
    logged_in: req.session.logged_in,
  })
})

module.exports = router;