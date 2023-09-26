const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/user')
const sequelize = require('./util/database')

const app = express()

app.set('view engine', 'ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

sequelize.sync().then(result => {
    console.log("Successful")
})
.catch(err =>{
    console.log(err)
})

app.listen(3000);