import React, { useState } from 'react';
import StudentList from './components/StudentList';
const Navbar = () => {
  const handleLinkClick = () => {
    window.open('https://github.com/mannar-1/college-managemt-system', '_blank');
  };

  return (
    <nav
      style={{
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        alignItems: 'center',
      }}
    >
      <div>
        <h2>CampusExplorer</h2>
      </div>
      <div
        style={{
          fontSize: '12px',
          cursor: 'pointer',
        }}
        onClick={handleLinkClick}
      >
        <p
          style={{
            margin: 0,
            transition: 'color 0.5s',
            color: 'white',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'purple')}
          onMouseLeave={(e) => (e.target.style.color = 'white')}
        >
          Dev-Love-Ped by Fruit Programmers
        </p>
      </div>
    </nav>
  );
};
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
    <div style={{background:'white'}}>
      <Navbar/>
      <p></p>
      <StudentList searchResult={searchResult} />
    </div>
  );
};

export default App;