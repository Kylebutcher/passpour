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