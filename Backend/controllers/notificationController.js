const User = require('../models/User');

// Get notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('notifications');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Add a notification for a user
exports.addNotification = async (req, res) => {
  const { userId } = req.params;
  const { type, message } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.notifications.push({ type, message });
    await user.save();

    res.status(201).json({ message: 'Notification added' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  const { userId, notificationId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notification = user.notifications.id(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await user.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  const { userId, notificationId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notificationIndex = user.notifications.findIndex(notification => notification.id === notificationId);
    if (notificationIndex === -1) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    user.notifications.splice(notificationIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};
