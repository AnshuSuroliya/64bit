import React, { useState, useEffect } from 'react';

function Ttos() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const fetchQuestion = async (index) => {
    const response = await fetch(`http://127.0.0.1:8000/question/${index}`);
    const data = await response.json();
    if (response.ok) {
      setCurrentQuestion(data.question);
      setAudioUrl(`http://127.0.0.1:8000${data.audio_url}`);
    } else {
      console.error('Error:', data);
    }
  };

  useEffect(() => {
    fetchQuestion(currentQuestionIndex);
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 2) {  // Assuming there are 3 questions
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="App">
      <h1>Mock Interview</h1>
      <div>
        <p>Question: {currentQuestion}</p>
        <audio controls src={audioUrl} autoPlay></audio>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex >= 2}>
          Next Question
        </button>
      </div>
    </div>
  );
}

export default Ttos;
