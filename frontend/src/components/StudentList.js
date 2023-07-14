// import React, { useEffect, useState } from 'react';

// const StudentList = ({ searchResult }) => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/college');
//       if (response.ok) {
//         const data = await response.json();
//         setStudents(data);
//       }
//     };

//     fetchData();
//   }, []);

//   const groupStudentsByCollege = () => {
//     const colleges = {};

//     students.forEach((student) => {
//       const college = student.collegeId;

//       if (!colleges[college]) {
//         colleges[college] = [];
//       }

//       colleges[college].push(student);
//     });

//     return colleges;
//   };

//   const renderStudentDetails = (student) => {
//     return (
//       <div key={student._id} style={{ backgroundColor: 'lightblue', marginBottom: '10px' }}>
//         <h3>{student.name}</h3>
//         <p>Roll Number: {student.rollno}</p>
//         <p>College: {student.collegeId}</p>
//         <p>Math Marks: {student.mathmarks}</p>
//         <p>Physics Marks: {student.phymarks}</p>
//         <p>Chemistry Marks: {student.chemmarks}</p>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {Object.entries(groupStudentsByCollege()).map(([college, students]) => (
//         <div key={college} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
//           <h2>{college}</h2>
//           <ul>
//             {students.map((student) => (
//               <li key={student._id}>{student.name}</li>
//             ))}
//           </ul>
//         </div>
//       ))}

//       {searchResult && (
//         <div
//           style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             background: 'black',
//             color: 'white',
//             padding: '20px',
//             zIndex: 9999,
//           }}
//         >
//           Search Result:
//           {searchResult.map((student) => renderStudentDetails(student))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentList;
// StudentList.js
import React, { useEffect, useState } from 'react';
import '../styles.css'; // Import the CSS file

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/college');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    };

    fetchData();
  }, []);

  const groupStudentsByCollege = () => {
    const colleges = {};

    students.forEach((student) => {
      const college = student.collegeId;

      if (!colleges[college]) {
        colleges[college] = [];
      }

      colleges[college].push(student);
    });

    return colleges;
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchByRollNo = async () => {
    const response = await fetch(`/college/${searchQuery}`);
    if (response.ok) {
      const data = await response.json();
      setSearchResult(data);
    }
  };

  const searchByName = async () => {
    const response = await fetch(`/college/${searchQuery}`);
    if (response.ok) {
      const data = await response.json();
      setSearchResult(data);
    }
  };

  const openPopup = (student) => {
    setSelectedStudent(student);
  };

  const closePopup = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      <div className="navbar">
        <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
        <button onClick={searchByRollNo}>Search by Roll No</button>
        <button onClick={searchByName}>Search by Name</button>
      </div>

      {searchResult && (
        <div className="popup">
          <div className="popup-content">
            <h2>Search Result</h2>
            <ul>
              {searchResult.map((result) => (
                <li key={result._id}>{result.name}</li>
              ))}
            </ul>
            <button className="popup-close" onClick={() => setSearchResult(null)}>
              X
            </button>
          </div>
        </div>
      )}

      {Object.entries(groupStudentsByCollege()).map(([college, students]) => (
        <div key={college} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
          <h2>{college}</h2>
          {students.map((student) => (
            <div
              key={student._id}
              style={{ backgroundColor: 'lightblue', marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => openPopup(student)}
            >
              <h3>{student.name}</h3>
              <p>Roll Number: {student.rollno}</p>
              <p>Math Marks: {student.mathmarks}</p>
              <p>Physics Marks: {student.phymarks}</p>
              <p>Chemistry Marks: {student.chemmarks}</p>
            </div>
          ))}
        </div>
      ))}

      {selectedStudent && (
        <div className="popup">
          <div className="popup-content">
            <h2>Student Details</h2>
            <p>Name: {selectedStudent.name}</p>
            <p>Roll Number: {selectedStudent.rollno}</p>
            <p>College: {selectedStudent.collegeId}</p>
            <p>Math Marks: {selectedStudent.mathmarks}</p>
            <p>Physics Marks: {selectedStudent.phymarks}</p>
            <p>Chemistry Marks: {selectedStudent.chemmarks}</p>
            <button className="popup-close" onClick={closePopup}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
