import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = ({ quizId }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/quiz/${quizId}/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(response.data);
    };
    fetchLeaderboard();
  }, [quizId]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.userId.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

