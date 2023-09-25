const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user')

router.get('/',userController.getHome);

router.get('/add-user',userController.getAddUser);

router.post('/user/add-user',userController.postAddUser);

router.post('/user/delete',userController.deleteUser);

router.get('/user/edit/:userId',userController.getEditUser);

router.post('/user/post-edit-user',userController.postEditUser);

module.exports = router