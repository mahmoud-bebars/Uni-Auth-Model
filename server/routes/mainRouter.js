// importing express & declaring the router
const express = require('express')
const router = express.Router()

// modals importing
const authController = require('../models/auth/auth')
const PassController = require('../models/auth/passwordControl')

const avatarController = require('../models/profileControl/avatar')
const linksController = require('../models/profileControl/linksControl')
const infoController = require('../models/profileControl/editInfo')
const socialController = require('../models/profileControl/socialControl')
const contactController = require('../models/profileControl/userContact')
const themeController = require('../models/profileControl/themeControl')

const userViewController = require('../models/userPageApi')

const jwtM = require('../models/auth/jwt')

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
router.get('/me/:username', userViewController.userInfo)

// user data view and edit apis

// theme add and edi apis

// update user avatar route
router.put('/addAvatar', jwtM.verifyJWT, avatarController.addUserAvatar)

// links control routes
router.post('/AddLink', jwtM.verifyJWT, linksController.addLink)
router.put('/UpdateLink', jwtM.verifyJWT, linksController.updateLink)
router.put('/ShowHideLink', jwtM.verifyJWT, linksController.linkView)

// info control routes
router.put('/EditInfo', jwtM.verifyJWT, infoController.updateInfo)

// social control routes
router.put('/EditSocials', jwtM.verifyJWT, socialController.updateSocial)

// contact control routes
router.post('/AddContact', jwtM.verifyJWT, contactController.addContact)
router.put('/EditContact', jwtM.verifyJWT, contactController.updateContact)

// theme control routes
router.put('/EditTheme', jwtM.verifyJWT, themeController.editUserTheme)
router.post('/AddCover', jwtM.verifyJWT, themeController.addUserCover)

// exporting the routers
module.exports = router
