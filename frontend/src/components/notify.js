import React, { useState, useEffect } from 'react';
import Notifications from './Notifications';
import axios from 'axios';
import './notify.css';

const MainApp = () => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('token'); // Get token from local storage

        if (userToken) {
            setToken(userToken);

            const fetchUserId = async () => {
                try {
                    const config = {
                        headers: {
                            'auth-token': userToken, // Correct header key and value
                        },
                    };
                    const response = await axios.post('http://localhost:5000/api/auth/getuser', {}, config); // POST request
                    setUserId(response.data._id); // Assuming the user ID is returned in response.data._id
                     
                } catch (error) {
                    console.error('Error fetching user ID:', error.response ? error.response.data : error.message);
                }
            };

            fetchUserId();
        } else {
            console.error('No token found in local storage');
        }

        // Debugging log
    }, []);

    return (
        <div>
            {userId && token ? (
                <Notifications userId={userId} token={token} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MainApp;
