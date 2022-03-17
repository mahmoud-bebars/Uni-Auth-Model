/* this file will contain the functions to edit the user info
 userinfo:-
  - profile name
  - job
  - bio
*/

/* Add & edit user socials 
 main socials:-
  - facebook
  - instagram
  - twitter
  - linkedin

 specialized socials:-
  - behance
  - pintrest
  - dribble
  - github
  - youtube
  - discord
  - salck
*/

/* 
add,remove, hide user links
link structure:-
- link id
- userid
- link url
- link name
- hide (boolen)
*/

// iporting all required packages for the functions use
// db model importing
const db = require('../../config')
// importing nani id func
const { Id } = require('../utilities/nanoId')

// first time sginup profile update
exports.createUserInfoRow = (userid) => {
  const sql = 'INSERT INTO userInfo SET ?'
  db.start.query(sql, { userid: userid }, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log('user Info row created')
    }
  })
}

exports.updateInfo = (req, res) => {
  const userid = req.user.userid
  const info = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    job: req.body.job,
    bio: req.body.bio,
    country: req.body.country,
    city: req.body.city,
  }
  if (userid === req.headers.userid) {
    const infoSql = `UPDATE userInfo SET ? WHERE userid = '${userid}'`
    db.start.query(
      infoSql,
      {
        firstName: info.firstName,
        lastName: info.lastName,
        job: info.job,
        bio: info.bio,
        country: info.country,
        city: info.city,
      },
      (err, result) => {
        if (err) {
          res.json({
            infoUpdated: false,
            message: 'db faild to update the user info',
            error: err,
          })
        } else if (result.affectedRows >= 1) {
          res.json({
            infoUpdated: true,
            message: 'user info updated succefully',
          })
        }
      }
    )
  } else {
    res.json({
      ProfileUpload: false,
      message: 'Auth faild toupdate user info',
      user: req.user,
    })
  }
}
