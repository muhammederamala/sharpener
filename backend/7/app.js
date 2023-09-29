const path = require('path')

const express = require('express')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user/signup')

const app = express();

app.use(express.static('public'));

app.use('/user',userRoutes)

app.listen(3000)