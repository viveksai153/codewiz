import React, { useState, useEffect } from 'react';
import MonacoEditor from './Editor';
import SnippetList from './SnippetList';
import SearchBar from './SearchBar';
import AppBar from '../AppBar';
import CreateSnippetForm from '../snippetmanager/CreateSnippetForm';
import './welcome.css';

const SnippetManager = () => {
    const [snippets, setSnippets] = useState([]);
    const [filteredSnippets, setFilteredSnippets] = useState([]);
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [creatingNewSnippet, setCreatingNewSnippet] = useState(false);
    const [updateTrigger] = useState(false);

    const fetchSnippets = async () => {
        const token = localStorage.getItem('token'); // Assuming the token is stored with the key 'token'
        const headers = {
            'auth-token': `${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch('http://localhost:5000/api/snippets/usersnippets', { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch snippets');
            }
            const data = await response.json();
            setSnippets(data);
            setFilteredSnippets(data); // Initialize filter
        } catch (error) {
            console.error("Failed to load snippets:", error);
        }
    };

    // UseEffect to fetch snippets on mount and after updates
    useEffect(() => {
        fetchSnippets();
    }, [updateTrigger]);

    const handleFilter = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredSnippets(snippets);
            return;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = snippets.filter(snippet =>
            snippet.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            snippet.language.toLowerCase().includes(lowerCaseSearchTerm) ||
            snippet.code.toLowerCase().includes(lowerCaseSearchTerm) ||
            (snippet.tags && snippet.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)))
        );
        setFilteredSnippets(filtered);
    };

    const handleSelectSnippet = (snippet) => {
        setSelectedSnippet(snippet);
        setCreatingNewSnippet(false);
    };

    const handleCreateNewSnippet = () => {
        setSelectedSnippet(null);
        setCreatingNewSnippet(true);
    };

    return (
        <>
            <AppBar />
            <div className="snippet-manager-container">
                <div className="sidebar">
                    <button onClick={handleCreateNewSnippet} className="create-snippet-button">
                        Create New Snippet
                    </button>
                    <SearchBar onFilter={handleFilter} />
                    {filteredSnippets.length === 0 ? (
                        <div>
                            <p className="no-snippets-found">No snippets found</p>
                        </div>
                    ) : (
                        <div>
                            <SnippetList 
                                snippets={filteredSnippets}
                                onSelectSnippet={handleSelectSnippet}
                                fetchSnippets={fetchSnippets} // Pass fetchSnippets function
                            />
                        </div>
                    )}
                </div>
                <div className="editor-container">
                    {creatingNewSnippet ? (
                        <CreateSnippetForm onSave={setSnippets} fetchSnippets={fetchSnippets} />
                    ) : selectedSnippet ? (
                        <MonacoEditor 
                            snippet={selectedSnippet}
                            onChange={(updatedFields) => setSelectedSnippet({
                                ...selectedSnippet,
                                ...updatedFields
                            })}
                            fetchSnippets={fetchSnippets}
                        />
                    ) : (
                        <p>Select a snippet to edit or create a new one.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SnippetManager;

