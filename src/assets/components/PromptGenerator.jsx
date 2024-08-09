import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const prompts = [
  'Read a mystery novel that was published before 1998.',
  'Read a non-fiction book by an author whose name starts with P.',
  // Add more prompts here
];

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');

  const generatePrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div>
      <Button variant="contained" onClick={generatePrompt}>
        Generate Prompt
      </Button>
      {prompt && (
        <Typography variant="body1" style={{ marginTop: 16 }}>
          {prompt}
        </Typography>
      )}
    </div>
  );
};

export default PromptGenerator;