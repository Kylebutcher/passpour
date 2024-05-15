const router = require('express').Router();
const users = require('./userRoutes');
const accolades = require('./accoladeRoutes');
const bottles = require('./bottleRoutes');



router.use('/users', users);
router.use('/accolades', accolades);
router.use('/bottles', bottles);


module.exports = router;