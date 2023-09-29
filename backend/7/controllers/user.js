const path = require('path');
const User = require('../models/user')

exports.getSignup = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/user/signup.html');
    res.sendFile(filePath)
}

exports.postSignup = async (req,res,next) =>{
    try{
        console.log(req.body)
        const {name,email,password} = req.body
        await User.create({
            name: name,
            email: email,
            password: password
        })
        const filePath = path.join(__dirname, '../public/user/home.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}