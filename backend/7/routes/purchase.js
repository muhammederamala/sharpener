const path = require('path');

const express = require('express');

const purchaseController = require('../controllers/purchase');

const authenticationMiddleware = require('../middleware/authentication');

const router = express.Router();

router.get('/premium-membership',authenticationMiddleware,purchaseController.purchasePremium)

router.post('/update-transaction-status',authenticationMiddleware,purchaseController.updateTransactionStatus)

router.get('/check-premium',authenticationMiddleware,purchaseController.checkPremium)

router.get('/show-leaderboard',authenticationMiddleware,purchaseController.showLeaderboard)

module.exports = router