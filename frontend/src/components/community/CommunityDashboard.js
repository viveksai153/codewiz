import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberSidebar from './memberpanel/MemberSidebar';
import './communitydashboard.css';
import MyMonacoEditor from './SnippetEditor';
import Membersidebar2 from './Membersidebar2';

const languages = [
    "javascript", "python", "java", "csharp", "ruby", "php", "swift",
    "typescript", "go", "rust", "scala", "kotlin", "html", "css",
    "sass", "less", "c", "cplusplus", "sql", "objective-c", "dart",
    "lua", "r", "perl", "shell", "powershell"
];

const CommunityDashboard = () => {
    const { communityId } = useParams();
    const [community, setCommunity] = useState(null);
    const [currentSnippet, setCurrentSnippet] = useState(null);
    const [code, setCode] = useState('');
    const [snippets, setSnippets] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState(languages[0]);
    const [tags, setTags] = useState([]);
    const [newSnippetCode, setNewSnippetCode] = useState('');

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = {
                    'Content-Type': 'application/json',
                    'auth-token': `Bearer ${token}`
                };

                const response = await fetch(`http://localhost:5000/api/community-snippets/community/${communityId}`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch community data');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log the full data to check the structure
                setCommunity(data);
                setSnippets(Array.isArray(data) ? data : []); // Ensure snippets is an array
            } catch (error) {
                console.error('Error fetching community:', error.message);
            }
        };

        fetchCommunity();
    }, [communityId]); // Empty dependency array ensures this runs once

    const handleSnippetClick = (snippetId) => {
        const selectedSnippet = snippets.find(snippet => snippet._id === snippetId);
        setCurrentSnippet(selectedSnippet);
        setCode(selectedSnippet.code);
        setTitle(selectedSnippet.title);
        setLanguage(selectedSnippet.language);
        setTags(selectedSnippet.tags);
        setIsCreating(false); // Ensure the create form is hidden
    };

    const handleSaveSnippet = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': `Bearer ${token}`
            };

            const snippetId = currentSnippet ? currentSnippet._id : '';

            const updatedSnippet = {
                ...currentSnippet,
                code,
                title,
                language,
                tags
            };

            const requestOptions = {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedSnippet)
            };

            const response = await fetch(`http://localhost:5000/api/community-snippets/${snippetId}`, requestOptions);

            if (!response.ok) {
                throw new Error('Failed to save snippet');
            }
            console.log('Snippet saved successfully');
            const fetchCommunity = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const headers = {
                        'Content-Type': 'application/json',
                        'auth-token': `Bearer ${token}`
                    };
    
                    const response = await fetch(`http://localhost:5000/api/community-snippets/community/${communityId}`, {
                        method: 'GET',
                        headers: headers
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch community data');
                    }
                    const data = await response.json();
                    console.log('Fetched data:', data); // Log the full data to check the structure
                    setCommunity(data);
                    setSnippets(Array.isArray(data) ? data : []); // Ensure snippets is an array
                } catch (error) {
                    console.error('Error fetching community:', error.message);
                }
            };
            fetchCommunity();
        } catch (error) {
            console.error('Error saving snippet:', error.message);
        }
    };

    const handleCreateSnippet = async () => {
        try {
            const token = localStorage.getItem("token");

            // Check if the token exists
            if (!token) {
                throw new Error('No token found, please log in again');
            }

            const newSnippet = {
                title,
                language,
                tags,
                code: newSnippetCode,
                community: communityId
            };

            console.log('Token:', token); // Log the token to verify it
            console.log('New Snippet:', newSnippet); // Log the snippet being sent

            const response = await fetch('http://localhost:5000/api/community-snippets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${token}`
                },
                body: JSON.stringify(newSnippet)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Invalid token or session expired');
                } else {
                    throw new Error('Failed to create snippet');
                }
            }

            console.log('Snippet created successfully');
            const fetchCommunity = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const headers = {
                        'Content-Type': 'application/json',
                        'auth-token': `Bearer ${token}`
                    };
    
                    const response = await fetch(`http://localhost:5000/api/community-snippets/community/${communityId}`, {
                        method: 'GET',
                        headers: headers
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch community data');
                    }
                    const data = await response.json();
                    console.log('Fetched data:', data); // Log the full data to check the structure
                    setCommunity(data);
                    setSnippets(Array.isArray(data) ? data : []); // Ensure snippets is an array
                } catch (error) {
                    console.error('Error fetching community:', error.message);
                }
            };
            await fetchCommunity();
            setIsCreating(false);
            setTitle('');
            setLanguage(languages[0]);
            setTags([]);
            setNewSnippetCode('');
        } catch (error) {
            console.error('Error creating snippet:', error.message);
        }
    };

    console.log('Snippets to be passed:', snippets);

    return (
        <>
            <MemberSidebar />
            <div className="app-container">
                <Membersidebar2
                    snippets={snippets}
                    onSnippetClick={handleSnippetClick}
                    onCreateSnippet={() => {
                        setCurrentSnippet(null);
                        setIsCreating(true);
                    }}
                />
                <div className="community-dashboard">
                    <div className="dashboard-content-community">
                        {community ? (
                            <>
                                {isCreating && (
                                    <div>
                                        <h2>Create New Snippet</h2>
                                        <input
                                            className="input-title"
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                        >
                                            {languages.map((lang) => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                        </select>
                                        <input
                                            className="input-title"
                                            type="text"
                                            placeholder="Tags (comma separated)"
                                            value={tags.join(',')}
                                            onChange={(e) => setTags(e.target.value.split(','))}
                                        />
                                        <div className="editor-container">
                                            <MyMonacoEditor
                                                value={newSnippetCode}
                                                onChange={setNewSnippetCode}
                                            />
                                        </div>
                                        <button className="add-new-snippet" onClick={handleCreateSnippet}>Save New Snippet</button>
                                        <button className="new-snippet-cancel" onClick={() => setIsCreating(false)}>Cancel</button>
                                    </div>
                                )}

                                {currentSnippet && !isCreating && (
                                    <div>
                                        <h2>Edit Snippet: {currentSnippet.title}</h2>
                                        <input
                                            className="input-title"
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                        >
                                            {languages.map((lang) => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                        </select>
                                        <input
                                            className="input-title"
                                            type="text"
                                            placeholder="Tags (comma separated)"
                                            value={tags.join(',')}
                                            onChange={(e) => setTags(e.target.value.split(','))}
                                        />
                                        <div className="editor-container">
                                            <MyMonacoEditor
                                                value={code}
                                                onChange={setCode}
                                            />
                                        </div>
                                        <button className="save-snippet-button" onClick={handleSaveSnippet}>Save Snippet</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommunityDashboard;
