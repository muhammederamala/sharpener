const Sequelize = require('sequelize')

const sequelize = new Sequelize('expenseAWS','root','Lordvoldemort@10',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize