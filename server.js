const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routing from ./routes/index.js
app.use(routes);

// turn on db connection thru sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {console.log('sequelize now listening.')});
})