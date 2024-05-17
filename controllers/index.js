const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./pageRoutes');
const testRoutes = require('./testPageRoutes');

// router.use("/test", testRoutes)
router.use('/api', apiRoutes);
router.use('/', pageRoutes);

module.exports = router;
