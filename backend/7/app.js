const path = require('path')
require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/signup');
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/user',userRoutes)
app.use('/purchase',purchaseRoutes)
app.use('/',expenseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User)

sequelize.sync()
.then(() =>{
    app.listen(3000)
})