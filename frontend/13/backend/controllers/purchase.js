const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');
const Expense = require('../models/expense');

const sequelize = require('../util/database');
const Sequelize = require('sequelize')

exports.purchasePremium = async (req, res, next) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount = 2500;

        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                console.error(err); // Log the error for debugging
                return res.status(500).json({ message: 'Error creating Razorpay order' });
            }
            try {
                await req.user.createOrder({ orderid: order.id, status: "PENDING" });
                return res.status(201).json({ order, key_id: rzp.key_id });
            } catch (createOrderErr) {
                console.error(createOrderErr); // Log the error for debugging
                return res.status(500).json({ message: 'Error creating order in the database' });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: "Something went wrong!", error: err.message });
    }
};

exports.updateTransactionStatus = async (req, res, next) => {
    try {
        const { order_id, payment_id } = req.body;

        // Update the order status in your database based on order_id
        await Order.update(
            { status: 'SUCCESSFUL' }, // Update the status to 'SUCCESSFUL' or any other status you need
            { where: { orderid: order_id } }
        );

        // Perform any other necessary actions here

        return res.status(200).json({ message: 'Transaction status updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

exports.checkPremium = async (req,res,next) =>{
    try{
        const order = await Order.findOne({where :{
            userId:req.user.id
        }})
        console.log("this is the status",order.status)
        let isPremiumUser = false
        if (order && order.status === 'SUCCESSFUL'){
            isPremiumUser = true
        }
        res.json({isPremiumUser })
    }
    catch(err){
        console.log(err)
    }
}


exports.showLeaderboard = async (req, res, next) => {
    try {
        // Find all users and order them by totalExpense in descending order
        const usersWithTotalExpenses = await User.findAll({
            attributes: ['id', 'name', 'email', 'totalExpense'],
            order: [['totalExpense', 'DESC']],
        });

        console.log(usersWithTotalExpenses);

        // Send the users data along with their total expenses as a response
        return res.json(usersWithTotalExpenses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

