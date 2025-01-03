import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Alert from '../util/alerts';
import './SnippetList.css';

const SnippetList = ({ snippets, onSelectSnippet, fetchSnippets }) => {
    const [alert, setAlert] = useState({ type: '', message: '', visible: false });

    const handleDeleteSnippet = async (id, event) => {
        event.stopPropagation(); // Prevent onSelectSnippet from firing when the delete button is clicked
        try {
            const token = localStorage.getItem("token"); // Assuming you store token in localStorage
            await axios.delete(`http://localhost:5000/api/snippets/delete/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token // Assuming your server requires authentication token
                },
            });
            setAlert({ type: 'success', message: 'Snippet deleted successfully!', visible: true });
            setTimeout(() => setAlert({ visible: false }), 3000); // Hide the alert after 3 seconds
            fetchSnippets(); // Trigger fetching snippets after deletion
        } catch (error) {
            console.error("Error deleting snippet:", error);
            setAlert({ type: 'danger', message: 'Failed to delete the snippet.', visible: true });
            setTimeout(() => setAlert({ visible: false }), 3000); // Hide the alert after 3 seconds
        }
    };

    return (
        <div className="snippets-list">
            {alert.visible && <Alert type={alert.type} message={alert.message} />}
            {snippets.map(snippet => (
                <div key={snippet._id} className="snippet-card" style={{ position: 'relative' }}>
                    <div className="snippet-content" onClick={() => onSelectSnippet(snippet)}>
                        <h4>{snippet.title}</h4>
                        <p className="language" data-language={snippet.language.toLowerCase()}>{snippet.language}</p>
                        <div className="tags">
                            {snippet.tags && snippet.tags.map((tag, index) => (
                                <span key={`${tag}-${index}`} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        className="delete-icon" 
                        onClick={(e) => handleDeleteSnippet(snippet._id, e)} 
                        aria-label="Delete snippet" 
                    />
                </div>
            ))}
        </div>
    );
};

export default SnippetList;
