const bcrypt = require('bcrypt');

const path = require('path');
const User = require('../models/user')
const Expense = require('../models/expense')


exports.getHome = async (req,res,next) =>{
    try{
        const filePath = path.join(__dirname, '../public/expense/home.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}

exports.getAddExpense = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/expense/add-expense.html');
    res.sendFile(filePath)
}

exports.postAddExpense = async (req,res,next) =>{
    try{
        await Expense.create({
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category,
            userId: req.body.userId
        })
        const expenses = await Expense.findAll({
            where:{
                userId: req.body.userId
            }
        })
        console.log(expenses)

        res.json({redirectTo:`/?userId=${req.body.userId}`,expenses:expenses})
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