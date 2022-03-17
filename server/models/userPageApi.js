// db importing
const db = require('../config')

// GET user Info
exports.userInfo = (req, res) => {
  // user login data from the request body
  const username = req.params.username
  const sql = 'SELECT * FROM users WHERE username = ?'
  db.start.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err)
      res.send({
        Auth: false,
        message: 'db faild to get user info',
        err: err,
      })
    } else {
      const userid = result[0].userid
      const user = result[0]

      const avatarSql = 'SELECT * FROM userAvatars WHERE userid = ?'
      db.start.query(avatarSql, [userid], (err, result) => {
        if (err) {
          console.log(err)
          res.send({
            Auth: false,
            message: 'db faild to get user avatar',
            err: err,
          })
        } else {
          const avatar = result[0].path

          const infoSql = 'SELECT * FROM userInfo WHERE userid = ?'
          db.start.query(infoSql, [userid], (err, result) => {
            if (err) {
              console.log(err)
              res.send({
                Auth: false,
                message: 'db faild to get user info',
                err: err,
              })
            } else {
              const info = result[0]

              const socialSql = 'SELECT * FROM userSocials WHERE userid = ?'
              db.start.query(socialSql, [userid], (err, result) => {
                if (err) {
                  console.log(err)
                  res.send({
                    Auth: false,
                    message: 'db faild to get user socials',
                    err: err,
                  })
                } else {
                  const socials = result[0]

                  const themeSql = 'SELECT * FROM userThemes WHERE userid = ?'
                  db.start.query(themeSql, [userid], (err, result) => {
                    if (err) {
                      console.log(err)
                      res.send({
                        Auth: false,
                        message: 'db faild to get user theme',
                        err: err,
                      })
                    } else {
                      const theme = result[0]

                      const LinksSql =
                        'SELECT * FROM userLinks WHERE userid = ?'
                      db.start.query(LinksSql, [userid], (err, result) => {
                        if (err) {
                          console.log(err)
                          res.send({
                            Auth: false,
                            message: 'db faild to get user links',
                            err: err,
                          })
                        } else {
                          const links = result
                          const linkMap = links.map((link) => {
                            const res = {
                              id: link.linkid,
                              name: link.linkName,
                              url: link.link,
                            }
                            return res
                          })
                          res.send({
                            view: true,
                            message: 'user info retrived successfully',
                            login: user.username,
                            node_id: userid,
                            avatar_url: avatar,
                            info: {
                              profileName: user.username,
                              firstName: info.firstName,
                              lastName: info.lastName,
                              job: info.job,
                              bio: info.bio,
                              country: info.country,
                              city: info.city,
                            },
                            pageTheme: {
                              brandColor: theme.brandColor,
                              subColor: theme.subColor,
                              cover: theme.cover,
                            },
                            socails: {
                              facebook: socials.facebook,
                              instagram: socials.instagram,
                              twitter: socials.twitter,
                              linkedin: socials.linkedin,
                            },
                            links: {
                              userid: userid,
                              linksNo: links.length,
                              data: linkMap,
                            },
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

/* 

API Response :-

res = {
  view: true,
  login: 'username'
  node_id: userid Hashed,
  avatar_url: 'string',
  info:{
    profile_name: first + last or use other name,
    job: 'string',
    bio: 'string max 50'
  },
  socails:{
    facebook: 'string',
    instagram: 'string',
    twitter: 'string',
    linkedin:'string',
  },
  links: [
    {linkid:'string',url:'string',name:'string'},
    {linkid:'string',url:'string',name:'string'},
    {linkid:'string',url:'string',name:'string'},
  ]


}


*/
