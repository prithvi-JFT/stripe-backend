require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/db')
const userRoutes = require('./routes/users')

// express app
const app = express();

let corsOptions = {
	origin: 'http://localhost:3000/',
};
app.use(cors(corsOptions));

// to access data from requests
app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

console.log('Hitting port 8080')

//simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Stripe' });
});

app.use('/',userRoutes)

// set port, listen for requests
sequelize.sync().then(() => {
  app.listen(8080, () => {
      console.log('Server is running on port 8080');
  });
});

// connect to db
