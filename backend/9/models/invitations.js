const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Invitations = sequelize.define('invitations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: Sequelize.ENUM('pending', 'accepted', 'declined'),
        allowNull: false,
        defaultValue: 'pending',
    },
},
);

module.exports = Invitations;
