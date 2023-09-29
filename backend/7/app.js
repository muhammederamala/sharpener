const path = require('path')

const express = require('express')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user/signup');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/user',userRoutes)

sequelize.sync()
.then(() =>{
    app.listen(3000)
})