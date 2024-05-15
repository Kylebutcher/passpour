const router = require('express').Router();



router.get("/", (req, res) => {
  res.render("test", {
    logged_in: true,
    user_name: 'fred1000'
  })
})


module.exports = router;