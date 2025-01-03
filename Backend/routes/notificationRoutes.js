const express = require('express');
const router = express.Router();
const { getNotifications, addNotification, markAsRead, deleteNotification } = require('../controllers/notificationController');

// Get notifications for a user
router.get('/:userId', getNotifications);

// Add a notification for a user
router.post('/:userId', addNotification);

// Mark a notification as read
router.put('/:userId/:notificationId/read', markAsRead);

// Delete a notification
router.delete('/:userId/:notificationId', deleteNotification);

module.exports = router;
