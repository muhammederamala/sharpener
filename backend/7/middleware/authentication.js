// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
    const user = await User.findByPk(decoded.userId); // Replace with the method to find a user by ID
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
