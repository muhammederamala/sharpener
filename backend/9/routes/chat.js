const path = require('path')

const express = require('express')

const router = express.Router()

const chatController = require('../controllers/chat.js')
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

router.get('/',chatController.getHome)

router.get('/group-form',chatController.getAddGroup)

router.post('/add-group',authenticationMiddleware,chatController.postAddGroup)

router.get('/group',chatController.getChat)

router.post('/send-message',authenticationMiddleware,chatController.postSendMessage)

router.get('/get-all-messages',authenticationMiddleware,chatController.getAllMessages)

router.get('/get-new-messages',authenticationMiddleware,chatController.getNewMessage)

router.post('/get-all-invites',authenticationMiddleware,chatController.getAllInvites)

router.post('/handle-invitation',authenticationMiddleware,chatController.handleInvitation)

router.get('/get-all-groups',authenticationMiddleware,chatController.getAllGroups)

router.get('/get-all-participants',authenticationMiddleware,chatController.getAllParticipants)

router.post('/add-new-participant',authenticationMiddleware,chatController.addNewParticipant)

router.patch('/make-admin',authenticationMiddleware,chatController.makeAdmin)

router.delete('/delete-member',authenticationMiddleware,chatController.removeMember)

module.exports = router