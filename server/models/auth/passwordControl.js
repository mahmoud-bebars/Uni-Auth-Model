// db importing
const db = require('../../config')

// node mailer package importing
const nodeMailer = require('nodemailer')
// password generator package importing
const generatePassword = require('password-generator')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

// hashing & uniqe id packages importing
const bcrypt = require('bcrypt')

const sendPassMail = (mailOptions) => {
  const mailServer = {
    service: env.MAIL_SERVER,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    },
  }

  const transport = nodeMailer.createTransport(mailServer)

  transport.sendMail(mailOptions, (res, err) => {
    if (err) {
      console.log('something is wrong but check the mail first')
    } else {
      console.log('password reseted successfully')
    }
  })
}

// UPDATE user Password with a random one when request to reset password
exports.resetPasswordMail = (req, res) => {
  // user email to send the generated password for him & update the user data with his random password
  const email = req.body.email
  // check if the email exist in the db
  const sql = 'SELECT * FROM users WHERE email = ? '
  db.start.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err)
      res.send({ err: err })
    }
    if (result.length > 0) {
      // generate secure password for the user to be sent
      const NewPass = generatePassword()
      // create mailOptions to be sent to user
      const mailOptions = {
        from: 'info@react.org',
        to: email,
        subject: 'React Password reset Verfication',
        html: `<h1>We have reset your passsword</h1> <h5>enter this new one to log in  & please change it before logging out Again
                </h5><h5>${NewPass}</h5><p>thank you for trusting us</p>`,
      }
      // hashing the generated password
      bcrypt.hash(NewPass, 10, (err, hash) => {
        // update password in the users db
        const sql = 'UPDATE users SET password = ? WHERE email = ?'
        db.start.query(sql, [hash, email], (err, result) => {
          if (err) {
            console.log(err)
            res.json({ err: err })
          } else {
            // send mail to the user containing the new password & send response to the front end
            sendPassMail(mailOptions)
            res.json({
              reset: true,
              message:
                'We have send you a secured password log with it and then change it with one you remmeber it',
            })
          }
        })
      })
    } else {
      res.send({ reset: false, message: "User Doesn't exisit" })
    }
  })
}

// UPDATE user Password by himself
exports.changePass = (req, res) => {
  // userid from req.user gotted from the verfiyJWT
  const userid = req.user.userid
  // old & new password from the body
  const { oldPassword, newPassword, confirmNewPassword } = req.body

  // verify user is existed
  const sql = 'SELECT * FROM users WHERE userid = ? '
  db.start.query(sql, [userid], (err, result) => {
    if (err) {
      console.log(err)
      res.send({ err: err })
    }

    if (result.length > 0) {
      // verify password is matched with hashed password
      bcrypt.compare(oldPassword, result[0].password, (err, response) => {
        if (response) {
          if (newPassword !== confirmNewPassword) {
            res.send({
              changePass: false,
              message: 'New Passwords do not match',
            })
          } else {
            // hashing new password to be inserted in the user db
            bcrypt.hash(newPassword, 10, (err, hash) => {
              const sql = 'UPDATE users SET password = ? WHERE userid = ?'
              db.start.query(sql, [hash, userid], (err, result) => {
                if (err) {
                  console.log(err)
                  res.json({ err: err })
                } else {
                  res.json({
                    changePass: true,
                    message: 'Your password has been changed successfully',
                  })
                }
              })
            })
          }
        } else {
          res.send({
            changePass: false,
            err: err,
            message: 'Old password is wrong, please try Again!',
          })
        }
      })
    } else {
      res.send({
        changePass: false,
        message: 'Something Went wrong, please try again',
      })
    }
  })
}
