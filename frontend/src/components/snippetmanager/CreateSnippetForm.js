import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './CreateSnippetFrom.css';
import Alert from '../util/alerts';

const CreateSnippetForm = ({ fetchSnippets }) => {
    const [snippet, setSnippet] = useState({
        title: '',
        language: 'javascript',
        tags: '',
        code: '// Type your code here\n',
        isPublic: false
    });

    const [alert, setAlert] = useState({ type: '', message: '', key: 0 }); // State for managing alerts

    useEffect(() => {
        setSnippet(prev => ({
            ...prev,
            authToken: localStorage.getItem('token')
        }));
    }, []);

    const handleChange = event => {
        const { name, value, type, checked } = event.target;
        setSnippet(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLanguageChange = event => {
        setSnippet(prev => ({
            ...prev,
            language: event.target.value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/snippets/createsnippet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': snippet.authToken
                },
                body: JSON.stringify({
                    ...snippet,
                    tags: snippet.tags.split(',').map(tag => tag.trim())
                })
            });

            const data = await response.json();
            if (response.ok) {
                setAlert({ type: 'success', message: 'Snippet created successfully!', key: alert.key + 1 });
                fetchSnippets();
            } else {
                throw new Error(data.message || 'Failed to create snippet');
            }
        } catch (error) {
            console.error('Failed to create snippet:', error);
            setAlert({ type: 'error', message: `Failed to create snippet: ${error.message}`, key: alert.key + 1 });
        }
    };

    const languages = [
        "JavaScript", "Python", "Java", "csharp", "Ruby", "PHP", "Swift", "TypeScript",
        "Go", "Rust", "Scala", "Kotlin", "HTML", "CSS", "Sass", "Less", "C", "C++",
        "SQL", "Objective-C", "Dart", "Lua", "R", "Perl", "Shell", "PowerShell"
    ];

    return (
        <div className="snippet-creation">
            <Alert key={alert.key} type={alert.type} message={alert.message} /> {/* Add key to Alert component */}
            <input type="text" name="title" placeholder="Snippet Title" value={snippet.title} onChange={handleChange} className="title-input" />
            <select name="language" value={snippet.language} onChange={handleLanguageChange} className="language-select">
                {languages.map((lang, index) => (
                    <option key={`${lang.toLowerCase()}-${index}`} value={lang.toLowerCase()}>{lang}</option>
                ))}
            </select>
            <input type="text" name="tags" placeholder="Tags (comma-separated)" value={snippet.tags} onChange={handleChange} className="tags-input" />
            <label>
                <input type="checkbox" name="isPublic" checked={snippet.isPublic} onChange={handleChange} />
                Public
            </label>
            <div className="editor-container">
                <Editor
                    
                    language={snippet.language}
                    value={snippet.code}
                    onChange={(value, event) => setSnippet(prev => ({ ...prev, code: value }))}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        glyphMargin: false,
                        folding: false,
                        lineNumbersMinChars: 3,
                        scrollBeyondLastLine: false,
                        renderLineHighlight: "none",
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        highlightActiveIndentGuide: false,
                        renderIndentGuides: false,
                        lineDecorationsWidth: 0,
                        lineNumbers: "on"
                    }}
                />
            </div>
            <button onClick={handleSubmit} className="submit-btn">Save Snippet</button>
        </div>
    );
};

export default CreateSnippetForm;
