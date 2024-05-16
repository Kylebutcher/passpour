const router = require('express').Router();
const { User } = require('../../../../lessons/14-MVC/01-Activities/28-Stu_Mini-Project/Develop/models');
// Import the Project model from the models folder
const { Project } = require('../../models/User');

User
  .findAll()
  .then( results => {
    //.. results
  })

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// below not sure of what needs to be in here at the moment if anything at all.

// router.post('/', (req, res) => {
// // unsure if i need this part right now for routing purposes.
//   // User.create({
//   //   firstName: req.body.firstName,
//   //   lastName: req.body.lastName,
//   //   email: req.body.email
//   // })
//     .then((newUser) => {
//       res.json(newUser);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });


module.exports = router;
