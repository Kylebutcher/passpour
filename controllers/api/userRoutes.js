const router = require('express').Router();
const { User } = require('../../models/User');




// A user signed up for our site
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body
    });

    req.session.save(() => {
      req.session.user_id = newUser.id
    })

    res.status(200).json({ ok : true });
  } catch (err) {
    res.status(400).json(err);
  }
});



// PUT Update User based on id
router.put('/:id', (req, res) => {
  User.update(
    {
      // these are the fields that can be edited
      region: req.body.region
    },
  )
    .then((updateUser) => {
      // sends the updated bottle as a json response
      res.json(updateUser);
    })
    .catch((err) => res.json(err));
});



// A user that no longer wants to be a part of our site
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user was found with this id.' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
