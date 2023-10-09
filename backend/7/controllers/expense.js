const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../util/database')

const path = require('path');
const User = require('../models/user')
const Expense = require('../models/expense');
const { redirect } = require('react-router');


exports.getHome = async (req,res,next) =>{
    try{
        const filePath = path.join(__dirname, '../public/expense/home.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}

exports.getExpenseForm = async (req,res,next) =>{
    try{
        const filePath = path.join(__dirname, '../public/expense/add-expense.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}


exports.postAddExpense = async (req,res,next) =>{
    try{
        const t = await sequelize.transaction()
        const token = req.body.userId
        const decodedData = decodeJwtToken(token);
        const userId = decodedData.userId
        await Expense.create({
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category,
            userId: userId
        },
        {transaction : t}
        )

        // Calculate the total expense for the user
        const totalExpenses = await Expense.sum('amount', {
            where: {
                userId: userId,
            },
            transaction :t,
        });

        // Update the User model with the calculated totalExpense
        await User.update(
            { totalExpense: totalExpenses },
            {
                where: {
                    id: userId,
                },
                transaction :t,
            }
        );

        await t.commit();

        const expenses = await Expense.findAll({
            where:{
                userId: decodedData
            }
        })
        console.log(expenses)

        res.status(200).json({redirectTo:`/?userId=${req.body.userId}`,expenses:expenses})
    }
    catch(err){
        console.log(err)
        await t.rollback();
        res.json({redirectTo:"/"})
    }
}

exports.loadExpense = async (req,res,next) =>{
    try{
        const userId = req.query.userId;
        const page = req.query.page || 1;
        const pagesizedata = parseInt(req.query.pageSize)
        const pageSize = pagesizedata || 5

        const offset = (page - 1) * pageSize;

        const expenses = await Expense.findAll({
            where:{
                userId : userId
            },
            limit: pageSize,
            offset: offset
        })

        const totalExpensesCount = await Expense.count({
            where: {
                userId: userId
            }
        });

        console.log("These are the expenses",expenses)
        const totalPages = Math.ceil(totalExpensesCount / pageSize);

        res.json({
            redirectTo:`/?userId=${req.query.userId}&page=${page}`,
            expenses:expenses,
            currentPage: page,
            totalPages: totalPages
        })
    }
    catch(err){
        console.log(err)
    }
}

exports.deleteExpense = async (req,res,next) =>{
    try{
        const expenseId = req.query.expenseId
        const deletedExpense = await Expense.findByPk(expenseId);
        const amount = deletedExpense.amount;
        
        const response = await Expense.destroy({
            where:{
                id: expenseId
            }
        })

        const userId = deletedExpense.userId;
        await User.decrement('totalExpense', {
            by: amount,
            where: {
                id: userId
            }
        });

        res.status(200)
    }
    catch(err){
        console.log(err)
    }
}

function decodeJwtToken(token) {
    try {
        const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
        return decodedToken;
    } catch (err) {
        // Handle token verification error, e.g., if the token is invalid or expired
        console.error('Error decoding token:', err);
        return null;
    }
}
