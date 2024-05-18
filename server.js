// Dependencies
const express = require('express');
const path = require("path")
const session = require('express-session');
const exphbs = require('express-handlebars')
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 3002;


/* socket io stuff */
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

const chatRoutes = require('./controllers/chat/index')(io);

// const chatRoutes = require('./controllers/chat/index')(io);


/**
 * This calls a function in services/socketio.js that basically
 * boots up the socket functionality
 */
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

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"))
// })

app.post('/api/chat/message', (req, res) => {
  console.log("received")
  const { message } = req.body;
  // Broadcast the message via Socket.IO
  io.emit('chat message', message);
  res.status(201).json({ status: 'Message broadcasted via Socket.IO', message });
});


/* cookie-handling settings is inserted in the cookie object below */
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });


// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/chat", chatRoutes)
app.use('/', routes);


// app.get('/chat', (req, res) => {
//   return res.render("chat")
// })



sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});
