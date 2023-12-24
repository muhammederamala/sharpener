const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  const token = tokenParts[1];
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const user = await User.findOne({
      _id: decoded.userId,
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    
    req.userEmail = user.email; // Add user email to the req object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateJWT;
