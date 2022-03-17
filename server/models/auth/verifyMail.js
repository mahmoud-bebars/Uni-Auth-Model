const nodeMailer = require('nodemailer')
const otpGenerator = require('otp-generator')

// dotenv import
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const env = process.env

exports.generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  })
}

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
