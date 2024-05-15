

const router = require('express').Router();
const users = require('./userRoutes');
const accolades = require('./accoladeRoutes');
const bottles = require('./bottleRoutes');
const testRoutes = require("./test.controller")


//Database / Models
router.use('/users', users);
router.use('/accolades', accolades);
router.use('/bottles', bottles);

//Socket Testing
router.use('/test', testRoutes)


module.exports = router;