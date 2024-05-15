const router = require('express').Router();
const bottleData = require('../../models/Bottle');

// GET one bottle
router.get('/:id', async (req, res) => {
  try {
    const bottleData = await User.findByPk(req.params.id);
    if (!bottleData) {
      res.status(404).json({
        message: 'No user with this id!'
      });
      return;
    }
    res.status(200).json(bottleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new journal entry for the whiskey product

router.post('/', async (req, res) => {
  try {
    const bottleData = await User.create(req.body);
    res.status(200).json(bottleData);
  } catch (err) {
    res.status(400).json(err);
  }
  });

// PUT update a journal entry
router.put('/:id', async (req, res) => {
  try {
    const bottleData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!bottleData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(bottleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
