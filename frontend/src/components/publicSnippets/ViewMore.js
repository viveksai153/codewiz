import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faThumbsUp, faShare, faCopy } from '@fortawesome/free-solid-svg-icons';
import './ViewMore.css';
import Alert from '../util/alerts';

const ViewMore = () => {
    const { snippetId } = useParams();
    const [snippet, setSnippet] = useState(null);
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/snippets/snippets/${snippetId}`);
                setSnippet(response.data);
                setLikes(response.data.likes.length || 0);
                const token = localStorage.getItem('token');
                if (token) {
                    const config = {
                        headers: { 'auth-token': `${token}` }
                    };
                    const userResponse = await axios.post('http://localhost:5000/api/auth/getuser', {}, config);
                    setUsername(userResponse.data.name);
                    setLiked(response.data.likes.includes(userResponse.data.name));
                }
            } catch (err) {
                setError(`Failed to load the snippet: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (snippetId) {
            fetchSnippet();
        } else {
            setError('No snippet ID provided');
            setLoading(false);
        }
    }, [snippetId]);

    const handleDownload = () => {
        if (snippet) {
            const element = document.createElement("a");
            const file = new Blob([snippet.code], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${snippet.title}.txt`;
            document.body.appendChild(element);
            element.click();
            setAlertMessage('Download started');
            setAlertType('success');
        }
    };

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setAlertMessage('Authentication token not found. Please log in.');
                setAlertType('error');
                return;
            }

            const response = await axios.put(`http://localhost:5000/api/snippets/like/${snippetId}`, { username }, {
                headers: {
                    'auth-token': token
                }
            });

            const { liked, message } = response.data;
            setLikes(prevLikes => liked ? prevLikes + 1 : prevLikes - 1);
            setLiked(liked);
            setAlertMessage(message);
            setAlertType('success');
        } catch (err) {
            console.error('Error liking snippet:', err);
            setAlertMessage('Failed to like snippet');
            setAlertType('error');
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setAlertMessage("Link copied to clipboard!");
                setAlertType('success');
            })
            .catch(err => {
                setAlertMessage(`Failed to copy link: ${err}`);
                setAlertType('error');
            });
    };

    const handleCopyCode = () => {
        if (snippet) {
            navigator.clipboard.writeText(snippet.code)
                .then(() => {
                    setAlertMessage("Code copied to clipboard!");
                    setAlertType('success');
                })
                .catch(err => {
                    setAlertMessage(`Failed to copy code: ${err}`);
                    setAlertType('error');
                });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!snippet) return <div>Snippet not found.</div>;

    return (
        <div className="snippet-container">
            <Alert type={alertType} message={alertMessage} />
            <h1>{snippet.title}</h1>
            <h2>Language:</h2>
            <p>{snippet.language}</p>
            <h2>Code:</h2>
            <SyntaxHighlighter language={snippet.language} style={tomorrow}>
                {snippet.code}
            </SyntaxHighlighter>
            <h2>Tags:</h2>
            <p>{snippet.tags.join(', ')}</p>
        
            <div className="snippet-actions">
                <button className="snippet-download-btn" onClick={handleDownload}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                </button>
                <button 
                    className={`snippet-like-btn ${liked ? 'liked' : ''}`} 
                    onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp} /> Like ({likes})
                </button>
                <button className="snippet-share-btn" onClick={handleShare}>
                    <FontAwesomeIcon icon={faShare} /> Share
                </button>
                <button className="snippet-copy-btn" onClick={handleCopyCode}>
                    <FontAwesomeIcon icon={faCopy} /> Copy Code
                </button>
            </div>
        
            <Link to="/SnippetsPage" className="back-link">Back to Snippets</Link>
        </div>
    );
};

export default ViewMore;
