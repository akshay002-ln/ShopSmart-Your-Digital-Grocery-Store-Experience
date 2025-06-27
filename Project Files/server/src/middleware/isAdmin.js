const jwt = require('jsonwebtoken');
const models = require('../models/schema');

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    const decoded = jwt.verify(token, 'ADMIN_SECRET_TOKEN'); // use your actual secret here
    const user = await models.Users.findById(decoded.userId);

    if (!user || user.email !== 'admin@gmail.com') {
      return res.status(403).json({ message: 'Admins only' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden', error: err.message });
  }
};
