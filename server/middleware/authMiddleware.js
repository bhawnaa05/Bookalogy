const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  console.log("Incoming Headers:", req.headers); // Log all incoming headers
  console.log("Received token:", token);  // Log the received token

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);  // Log the decoded token

    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error("JWT Error:", error);  // Log the error for debugging
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = { protect };
