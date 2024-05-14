const router = require("express").Router()


module.exports = (io) => {

  router.post('/message', (req, res) => {
    const { message } = req.body;
    // Broadcast the message via Socket.IO
    io.emit('chat message', message);
    res.status(201).json({ status: 'Message broadcasted via Socket.IO', message });
  });

  return router;

}
