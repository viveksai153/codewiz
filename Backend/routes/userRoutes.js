const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all users
router.get('/', auth, admin, UserController.getUsers);

// Remove a user
router.delete('/:id', auth, admin, UserController.removeUser);

// Set user role
router.put('/:id/role', auth, admin, UserController.setRole);

module.exports = router;
