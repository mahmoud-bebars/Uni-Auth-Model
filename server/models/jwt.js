// db importing
const db = require('../config')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

// jwt decoder package import
const jwtDecode = require('jwt-decode')

// exporting jwt package for global use
exports.main = require('jsonwebtoken')

// JWT importing package
const main = require('jsonwebtoken')

// Generate Access Token
exports.generateAccessToken = (result) => {
  return main.sign(
    {
      userid: result.userid,
      email: result.email,
      type: result.type,
    },
    env.JWT_SECRET,
    { expiresIn: '1d' }
  )
}

// Generate Refresh Token
exports.generateRefreshToken = (result) => {
  return main.sign(
    {
      userid: result.userid,
      email: result.email,
      type: result.type,
    },
    env.JWT_REFRESH_SECRET
  )
}

exports.storeAcessToken = (token, userid) => {
  // decode accessToken to get iat & exp
  const decoded = jwtDecode(token)
  // insert acessToken in the tokens table
  const tokenSql = 'INSERT INTO tokens SET ?'

  db.start.query(
    tokenSql,
    {
      userid: userid,
      token: token,
      expired: false,
      issuedAt: decoded.iat,
      expirationTime: decoded.exp,
    },
    (err, result) => {
      if (err) {
        // A problem happend and accessToken haven't been inserted to the table
        res.send(err)
        console.log(err)
      } else {
        console.log('access Token created')
      }
    }
  )
}

// verify Json Token func
exports.verifyJWT = (req, res, next) => {
  /* - GET request sends the headers normally in the verify Auth route
  - POST request in the logOut sends the header as a data
  so the two options here save time  */
  const authToken = req.headers.authorization || req.body.Authorization
  if (authToken) {
    const token = authToken.split(' ')[1]
    main.verify(token, env.JWT_SECRET, (err, user) => {
      if (err) {
        res.send({ auth: false, message: 'Token is invaild' })
      } else {
        //return user data results to use it in the auth functions
        req.user = user
        next()
      }
    })
  } else {
    res.send({ auth: false, message: 'No token Founded please login again' })
  }
}
