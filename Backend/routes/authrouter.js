// routes/auth.js (usually in a routes directory)
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const fetchuser = require('../middleware/fetchuser');

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], authController.createUser);

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], authController.loginUser);

router.post('/getuser', fetchuser, authController.getUser);


module.exports = router;
