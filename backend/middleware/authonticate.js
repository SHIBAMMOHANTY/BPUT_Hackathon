const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to authenticate user
// exports.authenticateUser = async (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: 'Authentication failed. Token missing.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return res.status(401).json({ message: 'Authentication failed. User not found.' });
//         }

//         req.user = user; 
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Authentication failed. Invalid token.', error: error.message });
//     }
// };

// Middleware to check user role
exports.checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};
