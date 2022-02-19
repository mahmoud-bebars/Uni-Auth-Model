const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

// registartion system connection
exports.start = mysql.createConnection({
  host: env.DATABASEHOST,
  user: env.DATABASEUSER,
  password: env.DATABASEPASSWORD,
  database: env.DATABASE,
})
