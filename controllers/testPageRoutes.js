const router = require('express').Router();
const User = require('../models/User');

router.get("/", (req, res) => {
  res.render("test", {
    logged_in: req.session.logged_in,
    first_name: User.first_name
  })
})


module.exports = router;