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
import img from '../assets/pic.jpg';
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const groupStudentsByCollege = (data) => {
    const colleges = {};
    if (searchResult) {
      data.map((student) => {
        const college = student.collegeId;

        if (!colleges[college]) {
          colleges[college] = [];
        }

        colleges[college].push(student);
      });

    }
    return colleges;

  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchByRollNo = async () => {
    const response = await fetch(`/college/${searchQuery}`);
    if (response.ok) {
      const data = await response.json();
      const res = groupStudentsByCollege(data);
      setSearchResult(res);
    }
  };

  const searchByName = async () => {
    const response = await fetch(`/college/${searchQuery}`);
    if (response.ok) {
      const data = await response.json();
      const res = groupStudentsByCollege(data);
      setSearchResult(res);
    }
  };
  const searchByBranch = async () => {
    const response = await fetch(`/college/${searchQuery}`);
    if (response.ok) {

      const data = await response.json();
      const res = groupStudentsByCollege(data);
      setSearchResult(res);
    }
  };
  const searchByCollege = async () => {
    const response = await fetch(`/college/${searchQuery}`);
    if (response.ok) {
      const data = await response.json();
      const res = groupStudentsByCollege(data);
      setSearchResult(res);
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
      <div className="container">
        <center><input type="text" style={{
          width: '700px',
          height: '50px',
          borderRadius: '10px',
          textAlign: 'initial',
          fontSize: '20px',

        }} value={searchQuery} onChange={handleSearchQueryChange} placeholder='Search here' pattern='10px' /></center>
        <p></p>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <button style={{
            backgroundColor: 'black',
            color: 'white',
            width: '200px',
            height: '25px',
            borderRadius: '10px'
          }} onClick={searchByRollNo} >Search by Roll No</button>
          <button style={{
            backgroundColor: 'black',
            color: 'white',
            width: '200px',
            height: '25px',
            borderRadius: '10px'
          }} onClick={searchByName}>Search by Name</button>
          <button style={{
            backgroundColor: 'black',
            color: 'white',
            width: '200px',
            height: '25px',
            borderRadius: '10px'
          }} onClick={searchByBranch}>Search by Branch</button>
          <button style={{
            backgroundColor: 'black',
            color: 'white',
            width: '200px',
            height: '25px',
            borderRadius: '10px'
          }} onClick={searchByCollege}>Search by College</button>
          <button style={{
            backgroundColor: 'black',
            color: 'white',
            width: '200px',
            height: '25px',
            borderRadius: '10px'
          }} onClick={() => setSearchResult(null)}>Clear Search</button>

        </div>
        <p></p>
        <p></p>
      </div>

      {/* {searchResult && (
        <div className="popup">
          <div className="popup-content">
            <h2>Search Result</h2>
            <ul>
              {searchResult.map((result) => (
                <>
                  <li key={result._id}>{result.name}</li>
                  <li>{result.rollno}</li>
                  <li>{result.branch}</li>
                  <li>{result.collegeId}</li>
                  <li>{result.mathmarks + result.chemmarks + result.phymarks}</li>
                </>
              ))}
            </ul>
            
              X
            </button>
          </div>
        </div>
      )} */}

      {searchResult && (
        <div>
          {Object.entries(searchResult).map(([college, student1]) => (
            <div key={college} style={{ border: '5px solid black', borderRadius: '8px', padding: '10px', marginBottom: '10px', marginLeft: '10px' }}>
              <center><h1>{college}</h1></center>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px', }}>
                {student1.map((student) => (
                  <div
                    key={student._id}
                    style={{ borderRadius: '20px', backgroundColor: 'black', paddingLeft: '50px', paddingTop: '5px', paddingBottom: '5px', justifyItems: 'start', marginBottom: '10px', cursor: 'pointer' }}
                    onFocus={() => openPopup(student)}
                  >
                    <h3 style={{ color: 'white' }}>{student.name}</h3>
                    <p style={{ color: 'white' }} onMouseEnter={() => setIsHovered(student._id)}
                      onMouseLeave={() => setIsHovered(null)}> Roll Number: {student.rollno}{isHovered == student._id && (
                        <div
                          style={{
                            position: 'absolute',
                            width: '350px',
                            height: '300px',
                            backgroundColor: 'white', // Overlay background color
                            display: 'flex',
                            borderRadius: '7px',
                            transitionDelay:'2s',
                            transitionDuration:'2s',
                            transition:'ease',
                          }}
                        >
                          {/* Place the content of the overlay component here */}
                          <ul>
                          <center><img src={img} alt="Image Description" style={{ height: '100px', width: '100px' }} /></center>
                          <p style={{ color: 'black' }}>Name: {student.name}</p>
                          <p style={{ color: 'black' }}>Email: {student.email}</p>
                          <p style={{ color: 'black' }}>Gender: {student.gender}</p>
                          <p style={{ color: 'black' }}>Age: {student.age}</p>
                          </ul>
                        </div>
                      )}</p>
                    <p style={{ color: 'white' }}>Branch: {student.branch}</p>
                    <p style={{ color: 'white' }}>Math Marks: {student.mathmarks}</p>
                    <p style={{ color: 'white' }}>Physics Marks: {student.phymarks}</p>
                    <p style={{ color: 'white' }}>Chemistry Marks: {student.chemmarks}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
      }

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
