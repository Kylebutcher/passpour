const router = require("express").Router()

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