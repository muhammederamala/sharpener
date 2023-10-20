const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const Sequelize = require("sequelize");

const path = require('path');
const User = require('../models/user')
const Message = require('../models/message');

exports.getHome = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/chat/home.html');
    res.sendFile(filePath)
}

exports.postSendMessage = async (req,res,next) =>{
    try{
        const { message } = req.body;
        const userId = req.user.id;

        const user = await User.findOne({
            where:{
                id:userId
            },
            attributes: ['name'],
        });

        const userName = user.name;

        const newMessage = await Message.create({
            name:userName,
            message:message,
            userId:userId
        });
        return res.status(201).json(newMessage)
    }
    catch(err){
        return res.status(500).json({Error:"Failed to send the message"});
    }
}

exports.getAllMessage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const lastMessageId = req.query.lastMessageId; // Get the last message ID from the query parameter

        // Find messages with IDs greater than the lastMessageId
        let messages = await Message.findAll({
            where: {
                id: { [Sequelize.Op.gt]: lastMessageId }
            }
        });

        // Map the messages to create a new array with sender information
        const messagesWithSender = messages.map((message) => {
            const senderName = message.userId === userId ? "You" : message.name;
            return {
                text: message.message,
                sender: senderName,
            };
        });

        res.json({ messages: messagesWithSender });
    } catch (err) {
        console.log(err);
    }
};


