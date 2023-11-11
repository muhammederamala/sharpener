const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const path = require('path');
const User = require('../models/user')
const Expense = require('../models/expense');


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
        // const t = await sequelize.transaction()
        const token = req.body.userId
        const decodedData = decodeJwtToken(token);
        const userId = decodedData.userId
        const expense = new Expense({
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category,
            userId: userId
        },
        // {transaction : t}
        )

        expense.save()
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        console.log("this is the objext id",userIdObjectId)
        const totalExpenses = await Expense.aggregate([
            {
                $match: {
                    userId: userIdObjectId, // Convert userId to ObjectId
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                },
            },
        ]);
        console.log("This is the total expense",totalExpenses[0].total)
        // Calculate the total expense for the user
        // const totalExpenses = await Expense.sum('amount', {
        //     where: {
        //         userId: userId,
        //     },
        //     // transaction :t,
        // });

        // Update the User model with the calculated totalExpense

        await User.updateOne({_id: userId},
            {$set:{ totalExpense: totalExpenses[0].total }},
        );

        // await t.commit();

        const expenses = await Expense.find({ userId: userIdObjectId })
        console.log(expenses)

        res.status(200).json({redirectTo:`/?userId=${req.body.userId}`,expenses:expenses})
    }
    catch(err){
        console.log(err)
        // await t.rollback();
        res.json({redirectTo:"/"})
    }
}

exports.loadExpense = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        const page = req.query.page || 1;
        const pageSizeData = parseInt(req.query.pageSize);
        const pageSize = pageSizeData || 5;

        const skip = (page - 1) * pageSize;

        // Query expenses using Mongoose
        const expenses = await Expense.find({ userId: userIdObjectId })
            .skip(skip)
            .limit(pageSize);

        const totalExpensesCount = await Expense.countDocuments({ userId: userIdObjectId });

        const totalPages = Math.ceil(totalExpensesCount / pageSize);

        res.json({
            redirectTo: `/?userId=${req.query.userId}&page=${page}`,
            expenses: expenses,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error loading expenses' });
    }
};

exports.deleteExpense = async (req,res,next) =>{
    try{
        const expenseId = req.query.expenseId
        const deletedExpense = await Expense.findById(expenseId);
        const amount = deletedExpense.amount;
       
        const response = await Expense.findOneAndDelete({_id: expenseId})

        const userId = deletedExpense.userId;
        await User.findOneAndUpdate(
            {id: userId},
            { $inc: { totalExpense: -amount } },
            { new: true }
        )

        res.status(200)
    }
    catch(err){
        console.log(err)
    }
}

function decodeJwtToken(token) {
    try {
        const decodedToken = jwt.verify(token,  process.env.TOKEN_SECRET); 
        return decodedToken;
    } catch (err) {
        // Handle token verification error, e.g., if the token is invalid or expired
        console.error('Error decoding token:', err);
        return null;
    }
}
