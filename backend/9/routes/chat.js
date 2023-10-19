const path = require('path')

const express = require('express')

const router = express.Router()

const chatController = require('../controllers/chat.js')

router.get('/',chatController.getHome)

module.exports = router