const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Files = sequelize.define('files',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    link:{
        type:Sequelize.STRING
    },
    type:{
        type:Sequelize.STRING
    }
})

module.exports = Files