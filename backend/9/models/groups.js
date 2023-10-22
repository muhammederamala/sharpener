const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Group = sequelize.define('group',{
    GroupId:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    GroupName:{
        type:Sequelize.STRING(100),
        allowNull : false
    }
});


module.exports = Group