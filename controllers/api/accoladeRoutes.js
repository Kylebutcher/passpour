const router = require('express').Router();
const { Accolades } = require('../../models/Accolade');

// GET to accolades
router.get('/accolade', async (req, res) => {
  try {
    const accoladeData = await User.findByPk(req.params.id);
    if (!accoladeData) {
      res.status(404).json({
        message: 'No user with this id!' });
        return;
    }
    res.status(200).json(accoladeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST give new accolade to user
router.post('/accolade', async (req, res) => {
  try {
    const accoladeData = await User.create(req.body);
    res.status(200).json(accoladeData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// if a DELETE request is made to /api/projects/:id, that project is deleted.
router.delete('/accolade', async (req, res) => {
  try {
    const accoladeData = await Accolade.destroy({
      where: {
        id: req.params.id, 
        user_id: req.session.user_id,
      },
    });

    if (!accoladeData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(accoladeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
const { Accolade } = require('../../models/Accolade');


// GET all Accolades
router.get('/', async (req, res) => {
  Accolade.findAll().then((AccoladeData) => {
    res.json(AccoladeData);
  });
});



// GET a specific accolade
router.get('/:id', async (req, res) => {
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