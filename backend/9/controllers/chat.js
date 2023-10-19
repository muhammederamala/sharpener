const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const path = require('path');
const User = require('../models/user')

exports.getHome = (req,res,next) =>{
    const filePath = path.join(__dirname, '../public/chat/home.html');
    res.sendFile(filePath)
}
