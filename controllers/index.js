const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./pageRoutes');
const testRoutes = require('./testPageRoutes');

router.use('/', pageRoutes);
router.use("/test", testRoutes)
router.use('/api', apiRoutes);

module.exports = router;
