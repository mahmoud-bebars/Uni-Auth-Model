// importing express & declaring the router
const express = require('express')
const router = express.Router()

// modals importing
const userController = require('../models/getData/UserInfo')
const jwtM = require('../utils/jwt')

// get user info to show it on user's dashboard
router.get('/UserInfo', jwtM.verifyJWT, userController.userInfo)

// exporting the routers
module.exports = router
