const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const token = req.body.userId
        const decodedData = decodeJwtToken(token);
        const userId = decodedData.userId
        await Expense.create({
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category,
            userId: userId
        })

        // Calculate the total expense for the user
        const totalExpenses = await Expense.sum('amount', {
            where: {
                userId: userId,
            },
        });

        // Update the User model with the calculated totalExpense
        await User.update(
            { totalExpense: totalExpenses },
            {
                where: {
                    id: userId,
                },
            }
        );

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
        res.json({redirectTo:"/"})
    }
}

exports.loadExpense = async (req,res,next) =>{
    try{
        const userId = req.query.userId;
        const expenses = await Expense.findAll({
            where:{
                userId : userId
            }
        })
        res.json({redirectTo:`/?userId=${req.body.userId}`,expenses:expenses})
    }
    catch(err){
        console.log(err)
    }
}

exports.deleteExpense = async (req,res,next) =>{
    try{
        const expenseId = req.query.expenseId
        const response = await Expense.destroy({
            where:{
                id: expenseId
            }
        })
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
