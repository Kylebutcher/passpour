const router = require('express').Router();
const { Accolade, Bottle, User } = require('../models');

const path = require("path");

const withAuth = require('../utils/auth');


// Home Page
router.get('/', async (req, res) => {
  let accolades = []

  try {
    // Get all Accolades and JOIN with User data
    const accoladeData = await Accolade.findAll({
      include: [
        {
          model: Accolade,
          attributes: ['badge'],
        },
      ],
    });
  
  


// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/html/homepage.html'))
// });

    const accolades = accoladeData.map((accolade) => 
      accolade.get({ plain: true })
    );



    // Get all Bottles and JOIN with User data
    const bottleData = await Bottle.findAll({
      include: [
        {
          model: Bottle,
          attributes: [
            'whiskey_name',
            'whiskey_type'
          ],
        },
      ],
    });

    const bottles = bottleData.map((bottle) =>
      bottle.get({ plain: true })
    );

    res.render('homepage', { 
      accolades,
      bottles,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }  
});



router.get('/accolade/:id', async (req, res) => {
  try {
    const accoladeData = await Accolade.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'category',
            'badge',
          ],
        },
      ],
    });

    const accolade = accoladeData.get({ plain: true });

    res.render('accolade', {
      ...accolade,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: 
        Accolade,
        Bottle,
      }],
    });


    // const user = userData.get({ plain: true });

    // res.render('profile', {
    //   ...user,
    //   logged_in: true
    // });
    res.sendFile(path.join(__dirname, '../public/html/profile.html'))
    // res.send("Hello");
  } catch (err) {
    res.status(500).json({ status: "Error on pageRoutes, line 102"});
  }
});



// If the user is already logged in, redirect the request to profile page route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;