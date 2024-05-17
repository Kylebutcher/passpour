const router = require('express').Router();
const { Accolade, UserAccolade, User } = require('../../models');


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
// for the comments above.
router.put('/:id', async (req, res) => {
// const accolade = Accolade.findByPk(req.params.id)
  const updateAccolade = await User.update()
})

router.post('/:id', async (req, res) => {
  try{
    const addAccolade = await UserAccolade.create({ user_id: user, 
    accolade_id:req.params.id});
  const user = User.findByPk(req.session.user_id);
      res.status(200).json(addAccolade);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const accoladeData = await User.create(req.body);
    res.status(200).json(accoladeData);
  } catch (err) {
    res.status(400).json(err);
  }
});




module.exports = router;