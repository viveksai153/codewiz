// Notifications.js
import React, { useEffect, useState, useCallback } from 'react';
import notificationService from './services/notificationService';
import './notify.css';
import AppBar from './AppBar';

const POLLING_INTERVAL = 30000; // Poll every 30 seconds

const Notifications = ({ userId, token }) => {
    const [notifications, setNotifications] = useState([]);
    const [exitingIds, setExitingIds] = useState([]);

    const fetchNotifications = useCallback(async () => {
        try {
            if (userId && token) {
                const data = await notificationService.getNotifications(userId, token);
                setNotifications(data);
            } else {
                console.error('User ID or Token is missing');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }, [userId, token]);

    useEffect(() => {
        fetchNotifications();

        // Polling mechanism to fetch notifications periodically
        const intervalId = setInterval(fetchNotifications, POLLING_INTERVAL);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [fetchNotifications]);

    const handleMarkAsRead = async (id) => {
        try {
            await notificationService.markAsRead(userId, id, token);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === id ? { ...notification, read: true } : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            setExitingIds((prevExitingIds) => [...prevExitingIds, id]);

            setTimeout(async () => {
                await notificationService.deleteNotification(userId, id, token);
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notification) => notification._id !== id)
                );
                setExitingIds((prevExitingIds) => prevExitingIds.filter((exitingId) => exitingId !== id));
            }, 500);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <>
            <AppBar />
            <div className="notifications-container">
                <h1>Notifications</h1>
                <ul className="notifications-list">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className={`notification-item ${exitingIds.includes(notification._id) ? 'exiting' : ''}`}
                        >
                            <span className="notification-message">{notification.message}</span>
                            <span className={`notification-status ${notification.read ? 'read' : 'unread'}`}>
                                {notification.read ? 'Read' : 'Unread'}
                            </span>
                            <div className="notification-buttons">
                                <button
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    className="notification-button read"
                                    disabled={notification.read}
                                >
                                    Mark as Read
                                </button>
                                <button
                                    onClick={() => handleDelete(notification._id)}
                                    className="notification-button delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Notifications;
