// SnippetsPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SnippetCard from './SnippetCard';
import './SnippetsPage.css';
import axios from 'axios';
import AppBar from '../AppBar';

const SnippetsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('All');
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/snippets/public');
        setSnippets(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search or language change
  }, [searchTerm, currentLanguage]);

  useEffect(() => {
    navigate(`?page=${currentPage}`);
  }, [currentPage, navigate]);

  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (currentLanguage === 'All' || snippet.language === currentLanguage)
  );

  const pageCount = Math.ceil(filteredSnippets.length / itemsPerPage);
  const paginatedSnippets = filteredSnippets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const viewMoreDetails = (snippetId) => {
    navigate(`/SnippetsPage/${snippetId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <AppBar/>
      <div className="snippets-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search snippets..."
            className="search-Bar"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="select-container">
            <select onChange={(e) => setCurrentLanguage(e.target.value)}>
              {['All', ...new Set(snippets.map(snippet => snippet.language))].map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
        {paginatedSnippets.map(snippet => (
          <SnippetCard key={snippet._id} snippet={snippet} onViewMore={() => viewMoreDetails(snippet._id)} />
        ))}
        <div className="pagination">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)} disabled={currentPage === page}>
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SnippetsPage;
