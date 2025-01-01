import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPerformance = () => {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/user/performance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPerformance(response.data);
    };
    fetchPerformance();
  }, []);

  return (
    <div>
      <h2>Your Performance</h2>
      <table>
        <thead>
          <tr>
            <th>Quiz Title</th>
            <th>Attempts</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {performance.map((entry, index) => (
            <tr key={index}>
              <td>{entry.quizTitle}</td>
              <td>{entry.attempts}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPerformance;

