import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/quiz/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz._id}>
          {quiz.title} <button>Take Quiz</button>
        </li>
      ))}
    </ul>
  );
};

export default QuizList;
