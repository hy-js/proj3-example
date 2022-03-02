// Imports express module
const express = require('express');
const data = require('./Data.js');
const path = require('path');

// Initialise express server
const app = express();
const PORT = 3000 || process.env.PORT;

// MIDDLEWARE
// serve static files
// app.use(express.static(path.join(__dirname, 'public')))

// BODY PARSER
// TURNS:
// "firstname=Donald&lastname=Duck&email=coincoin@gmail.com&password=daisy"
// INTO:
// {"firstname":"Donald","lastname":"Duck","email":"coincoin@gmail.com","password":"435235452456adfas"}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Confirm connected
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to our website');
});

// Get all users route
app.get('/api/users', (req, res) => {
  res.json(data.users);
});

// Paramaters
// Get specific user
app.get('/api/users/:id', function (request, response) {
  console.log(request.params.id);
  const id = request.params.id;
  // Validation for only user ids that exist
  if (id >= data.users.length) {
    response.status(400).json({ msg: 'User is not found' });
  }
  response.json(data.users[id]);
});

// Get all posts route
app.get('/api/posts', (req, res) => {
  res.json(data.posts);
});

// Get specific post route
app.get('/api/posts/:id', function (request, response) {
  console.log(request.params.id);
  const id = request.params.id;
  // TODO: Validation for only user ids that exist
  if (id >= data.posts.length) {
    response.status(400).json({ msg: 'User is not found' });
  }
  response.json(data.posts[id]);
});

// Create new post
app.post('/api/posts', (req, res) => {
  // TODO: Validate data -
  // Requires body to parsed
  console.log(req.body);
  data.posts.push(req.body);
  res.send(req.body);
});

// Create new USER
app.post('/api/users', (req, res) => {
  // TODO: Validate data
  // Encrypt password
  // Only allow firstname, lastname, and email fields

  data.users.push(req.body);
  res.send(data.users);
});

// CRUD commands
// Create, read, update and delete
// HTTP methods
// post, get, put/patch and delete

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
