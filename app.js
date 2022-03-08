// 1. Import express
const express = require('express');
const app = express();

// 1.1 Create port variable
const port = 3000 || process.env.PORT;

// 2. Import libraries / data
let morgan = require('morgan');
let bcrypt = require('bcryptjs');
let ejs = require('ejs');
const path = require('path');
const db = require('./database')

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
app.set('views', './views'); // sets 'views' folder as the folder for grabbing templates when res.rendering

// 4. Routes
// CRUD commands
// create, read, update, delete
// HTTP verbs
//  post, get, put/patch , delete

// ROOT -----------------------------------
app.get('/', (req, res) => {
  res.render('pages/home')
})

app.get('/posts', (req,res) => {
  db.any('SELECT * FROM posts')
    .then((posts) => {
        // success;
        console.log(posts)

        res.render('pages/posts',
        {posts,
        title: 'ALL posts'})
    })
    .catch((error) => {
        // error;
        console.log(error)
        res.redirect("/error?message=" + error.message)
    });
})

// 5. Listen to express app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
