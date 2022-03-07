// 1. Import express
const express = require('express');
const app = express();

// 1.1 Create port variable
const port = 3000 || process.env.PORT;

// 2. Import libraries / data
const { users, posts, comps } = require('./data/Data');
let morgan = require('morgan');
let bcrypt = require('bcryptjs');
let ejs = require('ejs');
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
  res.render('pages/home', { users, title: 'welcome' });
});

// POSTS -----------------------------------
// DISPLAY ALL POSTS
app.get('/posts', (req, res) => {
  res.render('pages/posts', { posts, title: 'welcome' });
});

// GET ALL posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// GET specific post
app.get('/api/posts/:id', (req, res) => {
  const index = req.params.id;
  console.log(typeof index);
  const _posts = posts.filter((x) => x.id === parseInt(index));
  // OR use a for loop like so:
  // let _posts = [];
  // for (let i = 0; i < posts.length; i++) {
  //   if (posts[i].id === Number(index)) {
  //     _posts.push(posts[i]);
  //   }
  // }

  // If posts exist show
  if (_posts.length > 0) {
    res.send(_posts);
  } else {
    res.json({ msg: 'No posts with that id' });
  }
});

// Create new post
app.post('/api/posts', (req, res) => {
  // TODO: Validate data -
  console.log(req.body);
  posts.push(req.body);
  res.send(posts);
});

// USERS -----------------------------------
//   GET ALL users
app.get('/api/users', (req, res) => {
  res.json(users);
});

//  GET specific user
app.get('/api/users/:id', (req, res) => {
  console.log(req.params.id);
  const index = req.params.id;
  const user = users[index];
  // TODO: validation numbers only
  // Validation for length
  if (index >= users.length) {
    res.status(400).json({ msg: 'User is not found' });
  }
  res.send(user);
});

// GET specific user's posts
app.get('/api/users/posts/:userId', (request, res) => {
  const id = request.params.userId;
  const _posts = posts.filter((x) => x.userId === parseInt(id));
  res.json(_posts);
});

// POST new USER
app.post('/api/users', (req, res) => {;
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

// COMPETENCIES-----------------------------------
//  GET ALL competencies
app.get('/api/comps', (req, res) => {
  res.json(comps);
});

// GET specific person's comps
// Paramater - lastname
app.get('/api/comps/:id', (req, res) => {
  const lastname = req.params.id;
  // console.log(id)
  for (let i = 0; i < comps.length; i++) {
    console.log(comps[i].lastname);
    // validation - lowercase?
    if (comps[i].lastname == lastname) {
      // res.json(comps[i])
      res.render('pages/individualComp', { comp: comps[i] });
    }
  }
});

// 5. Listen to express app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
