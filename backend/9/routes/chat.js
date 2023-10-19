const path = require('path')

const express = require('express')

const router = express.Router()

const chatController = require('../controllers/chat.js')
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

router.get('/',chatController.getHome)

router.post('/send-message',authenticationMiddleware,chatController.postSendMessage)

router.get('/get-all-messages',authenticationMiddleware,chatController.getAllMessage)

module.exports = router