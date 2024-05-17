

const router = require('express').Router();
const users = require('./userRoutes');
const accolades = require('./accoladeRoutes');
const bottles = require('./bottleRoutes');

// const testRoutes = require('../../controllers/');



//Database / Models
// router.use()
router.use('/users', users);
router.use('/accolades', accolades);
router.use('/bottles', bottles);

//Socket Testing
// router.use('/test', testRoutes)

// TODO catch all 

// copy pasted this below from the test.controller.js file and deleted that file
// const router = require("express").Router()

router.get("/", (req, res) => {
  res.send('GET route for /api/test works')
})

router.post("/", (req, res) => {
  res.send('POST route for /api/test works')
})

router.put("/", (req, res) => {
  res.send('PUT route for /api/test works')
})

router.delete("/", (req, res) => {
  res.send('DELETE route for /api/test works')
})

module.exports = router;





module.exports = router;  