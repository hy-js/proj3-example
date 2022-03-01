// Imports express module
const express = require('express')
const data = require('./Data.js')

// Initialise express server
const app = express()
const PORT = 3000 || process.env.PORT

// Routes
app.get('/', (req, res) => {
   res.send('Welcome to our schedule website')
})

app.get('/goodbye', (req, res) => {
   res.send('<h1>cya</h1>')
})

app.get('/ping', (req, res) => {
   res.send('pong')
})

// JSON
app.get('/api/users', (req, res) => {
   res.json(data.users)
})

app.get('/api/posts', (req, res) => {
   res.json(data.posts)
})


app.listen(PORT);
console.log('Express server running on port 3000');