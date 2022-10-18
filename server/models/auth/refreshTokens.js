// jwt model import
const jwtM = require('../../utils/jwt')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

const arr = require('./arraies')

// refresh the access token
exports.refresh = (req, res) => {
  // take the refresh token from the request body
  const refreshTokens = arr.refreshTokens
  const refreshToken = req.headers.refresh
  // send the error
  if (!refreshToken) {
    res.send({ Auth: false, message: "You aren't Authanticated!" })
  }
  if (!refreshTokens.includes(refreshToken)) {
    res.send({ Auth: false, message: "Refresh token isn't valid" })
  }
  // verfiy the refresh token
  jwtM.main.verify(refreshToken, env.JWT_REFRESH_SECRET, (err, result) => {
    err && console.log(err)
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    //if everything is okay create new access token, refresh token & send to user
    const newAccessToken = jwtM.generateAccessToken(result)
    const newRefreshToken = jwtM.generateRefreshToken(result)

    // push it to the array
    refreshTokens.push(newRefreshToken)

    //store the token in the tokens table
    jwtM.storeAcessToken(newAccessToken, result.userid)
    res.json({
      Auth: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      message: 'Your token is Refreshed now & good to go',
    })
  })
}
