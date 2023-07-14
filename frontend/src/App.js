// import React from 'react';
// import StudentList from './components/StudentList';

// const App = () => {
//   return (
//     <div>
//       <h1>Student List</h1>
//       <StudentList />
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';
import StudentList from './components/StudentList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/college/${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      }
    } catch (error) {
      console.error('Error searching for students:', error);
      setSearchResult(null);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <StudentList searchResult={searchResult} />
    </div>
  );
};

export default App;
