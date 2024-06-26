// This Api Route is finished, do not touch

const router = require('express').Router();
const { Bottle } = require('../../models');



// GET all bottles
router.get('/', async (req, res) => {
  const bottleData = await Bottle.findAll()
  res.json(bottleData);
});



// GET one bottle
router.get('/:id', async (req, res) => {
  try {
    const bottleData = await Bottle.findByPk(req.params.id);
    if (!bottleData) {
      res.status(404).json({
        message: 'No bottle was found with this id!'
      });
      return;
    }
    res.status(200).json(bottleData);
  } catch (err) {
    res.status(500).json({
      message: "accoladeRoutes in api line 28",});
      return;
  }
});


// POST create a new journal entry for the whiskey product (bottle) || Currently Scrapped
// router.post('/', async (req, res) => {
//   try {
//     const bottleData = await User.create({
//       ...req.body
//     });

//     req.session.save(() => {
//       req.session.bottle_id = newBottle.id
//     })

//     res.status(200).json({ ok : true });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



// PUT update a bottle info
// This route is for the code block of: 33-48, it does work at its current state, but it wont be beneficial to the project. 
// router.put('/:id', async (req, res) => {
//   try {
//     const bottleData = await User.update(req.body, {
//       where: {
//         whiskey_name: req.params.whiskey_name,
//         whiskey_type: req.params.whiskey_type
//       },

//       individualHooks: true
//     });
//     if (!bottleData[0]) {
//       res.status(404).json({ message: 'No bottle with this id!' });
//       return;
//     }
//     res.status(200).json(bottleData);
//   } catch (err) {
//     res.status(500).json({
//       message: "bottleRoutes in api line 70",});
//       return;
//   }
// });




// POST give a bottle to user to become a favorte
// This has been moved to Controllers>api>showcaseRoutes.js file. 
// router.post('/:id', async (req, res) => {
//   try {
//     const accoladeData = await User.create(req.body);
//     res.status(200).json(accoladeData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });





module.exports = router;