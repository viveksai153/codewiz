const jwt = require('jsonwebtoken');
const User = require('../models/User');

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(data.user.id).select('-password'); // Fetch user without password
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);  // Log the error
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}

module.exports = fetchuser;
