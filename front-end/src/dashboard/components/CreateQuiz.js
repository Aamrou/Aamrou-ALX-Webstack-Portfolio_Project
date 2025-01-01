import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'options') updatedQuestions[index].options = value;
    else updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/quiz/create', { title, questions }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Quiz Created');
    } catch (error) {
      console.error('Error creating quiz:', error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Quiz Title" onChange={(e) => setTitle(e.target.value)} required />
      {questions.map((q, idx) => (
        <div key={idx}>
          <input type="text" placeholder="Question" value={q.question} onChange={(e) => handleQuestionChange(idx, 'question', e.target.value)} />
          {q.options.map((option, oIdx) => (
            <input key={oIdx} type="text" placeholder={`Option ${oIdx + 1}`} value={option} onChange={(e) => {
              const updatedOptions = [...q.options];
              updatedOptions[oIdx] = e.target.value;
              handleQuestionChange(idx, 'options', updatedOptions);
            }} />
          ))}
          <input type="text" placeholder="Answer" value={q.answer} onChange={(e) => handleQuestionChange(idx, 'answer', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default CreateQuiz;
