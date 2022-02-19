// db importing
const db = require('../config')

// jwt model import
const jwtM = require('./jwt')

// jwt decoder package import
const jwtDecode = require('jwt-decode')

// mail verfiy import
const verifyMail = require('./verifyMail')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

// hashing & uniqe id packages importing
const { Id } = require('./nanoId')
const bcrypt = require('bcrypt')

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

// POST user Sgin Up
exports.sginup = (req, res) => {
  // data req.body
  const {
    firstName,
    lastName,
    username,
    email,
    phone,
    password,
    confirmPassword,
  } = req.body
  // generate random userid
  const userid = Id()
  // verify email isn't taken & compare passwords
  const verifyEmailSQl = 'SELECT email FROM users WHERE email = ?'
  db.start.query(verifyEmailSQl, [email], (error, results) => {
    if (error) {
      console.log(error)
    }
    if (results.length > 0) {
      res.send({ Auth: false, message: 'That Email has been taken' })
      console.log('email is taken')
      // compare passwords
    } else if (password !== confirmPassword) {
      res.send({ Auth: false, message: 'Passwords do not match' })
    } else {
      // hashing user password to store in db
      bcrypt.hash(password, 10, (err, hash) => {
        // inserting user register data to db
        const sql = 'INSERT INTO users SET ?'
        db.start.query(
          sql,
          {
            userid,
            firstName,
            lastName,
            username,
            email,
            phone,
            password: hash,
            emailVerfied: false,
          },
          (err, result) => {
            if (err) {
              // A problem happend while storing user's data and user haven't sgin up
              res.send(err)
              console.log(err)
            } else {
              // data stored and starting to create the accessToken to send it in th response
              const result = { userid, username, email }
              // generate asscess Token for the user
              const accessToken = jwtM.generateAccessToken(result)
              const refreshToken = jwtM.generateRefreshToken(result)
              // store refresh token in a temparory array for checking
              refreshTokens.push(refreshToken)
              //store the token in the tokens table
              jwtM.storeAcessToken(accessToken, userid)

              // create verfication code (otp)
              const otp = verifyMail.generateOTP()
              sendedOtps.push(otp)
              // create mailOptions to be sent to user
              const mailOptions = {
                from: 'info@react.org',
                to: email,
                subject: 'React Auth Email Verfication',
                html: `<h1>please verfiy your mail </h1> <h5>enter this otp ${otp} in the verication code feild
                </h5> <p>thanks for your sgining in</p>`,
              }

              // send verfication mail to the user
              verifyMail.mailVerfiy(mailOptions)
              // user has been registered Successfully
              res.json({
                Auth: true,
                username: username,
                userid: userid,
                email: email,
                accessToken,
                refreshToken,
                message:
                  'You have Registered successfully, please verfiy your email',
              })

              console.log('user Registered')
            }
          }
        )
      })
    }
  })
}

let sendedOtps = []

// POST register email verfiy
exports.mailVerfiy = (req, res) => {
  // userid for db sql update query
  if (req.user.userid === req.headers.userid || req.body.userid) {
    // otp for check matching with the sended one to the user email
    const verifyOtp = req.body.otp
    const email = req.user.email

    // check if otp recived from the request body
    if (!verifyOtp) {
      res.json({
        verfiy: false,
        message: 'otp not found please enter the otp',
      })
    }
    // ceheck if the otp exists in the array
    if (sendedOtps.includes(verifyOtp)) {
      const sql = 'UPDATE users SET emailVerfied = true where email = ?'
      db.start.query(sql, [email], (err, result) => {
        if (err) {
          console.log(err)
          res.json({ err: err })
        } else {
          res.json({
            verfiy: true,
            message: 'your email has been verfied enjoy our service',
          })
        }
      })
    } else {
      res.json({
        verfiy: false,
        message: 'the sended otp is invailed... please try again',
      })
    }
  } else {
    res.json({
      verfiy: false,
      message: 'Auth faild to Verfiy your email',
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
          refreshTokens.push(refreshToken)

          //store the token in the tokens table
          jwtM.storeAcessToken(accessToken, user.userid)

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

let refreshTokens = []

// refresh the access token
exports.refresh = (req, res) => {
  // take the refresh token from the request body
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

// POST user logout
exports.logout = (req, res) => {
  // hold the refresh token from either the request body or the headers
  const refreshToken = req.headers.refresh || req.body.refresh
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
  res.send({ auth: false, message: 'You logged out successfully' })
  console.log('user logged out successfully')
}
