const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// takes all static content and serves as assets
app.use(express.static(path.join(__dirname, './public')));

// turn on routing from ./routes/index.js
app.use(routes);


// turn on db connection thru sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {console.log('sequelize now listening.')});
})