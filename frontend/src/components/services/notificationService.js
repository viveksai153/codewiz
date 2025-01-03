import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notifications';

const getNotifications = async (userId, token) => {
    try {
        const config = {
            headers: {
                "auth-token": `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${API_URL}/${userId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

const addNotification = async (userId, notification, token) => {
    try {
        const config = {
            headers: {
                "auth-token": `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${API_URL}/${userId}`, notification, config);
        return response.data;
    } catch (error) {
        console.error('Error adding notification:', error);
        throw error;
    }
};

const markAsRead = async (userId, notificationId, token) => {
    try {
        const config = {
            headers: {
                "auth-token": `Bearer ${token}`,
            },
        };
        const response = await axios.put(`${API_URL}/${userId}/${notificationId}/read`, {}, config);
        return response.data;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

const deleteNotification = async (userId, notificationId, token) => {
    try {
        const config = {
            headers: {
                "auth-token": `Bearer ${token}`,
            },
        };
        const response = await axios.delete(`${API_URL}/${userId}/${notificationId}`, config);
        return response.data;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};

const notificationService = {
    getNotifications,
    addNotification,
    markAsRead,
    deleteNotification,
};

export default notificationService;
