const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

// Route to send a new message
router.post('/send', fetchuser, sendMessage);

// Route to get all messages for a community
router.get('/:communityId', getMessages);

module.exports = router;
