// db importing
const db = require('../../config')

// jwt model import
const jwtStore = require('./jwtStore')
const jwtM = require('../../utils/jwt')
// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

// password hashing package importing
const bcrypt = require('bcrypt')

const arr = require('./arraies')

// GET Verify user Auth
exports.auth = (req, res) => {
  if (req.user.userid === req.headers.userid) {
    res.send({
      Auth: true,
      email: req.user.email,
      userid: req.user.userid,
      message: 'this account is sgined up & verfied',
    })
  }
}

// POST user login
exports.login = (req, res) => {
  // user login data from the request body
  const { email, password } = req.body

  // verify user existed in db
  const sql = 'SELECT * FROM users WHERE email = ? '
  db.start.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err)
      res.send({ err: err })
    }

    if (result.length > 0) {
      // verify password is matched with hashed password
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          const user = result[0]
          // generate asscess Token for the user
          const accessToken = jwtM.generateAccessToken(user)
          const refreshToken = jwtM.generateRefreshToken(user)

          // store refresh token in a temparory array for checking
          arr.refreshTokens.push(refreshToken)

          //store the token in the tokens table
          jwtStore.storeAcessToken(accessToken, user.userid)

          // user logged in Successfully
          res.json({
            Auth: true,
            userid: user.userid,
            username: user.username,
            email: user.email,
            accessToken,
            refreshToken,
            message: 'user loggedin',
          })
          console.log('user Loggedin')
        } else {
          res.send({
            Auth: false,
            err: err,
            message: 'Wrong password, please try Again!',
          })
        }
      })
    } else {
      res.send({ Auth: false, message: "User Doesn't exisit" })
    }
  })
}

// POST user logout
exports.logout = (req, res) => {
  // hold the refresh token from either the request body or the headers
  const refreshToken = req.headers.refresh || req.body.refresh
  arr.refreshTokens = arr.refreshTokens.filter(
    (token) => token !== refreshToken
  )
  res.send({ auth: false, message: 'You logged out successfully' })
  console.log('user logged out successfully')
}
