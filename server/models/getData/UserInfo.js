// db importing
const db = require('../../config')

// GET user Info
exports.userInfo = (req, res) => {
  // user login data from the request body
  const userid = req.headers.userid || req.body.userid
  if (req.user.userid === userid) {
    const sql = 'SELECT * FROM users WHERE userid = ?'
    db.start.query(sql, [userid], (err, result) => {
      if (err) {
        console.log(err)
        res.send({
          Auth: false,
          message: 'db faild to get user info',
          err: err,
        })
      } else {
        res.send({
          Auth: true,
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          username: result[0].username,
          email: result[0].email,
          phone: result[0].phone,
          message: 'user info retrived successfully',
        })
        console.log(result)
      }
    })
  } else {
    res.send({ Auth: false, message: 'auth faild to get user info' })
  }
}
