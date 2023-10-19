const path = require('path');
require('dotenv').config();
const cors = require('cors')

const express = require('express')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user')

const User = require('./models/user')

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoutes)
const sequelize = require('./util/database');

sequelize.sync()
.then(() =>{
    app.listen(3000)
})
.catch(err =>{
    console.log(err)
})