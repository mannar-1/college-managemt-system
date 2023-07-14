import React, { useState } from 'react';

const SearchByRollNo = ({ students }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = students.filter((student) => student.rollno === searchQuery);
    setSearchResults(results);
  };

  return (
    <div>
      <h2>Search by Roll No</h2>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result) => (
          <li key={result._id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchByRollNo;
