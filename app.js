require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users')
const User = require('./models/User'); // Adjust the path based on your file structure
const sequelize = require('./models/db'); // Adjust the path based on your file structure


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

app.use('/',userRoutes)

sequelize.sync()
.then(() => {
  console.log('Database sync complete.');
})
.catch(error => {
  console.error('Error syncing database:', error);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// connect to db
