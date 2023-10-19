const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const path = require('path');
const User = require('../models/user')

exports.getSignup = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/user/signup.html');
    res.sendFile(filePath)
}

exports.postSignup = async (req,res,next) =>{
    try{
        const {name,email,password,phone} = req.body

        const user = await User.findOne({
            where:{
                email:email
            }
        })

        if(user){
            return res.status(409).json({msg:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone
        })
        res.status(201).json({message:"User created Succesfully"})

    }
    catch(err){
        res.status(500).json({ message: 'Error Creating Account' });
    }
}

exports.getLogin = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/user/login.html');
    res.sendFile(filePath)
}