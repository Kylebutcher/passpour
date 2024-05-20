const router = require('express').Router();

// Import the routes. This is how we make our routes modular.
const usersRoutes = require('./userRoutes');
// const accoladeRoutes = require('./accoladeRoutes'); Scrapped
const bottleRoutes = require('./bottleRoutes');
const showcaseRoutes = require('./showcaseRoutes');

// const testRoutes = require('../../controllers/');

//Database / Models
// router.use()
router.use('/users', usersRoutes);
// router.use('/accolades', accoladeRoutes); // Scrapped
router.use('/bottles', bottleRoutes);
router.use('/showcase', showcaseRoutes);



//Socket Testing
// router.use('/test', testRoutes)

// copy pasted this below from the test.controller.js file and deleted that file
// const router = require("express").Router()

// router.get("/", (req, res) => {
//   res.send('GET route for /api/test works')
// })

// router.post("/", (req, res) => {
//   res.send('POST route for /api/test works')
// })

// router.put("/", (req, res) => {
//   res.send('PUT route for /api/test works')
// })

// router.delete("/", (req, res) => {
//   res.send('DELETE route for /api/test works')
// })

module.exports = router;
  