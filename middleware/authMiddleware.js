const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();



// ✅ Verify token and attach full user to req.user
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use .env secret

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// ✅ Role-based access control
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  allowRoles
};
