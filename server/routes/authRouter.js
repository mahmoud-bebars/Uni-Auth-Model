// importing express & declaring the router
const express = require('express')
const router = express.Router()

// modals importing
const logController = require('../models/auth/logging')
const sginController = require('../models/auth/register')
const PassController = require('../models/auth/passwordControl')
const refreshController = require('../models/auth/refreshTokens')
const otpController = require('../models/auth/otpVerfiy')
const jwtM = require('../utils/jwt')

// Account Logging Routes
router.post('/Login', logController.login)
router.post('/Logout', jwtM.verifyJWT, logController.logout)

// Account Registering Routes
router.post('/SginUp', sginController.sginup)

router.post('/MailVerfiy', jwtM.verifyJWT, otpController.otpVerfiy)

// Account Auth Routes
router.get('/Verfiy', jwtM.verifyJWT, logController.auth)

// Account Refresh Route
router.post('/Refresh', refreshController.refresh) // not used in frontend (for testing only)

// Reset password route
router.post('/ResetPass', PassController.resetPasswordMail)

// Change password route
router.put('/UpdatePass', jwtM.verifyJWT, PassController.changePass)

// exporting the routers
module.exports = router
