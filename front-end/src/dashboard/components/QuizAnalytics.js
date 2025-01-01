import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const QuizAnalytics = ({ quizId }) => {
  const [analytics, setAnalytics] = useState({ totalAttempts: 0, averageScore: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/quiz/${quizId}/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);
    };
    fetchAnalytics();
  }, [quizId]);

  const data = {
    labels: ['Total Attempts', 'Average Score'],
    datasets: [
      {
        label: 'Quiz Analytics',
        data: [analytics.totalAttempts, analytics.averageScore],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  return (
    <div>
      <h2>Quiz Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default QuizAnalytics;

