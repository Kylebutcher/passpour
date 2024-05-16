// Entire Page needs review
// Old variables are in there as: Project

const router = require('express').Router();
const { Accolade, Bottle, User } = require('../models');
const path = require("path");
//const withAuth = require('../utils/auth');

// Home Page
router.get('/', async (req, res) => {
  let accolades = []

  try {
    // Get all Accolades and JOIN with User data
    accolades = await Accolade.findAll({
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

    // Get all Bottles and JOIN with User data
    // Do I hav to make a if statement in the Public JS folder for this to be IF THE USER HAS IT IN THIER COLLECTION? 
    const bottleData = await Bottle.findAll()
    // const bottleData = await Bottle.findAll({
    //   include: [
    //     {
    //       model: Bottle,
    //       attributes: ['whiskey_type'],
    //     },
    //   ],
    // });
  } catch (err) {
    console.log(err.message)
  }

  res.render('homepage', { 
    accolades, // The Showcase
      // I think we should add the bucket list objects and the table of pours object, but I dont know how to do that here / if we need to do it here or somewhere else
    logged_in: req.session.logged_in
  });

});



router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/profile', (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Accolade }],
    // });

    // const user = userData.get({ plain: true });

    // res.render('profile', {
    //   ...user,
    //   logged_in: true
    // });
    res.sendFile(path.join(__dirname, '../public/html/profile.html'))
    // res.send("Hello");
  } catch (err) {
    res.status(500).json({ status: "Error on homeRoutes, line 79"});
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