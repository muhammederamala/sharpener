const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/',expenseController.getHome)

router.get('/add-expense',expenseController.getAddExpense)

router.post('/add-expense',expenseController.postAddExpense)

router.get('/load-expense',expenseController.loadExpense)

router.delete('/delete-expense',expenseController.deleteExpense)


module.exports = router