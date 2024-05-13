const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 3001;

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/api/routes'));