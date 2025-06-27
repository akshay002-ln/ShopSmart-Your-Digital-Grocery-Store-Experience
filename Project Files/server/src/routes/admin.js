const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const isAdmin = require('../middleware/isAdmin'); // ✅ Use correct relative path

// ✅ Protect this route: Get all users (Admin only)
router.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await models.Users.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err });
    }
});

// ✅ Protect this route: Get all orders (Admin only)
router.get('/orders', isAdmin, async (req, res) => {
    try {
        const orders = await models.Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err });
    }
});

// ✅ Protect this route: Delete user (Admin only)
router.delete('/users/:id', isAdmin, async (req, res) => {
    try {
        await models.Users.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err });
    }
});

module.exports = router;
