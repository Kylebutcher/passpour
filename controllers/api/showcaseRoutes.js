// API Finished Do Not Touch

const router = require('express').Router();
const { FavoriteBottle } = require('../../models');

router.post("/", async (req, res) => {
  try {
    const newBottle = await FavoriteBottle.create({ 
      taste_notes: req.body.taste,
      order: req.body.text,
      user_id: req.session.user_id,
      bottle_id: req.body.bottle_id
    });

    res.json(newBottle)
    console.log(newBottle)

    // res.status(200).json({ ok : true });
  } catch (err) {
    res.status(400).json(err);
    console.log('line 19 the catch', err.message)
  }
});




module.exports = router;