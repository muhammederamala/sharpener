// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); 
    const user = await User.findByPk(decoded.userId); 
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
