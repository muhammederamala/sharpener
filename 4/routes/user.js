const path = require('path');
const express = require('express');


const router = express.Router();

const userController = require('../controllers/user')

router.get('/',userController.getHome);

router.post('/add-expense',userController.postAddExpense);

router.post('/delete-expense',userController.postDelete);

router.get('/edit-expense/:expenseId',userController.getEditExpense);

router.post('/post-edit-expense',userController.postEditExpense);

module.exports = router
