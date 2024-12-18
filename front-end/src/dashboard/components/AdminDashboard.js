import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/admin/quizzes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/admin/quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Attempts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id}>
              <td>{quiz.title}</td>
              <td>{quiz.attempts}</td>
              <td>
                <button onClick={() => handleDelete(quiz._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

