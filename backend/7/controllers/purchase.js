const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');
const Expense = require('../models/expense');

const sequelize = require('../util/database'); // Import Sequelize and sequelize
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
        // Find all users along with their associated expenses
        const usersWithExpenses = await User.findAll({
            attributes: ['id', 'email'],
          include: [{
            model: Expense,
            as: 'expenses',
            attributes: ['amount'], // Alias for the expenses association if you've defined one
          }],
        });

        const usersWithTotalExpenses = usersWithExpenses.map(user => {
            const totalExpenses = user.expenses.reduce((sum, expense) => sum + expense.amount, 0);
            return {
                id: user.id,
                name: user.name,
                email: user.email, // Include the user email
                totalExpenses,
            };
        });

          usersWithTotalExpenses.sort((a, b) => b.totalExpenses - a.totalExpenses);


        console.log(usersWithExpenses)
        
        // Send the users data along with their expenses as a response
        return res.json(usersWithTotalExpenses);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
