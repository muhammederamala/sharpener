const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    id: String,
    isActive: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;


// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Password = sequelize.define('password',{
//     id:{
//         type : Sequelize.STRING,
//         allowNull : false,
//         primaryKey : true
//     },
//     isActive:{
//         type: Sequelize.BOOLEAN,
//     }
// })

// module.exports = Password