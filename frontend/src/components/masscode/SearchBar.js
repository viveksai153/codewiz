import React, { useState } from 'react';
 import './SearchBar.css'
const SearchBar = ({ onFilter }) => {
    const [input, setInput] = useState('');
 
    const handleSearchChange = (event) => {
        setInput(event.target.value);
        onFilter(event.target.value); // Make sure this matches the prop passed for filtering
    };

     

    return (
        <>
            <input
                type="text"
                value={input}
                onChange={handleSearchChange}
                placeholder="Search snippets..."
                className="search-bar"
            />
             
        </>
    );
};

export default SearchBar;
