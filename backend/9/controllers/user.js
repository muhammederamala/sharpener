const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const path = require('path');
const User = require('../models/user')

function decodeToken(token, secret) {
    try {
      const decoded = jwt.verify(token, secret);
      const groupId = decoded.GroupId;
      return true;
    } catch (error) {
      // Handle invalid tokens or other errors here
      return false;
    }
}

exports.getWelcome = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/user/welcome.html');
    res.sendFile(filePath)
}

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
            return res.status(409).json({msg:"User with this email already exists"})
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

exports.postLogin = async (req,res,next) =>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({
            where:{
                email:email
            }
        })

        if(!user){
            return res.status(404).json({message:"User Not Found!"})
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(passwordMatch){
            const token = jwt.sign({userId:user.id},process.env.TOKEN_SECRET_KEY,{
                expiresIn:'20h',
            });
            res.status(200).json({
                message: "Succesfully logged in !",
                token: token
            });
        }
        else{
            res.status(401).json({message: "Incorrect Login Credentials"})
        }
    }
    catch(error){
        res.status(500)({message:"Internal server error"})
    }
}

// this route exists inside the welcome routes
exports.checkLogin = async (req,res,next) =>{
    try{
        const {token} = req.body
        const status = decodeToken(token,process.env.TOKEN_SECRET_KEY)
        if(status === true){
            res.status(200).json({message:"Logged In Successfully"});
        }
        else{
            res.status(401).json({message:"User not logged in!"})
        }
    }
    catch(err){
        res.status(500).json({message:"Internal server error",err:err})
    }
}