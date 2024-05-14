const router = require("express").Router()

const testRoutes = require("./test.controller")

router.use('/test', testRoutes)

module.exports = router;