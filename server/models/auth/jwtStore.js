// db importing
const db = require('../../config')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

// jwt decoder package import
const jwtDecode = require('jwt-decode')

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
