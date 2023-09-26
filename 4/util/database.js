const Sequelize = require('sequelize')

const sequelize = new Sequelize('expense','root','Lordvoldemort@10',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;