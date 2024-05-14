const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 3001;

const routes = require('./controllers');


const sequelize = require('./config/connections');
const helpers = require('./utils/helpers');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('./controllers/api/routes'));

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
