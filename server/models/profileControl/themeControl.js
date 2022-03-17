/* 
edit the theme view for the user web page
parameters for edit :-
 - brandColor
 -subColor
 - cover
 - font style (later)
 - button style (later)
 
*/

// iporting all required packages for the functions use
// db model importing
const db = require('../../config')
// importing nani id func
const { Id } = require('../utilities/nanoId')

// first time sginup profile update
exports.createUserThemeRow = (userid) => {
  const sql = 'INSERT INTO userThemes SET ?'
  db.start.query(
    sql,
    {
      userid: userid,
      brandColor: '#D9D9D9',
      subColor: '#6F7072',
      cover: '/public/Defaults/cover-Default.png',
    },
    (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log('user Info row created')
      }
    }
  )
}

// first time sginup profile update
exports.editUserTheme = (req, res) => {
  const userid = req.headers.userid
  const theme = {
    brandColor: req.body.brandColor,
    subColor: req.body.subColor,
  }

  if (userid === req.headers.userid) {
    const sql = `UPDATE userThemes SET ? WHERE userid = '${userid}'`
    db.start.query(
      sql,
      {
        brandColor: theme.brandColor,
        subColor: theme.subColor,
      },
      (err, result) => {
        if (err) {
          res.json({
            themeUpdated: false,
            message: 'db faild to update the user theme',
            error: err,
          })
        } else if (result.affectedRows >= 1) {
          res.json({
            themeUpdated: true,
            message: 'user theme updated succefully',
          })
        }
      }
    )
  } else {
    res.json({
      themeUpdated: false,
      message: 'Auth faild to update user theme',
      user: req.user,
    })
  }
}

exports.addUserCover = (req, res) => {
  const userid = req.user.userid
  const form = new formidable.IncomingForm()
  if (userid === req.headers.userid) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err)
      } else {
        const oldpath = files.cover.filepath
        const newPath = './public/assets/user-avatars/cover-' + userid + '.jpg'

        fs.rename(oldpath, newPath, function (err) {
          if (err) {
            res.json({
              avatarChanged: false,
              message: 'user cover did not changed',
              error: err,
            })
          } else {
            const updateSql = `UPDATE userThemes SET cover = '${newPath}' WHERE userid = '${userid}' `
            db.start.query(updateSql, (error, results) => {
              if (error) {
                res.json({
                  avatarChanged: false,
                  message: 'db faild to record user cover upload action',
                })
              }
              res.json({
                avatarChanged: true,
                message: 'user cover uploaded sucessfully',
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
      message: 'Auth faild to update user cover',
      user: req.user,
    })
  }
}
