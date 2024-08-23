import React, { useState } from 'react';
import { Button, Typography, Grid, Box } from '@mui/material';
import '../index.css';

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
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item sx={{ mt: 4 }}>
        <Button variant="contained" onClick={generatePrompt}>
          Generate Prompt
        </Button>
      </Grid>
      <Grid item sx={{ mt: 4 }}>
        {prompt && (
          <Typography variant="body1">
            {prompt}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PromptGenerator;