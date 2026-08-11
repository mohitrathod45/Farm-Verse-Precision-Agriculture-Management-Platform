import React, { useState } from 'react';
import { askAI } from '../../services/api';

const AiFarmingAssistant = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClear = () => {
  setQuestion('');
  setAnswer('');
};
  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer('');

      const response = await askAI(question);
      setAnswer(response);
    } catch (error) {
      console.error(error);
      setAnswer('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>AI Farming Assistant</h1>

      <p>
        Ask questions about farming, crops, irrigation, fertilizer,
        soil, and other agricultural topics.
      </p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your farming question..."
        rows="5"
        style={{
          width: '100%',
          maxWidth: '700px',
          padding: '12px',
          marginTop: '15px'
        }}
      />

      <br />

      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          cursor: 'pointer'
        }}
      >
        
        {loading ? 'Thinking...' : 'Ask AI'}
      
      </button>
      <button
  onClick={handleClear}
  disabled={loading}
  style={{
    marginTop: '15px',
    marginLeft: '10px',
    padding: '10px 20px',
    cursor: 'pointer'
  }}
>
  Clear
</button>
      

      {answer && (
        <div
          style={{
            marginTop: '25px',
            padding: '20px',
            maxWidth: '700px',
            background: '#f5f5f5',
            borderRadius: '8px'
          }}
        >
          <h3>AI Response</h3>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
  {answer}
</div>
        </div>
      )}
    </div>
  );
};

export default AiFarmingAssistant;