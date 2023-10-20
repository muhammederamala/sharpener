const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const User = require('./user');
const Group = require('./groups');

const GroupMember = sequelize.define('groupMember',{
    GroupMemberId:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    }
});

GroupMember.belongsTo(Group,{foreignKey: "groupId"})
GroupMember.belongsTo(User,{foreignKey:"MemberUserID"})

module.exports = GroupMember