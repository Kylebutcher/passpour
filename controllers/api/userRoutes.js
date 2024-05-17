const router = require('express').Router();
const { User } = require('../../models');


//Get all users
router.get('/', async (req, res) => {
  User.findAll().then((userData) => {
    res.json(userData);
    console.log("get all users route, line 9")
  })
})



// A user signed up for our site, creating a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      region: req.body.region
    });

    console.log(userData)
    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json({ ok: true });
    })

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});



router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ 
      where: 
      {email: req.body.email}
    });

    if (!userData) {
      res
        .status (400)
        .json({ message: 'Incorrect email, please review your email and try again'});
      return;
    }

    const validPassword = await userData.checkPassword (req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please review and try again.'});
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});



// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})



// PUT Update User based on id
router.put('/users/:id', (req, res) => {
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
router.delete('/users/:id', async (req, res) => {
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
    res.status(500).json({
      message: "userRoutes in api line 120",});
      return;
  }
});




module.exports = router;
