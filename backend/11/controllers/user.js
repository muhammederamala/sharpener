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
        const {name,email,password} = req.body

        const user = await User.findOne({ where: { email:email } });
        if (user) {
          return res.status(401).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            email: email,
            password: hashedPassword 
        })
        res.status(201).json({ message: 'Account Created Successfully' });
    }
    catch(err){
        res.status(500).json({ message: 'Error Creating Account' });
    }
}

exports.getLogin = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/user/login.html');
    res.sendFile(filePath)
}


exports.postSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(401).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: 'Account Created Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error Creating Account' });
    }
};

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                expiresIn: '20h',
            });

            res.status(200).json({
                message: 'Successfully logged in!',
                redirectTo: `/?userId=${user._id}&page=1`,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Incorrect Login Credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error during login' });
    }
};