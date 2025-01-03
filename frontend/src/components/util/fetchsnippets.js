// services/snippetService.js
export const fetchSnippets = async () => {
    const token = localStorage.getItem('token');
    const headers = {
        'auth-token': token,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch('http://localhost:5000/api/snippets/usersnippets/', { headers });
        if (!response.ok) {
            throw new Error('Failed to fetch snippets');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to load snippets:", error);
        throw error;
    }
};
