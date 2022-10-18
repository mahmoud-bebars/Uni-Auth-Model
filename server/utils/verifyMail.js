const nodeMailer = require('nodemailer')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

exports.mailVerfiy = (mailOptions) => {
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
      // console.log(err)
      console.log('something is wrong but check the mail first')
    } else {
      console.log('message sent')
    }
  })
}
