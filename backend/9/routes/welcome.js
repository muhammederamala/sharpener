const path = require('path')

const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')

router.get('',userController.getWelcome);

router.post('/check-login',userController.checkLogin);

module.exports = router