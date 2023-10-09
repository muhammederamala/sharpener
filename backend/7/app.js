const path = require('path')
require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/signup');
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const reportRoutes = require('./routes/report')
const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const Password = require('./models/password');
const File = require('./models/files')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/user',userRoutes)
app.use('/purchase',purchaseRoutes)
app.use('/report',reportRoutes)
app.use('/',expenseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User)
User.hasMany(Password)
Password.belongsTo(User)
User.hasMany(File)
File.belongsTo(User)

sequelize.sync()
.then(() =>{
    app.listen(3000)
})