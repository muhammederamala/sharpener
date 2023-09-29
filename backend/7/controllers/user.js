const path = require('path');

exports.getSignup = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/user/signup.html');
    res.sendFile(filePath)
}