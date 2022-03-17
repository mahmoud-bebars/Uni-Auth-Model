/* this file will contain the functions used to add or edit the user avatar */

// iporting all required packages for the functions use
// db model importing
const db = require('../../config')
// import file system & path models from node
var fs = require('fs')
// import formidable file handler package & middleware func
const formidable = require('formidable')

// first time sginup avatar update
exports.createprofileAvatar = (userid) => {
  const sql = 'INSERT INTO userAvatars SET ?'
  db.start.query(sql, { userid: userid }, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log('profile row created')
    }
  })
}

// get user profile avatar
exports.getUserAvatar = (req, res) => {
  const userid = req.headers.userid
  if (req.user.userid === req.headers.userid) {
    const sql = 'SELECT profilePath from userAvatars where userid = ?'
    db.start.query(sql, [userid], (err, results) => {
      if (err) {
        res.json({
          profile: false,
          error: err,
        })
        console.log(err)
      } else {
        const profile = results[0].profilePath
        res.json({
          profile: true,
          imageUrl: profile,
        })
      }
    })
  }
}

// update profile avatar
exports.addUserAvatar = (req, res) => {
  const userid = req.user.userid
  const form = new formidable.IncomingForm()
  if (userid === req.headers.userid) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err)
      } else {
        const oldpath = files.avatar.filepath
        const newPath = './public/assets/user-avatars/avatar-' + userid + '.jpg'

        fs.rename(oldpath, newPath, function (err) {
          if (err) {
            res.json({
              avatarChanged: false,
              message: 'user avatar did not changed',
              error: err,
            })
          } else {
            const updateSql = `UPDATE userAvatars SET path = '${newPath}' WHERE userid = '${userid}' `
            db.start.query(updateSql, (error, results) => {
              if (error) {
                res.json({
                  avatarChanged: false,
                  message: 'db faild to record user avatar upload action',
                })
              }
              res.json({
                avatarChanged: true,
                message: 'avatar uploaded sucessfully',
                fileName: newPath,
              })
            })
          }
        })
      }
    })
  } else {
    res.json({
      avatarChanged: false,
      message: 'Auth faild to change user avatar',
      user: req.user,
    })
  }
}
