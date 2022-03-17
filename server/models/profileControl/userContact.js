// iporting all required packages for the functions use
// db model importing
const db = require('../../config')

exports.addContact = (req, res) => {
  const userid = req.headers.userid
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    organization: req.body.organization,
    postionp: req.body.postion,
    area: req.body.area,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
  }
  if (userid === req.headers.userid) {
    const sql = 'INSERT INTO userContact SET ?'
    db.start.query(
      sql,
      {
        userid: userid,
        firstName: contact.firstName,
        lastName: contact.lastName,
        organization: contact.organization,
        postionp: contact.postion,
        area: contact.area,
        streetAddress: contact.streetAddress,
        city: contact.city,
        country: contact.country,
        phone: contact.phone,
        email: contact.email,
      },
      (err, result) => {
        if (err) {
          res.json({
            contactAdded: false,
            message: 'db faild to add user contact',
            err: err,
          })
        } else if (result.affectedRows >= 1) {
          res.json({
            contactAdded: true,
            message: 'user contact add successfully to user list',
          })
        }
      }
    )
  } else {
    res.json({
      contactAdded: false,
      message: 'Auth faild to add user contact to user list',
      user: req.user,
    })
  }
}

exports.updateContact = (req, res) => {
  const userid = req.headers.userid
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    organization: req.body.organization,
    postionp: req.body.postion,
    area: req.body.area,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
  }
  if (userid === req.headers.userid) {
    const sql = `UPDATE userContact SET ? WHERE userid = '${userid}'`
    db.start.query(
      sql,
      {
        firstName: contact.firstName,
        lastName: contact.lastName,
        organization: contact.organization,
        postionp: contact.postion,
        area: contact.area,
        streetAddress: contact.streetAddress,
        city: contact.city,
        country: contact.country,
        phone: contact.phone,
        email: contact.email,
      },
      (err, result) => {
        if (err) {
          res.json({
            contactUpdated: false,
            message: 'db faild to update user contact',
            err: err,
          })
        } else if (result.affectedRows >= 1) {
          res.json({
            contactUpdated: true,
            message: 'user contact updated successfully',
          })
        }
      }
    )
  } else {
    res.json({
      contactUpdated: false,
      message: 'Auth faild to update user contact',
      user: req.user,
    })
  }
}
