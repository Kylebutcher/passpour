


const mount = (io) => {

  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Broadcast chat message to all connected users
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

}

module.exports = mount