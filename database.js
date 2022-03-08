// IMPORT PG PROMISE, INITIALISE AND CONNECT DB
const pgp = require('pg-promise')()

// const cn = 'postgres://postgres:1234@localhost:5432/incode7_test'

const username = 'postgres'
const password = '1234'
const host = 'localhost'
const port = '5432'
const database = 'incode7_test'

const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`

// Creat db instance
const db = pgp(connectionString)

module.exports = db
