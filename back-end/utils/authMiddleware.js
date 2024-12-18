// /backend/utils/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Unauthorized access');

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY'); // Replace with environment variable
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

module.exports = { protect };
