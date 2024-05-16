const router = require('express').Router();
const { Accolades } = require('../../models/Accolade');

// GET an accolade
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
  try {
    const accoladeData = await User.create(req.body);
    res.status(200).json(accoladeData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// if a DELETE request is made to /api/projects/:id, that project is deleted.
router.delete('/:id', async (req, res) => {
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