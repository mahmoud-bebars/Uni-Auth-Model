// DB importing
const db = require('../../config')
const arr = require('./arraies')

// POST Register email verfiy
exports.otpVerfiy = (req, res) => {
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
    if (arr.sendedOtps.includes(verifyOtp)) {
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
