const router = require('express').Router();

// Import the routes. This is how we make our routes modular.
const usersRoutes = require('./userRoutes');
const accoladeRoutes = require('./accoladeRoutes');
const bottleRoutes = require('./bottleRoutes');

const testRoutes = require('./test.controller');



//Database / Models

// When a request is made to the /users, /accolades or /bottles path, it will be directed to the index.js in the //users, /accolades or /bottles folder.

router.use('/users', usersRoutes);
router.use('/accolades', accoladeRoutes);
router.use('/bottles', bottleRoutes);





//Socket Testing
// router.use('/test', testRoutes)


module.exports = router;  