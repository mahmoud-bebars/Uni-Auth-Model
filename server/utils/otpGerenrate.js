// otp generator package importing
const otpGenerator = require('otp-generator')

// otp genration func
exports.generateOTP = () => {
  return otpGenerator.generate(5, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  })
}
