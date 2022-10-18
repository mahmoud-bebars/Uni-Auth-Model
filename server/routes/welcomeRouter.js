// importing express & declaring the router
const express = require('express')
const router = express.Router()

// Welcome backend server screen Route
router.get('/welcome', (req, res) => {
  res.render('index', {
    title: 'The Universal Nodejs Auth system',
    apiVersion: '1st Version (v1)',
  })
})

// exporting the routers
module.exports = router
