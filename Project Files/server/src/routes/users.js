const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models/schema');

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_SECRET_TOKEN = 'admin-secret';
const USER_SECRET_TOKEN = 'user-secret';

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.Users.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Incorrect password');

    const payload = { id: user._id, email: user.email };

    // Admin check
    if (email === ADMIN_EMAIL) {
      const token = jwt.sign(payload, ADMIN_SECRET_TOKEN);
      return res.status(200).json({
        jwtTtoken: token,
        user: { _id: user._id, email: user.email }
      });
    }

    // Normal user
    const token = jwt.sign(payload, USER_SECRET_TOKEN);
    res.status(200).json({
      token,
      user: { _id: user._id, email: user.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
