const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const passwordController = require('../controllers/password')

const router = express.Router();

router.get('/signup',userController.getSignup);

router.post('/signup',userController.postSignup);

router.get('/login',userController.getLogin)

router.post('/login',userController.postLogin)

router.get('/password/forget-password',passwordController.getPasswordForm)

router.post('/password/forget-password',passwordController.sendEmail)

router.get('/password/reset-password/',passwordController.getResetPassword)

router.post('/password/reset-password/:id',passwordController.postResetPassword)

module.exports = router