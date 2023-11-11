const path = require('path');
require('dotenv').config();
const fs = require('fs');
const https = require('https');

const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan')

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

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert')

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'), 
{flags: 'a'}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(morgan('combined',{stream : accessLogStream}));

app.use(express.static('public'));

app.use('/user',userRoutes)
app.use('/purchase',purchaseRoutes)
app.use('/report',reportRoutes)
app.use('/',expenseRoutes)

// User.hasMany(Expense);
// Expense.belongsTo(User);
// User.hasMany(Order);
// Order.belongsTo(User)
// User.hasMany(Password)
// Password.belongsTo(User)
// User.hasMany(File)
// File.belongsTo(User)

mongoose.connect('mongodb+srv://muhammederamala15:x3T7RwT73T2fRH6d@expensetracker.jctm3pa.mongodb.net/?retryWrites=true&w=majority')
.then(result =>{
  // User.findOne().then(user=>{
  //   req.user = user
  // })
  app.listen(3000)
})
.catch(err=>{
  console.log(err)
})