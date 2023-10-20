const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Group = require('./groups');
const User = require('./user')

const Message = sequelize.define('messages',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name:{
        type:Sequelize.STRING(100),
        allowNull : false
    },
    message : {
        type: Sequelize.STRING,
        allowNull: false
    }
});


Message.belongsTo(Group,{foreignKey: "groupId"})
User.hasMany(Message)
Message.belongsTo(User)

module.exports = Message