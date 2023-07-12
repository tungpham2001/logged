import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/foods/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Render the search results */}
      <ul>
        {Array.isArray(searchResults) &&
          searchResults.map((result) => (
            <li key={result.food_id}>{result.food_name}</li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;