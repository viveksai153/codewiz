const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified:', verified);
    const userId = verified.user.id;  // Adjust this line to match the structure of your JWT payload
    req.user = await User.findById(userId).select('-password');
    if (!req.user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Authenticated user:', req.user);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(400).json({ message: 'Invalid Token' });
  }
};
