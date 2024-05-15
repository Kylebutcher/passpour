const express = require('express');
const app = express();

const apiRoutes = require("./controllers")


/**
 * Socket.io requires its own server so we use a small server package 
 * called http, which is built into Express.
 */
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const chatRoutes = require('./controllers/chat/index')(io);
const mount = require("./services/socketio")


const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/chat", chatRoutes)
app.use('/', apiRoutes);



/**
 * This calls a function in services/socketio.js that basically
 * boots up the socket functionality
 */
mount(io);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
