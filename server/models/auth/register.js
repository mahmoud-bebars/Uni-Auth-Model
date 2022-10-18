// DB importing
const db = require('../../config')

// jJWT model import
const jwtM = require('../../utils/jwt')

const jwtStore = require('./jwtStore')

// Mail verfiy import
const verifyMail = require('../../utils/verifyMail')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

// hashing & uniqe id packages importing
const { Id } = require('../../utils/nanoId')
const bcrypt = require('bcrypt')

const arr = require('./arraies')
const otpG = require('../../utils/otpGerenrate')

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
  // Generate Random userid
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
              arr.refreshTokens.push(refreshToken)
              //store the token in the tokens table
              jwtStore.storeAcessToken(accessToken, userid)

              // create verfication code (otp)
              const otp = otpG.generateOTP()
              console.log(otp)
              arr.sendedOtps.push(otp)
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
