// Accolade Table is scraped for time. 
// This Routes is void, do not touch



// const router = require('express').Router();
// const { Accolade } = require('../../models');


// // GET all Accolades
// router.get('/', async (req, res) => {
//   Accolade.findAll().then((AccoladeData) => {
//     res.json(AccoladeData);
//   });
// });



// // GET a specific accolade
// router.get('/:id', async (req, res) => {
//   try {
//     const accoladeData = await User.findByPk(req.params.id);
//     if (!accoladeData) {
//       res.status(404).json({
//         message: 'No accolade can be found' });
//         return;
//     }
//     res.status(200).json(accoladeData);
//   } catch (err) {
//     res.status(500).json({
//       message: "accoladeRoutes in api line 25",});
//       return;
//   }
// });


// // POST give accolade to user
// router.post('/', async (req, res) => {
//   try {
//     const accoladeData = await User.create(req.body);
//     res.status(200).json(accoladeData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });




// module.exports = router;