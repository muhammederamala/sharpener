const path = require('path');
const brevo = require('@getbrevo/brevo');
var SibApiV3Sdk = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const { v4: uuidv4 } = require('uuid');

const Password = require('../models/password')
const User = require('../models/user')

const dotenv = require('dotenv'); 
dotenv.config(); 

exports.getPasswordForm = async (req,res,next) =>{
    try{
        const filePath = path.join(__dirname, '../public/user/resetPassword.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}


exports.sendEmail = async (req, res) => {
    try {

        const passwordId = uuidv4();

        var defaultClient = brevo.ApiClient.instance;

        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDINBLUE_API_KEY ;

        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();
        
        const email = req.body.email;
        const baseUrl = req.body.baseURL

        const resetURL = `${baseUrl}/user/password/reset-password/?passwordId=${passwordId}`;

        sendSmtpEmail.subject = "password reset";
        sendSmtpEmail.htmlContent = `<html><body><h1>Click the link below to reset your password:</h1><a href="${resetURL}">${resetURL}</a></body></html>`;
        sendSmtpEmail.sender = { "name": "John", "email": "muhammederamala15@gmail.com" };
        sendSmtpEmail.to = [
        { "email": email, "name": "sample-name" }
        ];
        sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
        sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };

        const user = await User.findOne({email: email})
        await Password.create({
            id : passwordId,
            userId: user.id,
        })

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function (error) {
        console.error(error);
        });

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'An error occurred while sending the password reset email' });
    }
};


exports.getResetPassword = async (req,res,next) =>{
    try{
        const id = req.query.passwordId;
        
        const response = await Password.findOne({id:id})

        if(response && response.isActive !== false){
            await Password.findOneAndUpdate({id:id},{ isActive:true })
        }
        const filePath = path.join(__dirname, '../public/user/newPassword.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}

exports.postResetPassword = async (req,res,next) =>{
    try{
        const password = req.body.password
        console.log(req.body)
        const passwordId = req.params.id
        console.log(passwordId)
        const user = await Password.findOne({id:passwordId})

        const userId = new mongoose.Types.ObjectId(user.userId)
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(userId,{password:hashedPassword})
        await Password.findOneAndUpdate({id:passwordId},{isActive:false})

        const filePath = path.join(__dirname, '../public/user/login.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}