// 1. Import express
const express = require('express');
const app = express();

// 1.1 Create port variable
const port = 3000 || process.env.PORT;

// 2. Import libraries / data
const { users } = require('./data/Data');
let morgan = require('morgan');
let bcrypt = require('bcryptjs');
const path = require('path');

// 3. Middleware
// BODY PARSER:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOGGING MIDDLEWARE
app.use(morgan('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS CONFIG
app.set('view engine', 'ejs'); // sets ejs as view engine
app.set('views', './views'); // sets 'views' folder as teh folder for grabbing templates when res.rendering

// 4. Routes
// CRUD commands
// create, read, update, delete
// HTTP verbs
//  post, get, put/patch , delete

// ROOT -----------------------------------
app.get('/', (req, res) => {
  res.json('welcome to the website');
});

// USERS -----------------------------------
//   GET ALL users
app.get('/users', (req, res) => {
  res.json(users);
});

//  GET specific user
app.get('/users/:id', (req, res) => {
  const index = req.params.id;
  const user = users[index];
  // TODO: validation numbers only
  // Validation for length
  if (index >= users.length) {
    res.status(400).json({ msg: 'User is not found' });
  }
  res.send(user);
});

// POST new USER
app.post('/users', (req, res) => {;
  const { firstname, lastname, email, password } = req.body;
  // Encrypt password
  let salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  //  Create new user model
  const newUser = {
    user_id: users.length,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hash
  };
  users.push(newUser);
  res.send(users);
});

// 5. Listen to express app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
