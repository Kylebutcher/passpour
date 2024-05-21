// pageRoutes are complete, do not touch

const router = require('express').Router();
const { Bottle, User, FavoriteBottle } = require('../models');


const path = require("path");

const withAuth = require('../utils/auth');


// The Explore Page is the only page that all Traffic can see, including non-users. 
router.get('/', async (req, res) => {
  const bottleData = await Bottle.findAll()
  const bottles = bottleData.map(bottle => bottle.get({ plain: true }))
  console.log(bottleData)
  res.render('explore', {
    bottles,
    layout: 'main'
  });
});



// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: 
//         Accolade,
//         Bottle,
//       }],
//     });


//     // const user = userData.get({ plain: true });

//     // res.render('profile', {
//     //   ...user,
//     //   logged_in: true
//     // });
//     res.sendFile(path.join(__dirname, '../public/html/profile.html'))
//     // res.send("Hello");
//   } catch (err) {
//     res.status(500).json({ status: "Error on pageRoutes, line 102"});
//   }
// });




// If the user is already logged in, redirect the request to profile page route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login', {
    layout: 'login'
  });
});



//Showcase route, the user needs to have an account to access unique bottles associated with them
router.get('/showcase', withAuth, async (req, res) => {
  const favoriteData = await User.findOne({
    where: { id: req.session.user_id }, include: {
      model: Bottle,
      through: FavoriteBottle
    }
  })

  const user = favoriteData.get({ plain: true })
    res.render('favorites', {
      bottles: user.bottles,
      layout: 'showcase',
      logged_in: true
    });
  }
)



//profile Route, only users get a profile to use. 
router.get('/profile', withAuth, async (req, res) => {
  console.log(req.session)
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude:["password"] }, 
      include: [{ model: Bottle, 
        through: FavoriteBottle
       }]
    })

    const user = userData.get({ plain: true })
    res.render('profile', { layout: 'profile', 
      ...user, 
      logged_in: true,
    })
  } catch (err) {
    res.status(500).json({ status: "Error on pageRoutes > /profile"});
    console.log(err.message)
  }
})


module.exports = router;