// importing express & declaring the router
const express = require('express')
const router = express.Router()

// modals importing
const authController = require('../models/auth')
const PassController = require('../models/passwordControl')
const userController = require('../models/UserInfo')
const jwtM = require('../models/jwt')

// Welcome backend server screen Route
router.get('/', (req, res) => {
  res.render('index', { title: 'The Universal Nodejs Auth system' })
})

// Account Resgistering Routes
router.post('/Login', authController.login)
router.post('/SginUp', authController.sginup)
router.post('/Logout', jwtM.verifyJWT, authController.logout)

// Account Auth Routes
router.post('/Refresh', authController.refresh) // not used in frontend (for testing only)
router.get('/Auth', jwtM.verifyJWT, authController.auth)
router.post('/MailVerfiy', jwtM.verifyJWT, authController.mailVerfiy)

// Reset password route
router.post('/ResetPass', PassController.resetPasswordMail)

// Change password route
router.put('/UpdatePass', jwtM.verifyJWT, PassController.changePass)

// get user info to show it on user's dashboard
router.get('/UserInfo', jwtM.verifyJWT, userController.userInfo)

// exporting the routers
module.exports = router
