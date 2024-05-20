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
      req.session.user_id = userData.id
      req.session.logged_in = true;

      res.status(200).json({ userData });
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
      { email: req.body.email }
    });
    
    if (!userData) {
      res
      .status(400)
      .json({ message: 'Incorrect email, please review your email and try again' });
      return;
    }
    
    const validPassword = await userData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res
      .status(400)
      .json({ message: 'Incorrect password, please review and try again.' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true;
      
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});



// Logout the user
router.post('/logout', (req, res) => {
  console.log('click');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      console.log('logged out');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
    console.log('error');
  }
});



// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.

// router.post('/logout', (req, res) => {
//   if(req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         res.status(400).send('Unable to log you out')
//       } else {
//         res.send('Logout successful')
//       }
//     });
//   } else {
//     res.end()
//   }
// })


// PUT Update User based on id
router.put('/:id', async (req, res) => {
  try {
    const updateUser = await User.update(
      { // these are the fields that can be edited (becuase I am a scoundral)
        region: req.body.region
      }, {
        where: {
          id: req.params.id,
        }, individualHooks: true
      }
    )
    if (!updateUser) {
      res.status(404).json({ message:'No user was found with this id.' });
      return;
    }
    res.status(200).json({ status: "Success! User has been updated", result: updateUser })

    } catch(err) {
      res.status(404).json({ message: err.message });
    }
  });



// A user that no longer wants to be a part of our site
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id}
    });

    if (!userData) {
      res.status(404).json({ message: 'No user was found with this id.' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({
      message: "userRoutes in api line 137",
    });
  }
});





module.exports = router;
