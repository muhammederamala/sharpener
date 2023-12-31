const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Message = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file: {
        type: Sequelize.STRING, 
        allowNull: true
    }
});

module.exports = Message;
