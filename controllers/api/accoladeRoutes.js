const router = require('express').Router();
const { Accolade } = require('../../models/Accolade');


// GET all Accolades
router.get('/accolades', async (req, res) => {
  Accolade.findAll().then((AccoladeData) => {
    res.json(AccoladeData);
  });
});



// GET a specific accolade
router.get('/accolade/:id', async (req, res) => {
  try {
    const accoladeData = await User.findByPk(req.params.id);
    if (!accoladeData) {
      res.status(404).json({
        message: 'No accolade can be found' });
        return;
    }
    res.status(200).json(accoladeData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ASK KATY
// update methoud for sequlize (find 1 + update)
// POST give accolade to user
router.post('/', async (req, res) => {
  try {
    const accoladeData = await User.create(req.body);
    res.status(200).json(accoladeData);
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;