const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    link: String,
    type: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Files = mongoose.model('Files', filesSchema);

module.exports = Files;


// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Files = sequelize.define('files',{
//     id:{
//         type : Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
//     link:{
//         type:Sequelize.STRING
//     },
//     type:{
//         type:Sequelize.STRING
//     }
// })

// module.exports = Files