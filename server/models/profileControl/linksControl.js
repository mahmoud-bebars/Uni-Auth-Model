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

exports.addLink = (req, res) => {
  const linkid = Id()
  const userid = req.headers.userid
  const link = {
    name: req.body.name,
    url: req.body.url,
  }

  if (userid === req.headers.userid) {
    const linkSql = 'INSERT INTO userLinks SET ?'
    db.start.query(
      linkSql,
      { userid: userid, link: link.url, linkName: link.name, linkid: linkid },
      (err, result) => {
        if (err) {
          res.json({
            linkAdded: false,
            message: 'db faild to add new link to user list',
            err: err,
          })
        } else if (result.affectedRows >= 1) {
          res.json({
            linkAdded: true,
            message: 'new link add successfully to user list',
          })
        }
      }
    )
  } else {
    res.json({
      linkAdded: false,
      message: 'Auth faild to add new link to user list',
      user: req.user,
    })
  }
}

exports.updateLink = (req, res) => {
  const userid = req.headers.userid
  const link = {
    id: req.body.id,
    name: req.body.name,
    url: req.body.url,
  }

  if (userid === req.headers.userid) {
    const linkSql = `UPDATE userLinks SET ? WHERE linkid = '${link.id}'`
    db.start.query(
      linkSql,
      { link: link.url, LinkName: link.name },
      (err, result) => {
        if (err) {
          res.json({
            linkUpdated: false,
            message:
              'db faild to link with id: ' +
              link.id +
              'updated succefully for user with id:' +
              userid,
            err: err,
          })
        } else if (result.affectedRows >= 1) {
          res.json({
            linkUpdated: true,
            message:
              'the link with id: ' +
              link.id +
              'updated succefully for user with id:' +
              userid,
          })
        }
      }
    )
  } else {
    res.json({
      linkUpdated: false,
      message: 'Auth faild to update link for user with id: ' + userid,
      user: req.user,
    })
  }
}

exports.linkView = (req, res) => {
  const userid = req.headers.userid
  const linkid = req.body.linkid

  if (userid === req.headers.userid) {
    const checkSql = `SELECT * from userLinks WHERE linkid = ?`
    db.start.query(checkSql, [linkid], (error, results) => {
      if (error) {
        res.json({
          linkFounded: false,
          message: 'db faild to check for the link',
          error: error,
        })
      } else if (results.length >= 1) {
        const hidden = results[0].hidden
        if (hidden === 0) {
          const hideSql = 'UPDATE userLinks SET hidden = 1 WHERE linkid = ?'
          db.start.query(hideSql, [linkid], (error, results) => {
            if (error) {
              res.json({
                changeStatus: false,
                message: 'db faild to change link show status',
                error: error,
              })
            } else if (results.changedRows === 1) {
              res.json({
                changeStatus: true,
                message: 'link show status changed, the card now is showed',
              })
            }
          })
        } else if (hidden === 1) {
          const showSql = 'UPDATE userLinks SET hidden = 0 WHERE linkid = ?'
          db.start.query(showSql, [linkid], (error, results) => {
            if (error) {
              res.json({
                changeStatus: false,
                message: 'db faild to change card link show status',
                error: error,
              })
            } else if (results.changedRows === 1) {
              res.json({
                changeStatus: true,
                message: 'card show status changed, the card now is hidden',
              })
            }
          })
        }
      }
    })
  } else {
    res.json({
      linkUpdated: false,
      message: 'Auth faild to show/hide link with id:' + linkid,
      user: req.user,
    })
  }
}
