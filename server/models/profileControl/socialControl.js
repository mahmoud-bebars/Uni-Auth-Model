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
// iporting all required packages for the functions use
// db model importing
const db = require('../../config')
// importing nani id func
const { Id } = require('../utilities/nanoId')

exports.createSocialRow = (userid) => {
  const sql = 'INSERT INTO userSocials SET ?'
  db.start.query(sql, { userid: userid }, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log('user Socials row created')
    }
  })
}

exports.updateSocial = (req, res) => {
  const userid = req.headers.userid
  const social = {
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
    linkedin: req.body.linkedin,
  }

  if (userid === req.headers.userid) {
    const addSql = `UPDATE userSocials SET ? WHERE userid = '${userid}'`
    db.start.query(
      addSql,
      {
        social,
      },
      (err, result) => {
        if (err) {
          res.json({
            socialAdded: false,
            message: 'db faild to add social links to user',
            err: err,
          })
        } else if (result.affectedRows >= 1) {
          res.json({
            socialAdded: true,
            message: 'soical links add successfully to user list',
          })
        }
      }
    )
  } else {
    res.json({
      socialAdded: false,
      message: 'Auth faild to add new link to user list',
      user: req.user,
    })
  }
}
