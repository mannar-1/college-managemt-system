import React, { useEffect, useState } from 'react';

const StudentList = ({ searchResult }) => {
  const [students, setStudents] = useState([]);

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

  const renderStudentDetails = (student) => {
    const colors = ['lightblue', 'lightgreen', 'lightpink', 'lightyellow']; // Define different colors

    return (
      <div key={student._id} style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)], marginBottom: '10px' }}>
        <h3>{student.name}</h3>
        <p>Roll Number: {student.rollno}</p>
        <p>Math Marks: {student.mathmarks}</p>
        <p>Physics Marks: {student.phymarks}</p>
        <p>Chemistry Marks: {student.chemmarks}</p>
      </div>
    );
  };

  return (
    <div>
      {Object.entries(groupStudentsByCollege()).map(([college, students]) => (
        <div key={college} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
          <h2>{college}</h2>
          {students.map((student) => renderStudentDetails(student))}
        </div>
      ))}

      {/* Rest of the code */}
    </div>
  );
};

export default StudentList;
