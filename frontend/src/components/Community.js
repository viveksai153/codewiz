import React, { useState } from 'react';
import axios from 'axios';
import './Community.css';
import AppBar from './AppBar';
import Alert from './util/alerts';

const CommunityPage = () => {
    const [joinCommunityId, setJoinCommunityId] = useState('');
    const [createCommunityName, setCreateCommunityName] = useState('');
    const [alert, setAlert] = useState({ message: null, type: null, visible: false });

    const triggerAlert = (type, message) => {
        setAlert({ type, message, visible: true });
        setTimeout(() => {
            setAlert({ message: null, type: null, visible: false });
        }, 7000);
    };

    const handleJoinCommunity = async (e) => {
        e.preventDefault();
        if (!joinCommunityId) {
            triggerAlert('danger', 'Please enter a community ID to join');
            return;
        }
        try {
            const response = await axios.post('/api/community/join', { communityId: joinCommunityId });
            triggerAlert('success', response.data.message);
        } catch (err) {
            triggerAlert('danger', err.response?.data?.error || 'Failed to join community');
        }
    };

    const handleCreateCommunity = async (e) => {
        e.preventDefault();
        if (!createCommunityName) {
            triggerAlert('danger', 'Please enter a name for the new community');
            return;
        }
        try {
            const response = await axios.post('/api/community/create', { name: createCommunityName });
            triggerAlert('success', response.data.message);
        } catch (err) {
            triggerAlert('danger', err.response?.data?.error || 'Failed to create community');
        }
    };

    return (
        <>
            <AppBar />
            <div className="community-page">
                <h1>Community Actions</h1>
                <div className="forms-container">
                    <form onSubmit={handleJoinCommunity} className="form-style">
                        <h2>Join a Community</h2>
                        <input
                            type="text"
                            value={joinCommunityId}
                            onChange={(e) => setJoinCommunityId(e.target.value)}
                            placeholder="Enter Community ID"
                        />
                        <button type="submit">Join Community</button>
                    </form>
                    
                    <form onSubmit={handleCreateCommunity} className="form-style">
                        <h2>Create a Community</h2>
                        <input
                            type="text"
                            value={createCommunityName}
                            onChange={(e) => setCreateCommunityName(e.target.value)}
                            placeholder="Enter Community Name"
                        />
                        <button type="submit">Create Community</button>
                    </form>
                </div>
                {alert.visible && <Alert type={alert.type} message={alert.message} />}
            </div>
        </>
    );
};

export default CommunityPage;
