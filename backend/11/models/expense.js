const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a reference to the User model
    },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;


// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Expense = sequelize.define('expense',{
//     id:{
//         type : Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     amount:{
//         type:Sequelize.FLOAT,
//         allowNull:false
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports = Expense