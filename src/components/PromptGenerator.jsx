import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';

// Function to generate a random letter from A to Z
const getRandomLetter = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
};

// Function to generate a random year between 1924 and 2024
const getRandomYear = () => {
  return Math.floor(Math.random() * (2024 - 1924 + 1)) + 1924;
};

// List of prompts with placeholders for random letter (@) and year (&)
const prompts = [
  "Read a book written by an author with the initial @.",
  "Read a book that has a title starting with the letter @.",
  "Read a book based on a true story.",
  "Read a book that was published before &.",
  "Read a genre you wouldn't normally read.",
  "Read a book with a one-word title.",
  "Read a book that is over 500 pages."
];

const PromptGenerator = ({ books = [] }) => {
  const [prompt, setPrompt] = useState(''); // State to store the generated prompt
  const [recommendation, setRecommendation] = useState(''); // State to store the AI recommendation

  // Function to generate a random prompt with random letter and year replacements
  const generatePrompt = () => {
    // Pick a random prompt from the list
    let randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    // Replace '@' with a random letter and '&' with a random year if applicable
    randomPrompt = randomPrompt.replace('@', getRandomLetter());
    randomPrompt = randomPrompt.replace('&', getRandomYear());

    setPrompt(randomPrompt); // Set the generated prompt in the state
  };

  // Function to make a recommendation based on the user's books
  const generateRecommendation = async () => {
    // Check if there are any books available
    if (books.length > 0) {
      const randomBook = books[Math.floor(Math.random() * books.length)];

      // Check if the book details exist
      if (randomBook) {
        setRecommendation(`We recommend you read: "${randomBook.title}" based on your library!`);
      } else {
        setRecommendation("We couldn't find a matching book in your library.");
      }
    } else {
      setRecommendation("You don't have any books in your library to make a recommendation.");
    }
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      {/* Button to generate a random reading prompt */}
      <Grid item sx={{ mt: 4 }}>
        <Button variant="contained" onClick={generatePrompt}>
          Generate Random Prompt
        </Button>
      </Grid>

      {/* Display the generated prompt */}
      <Grid item sx={{ mt: 2 }}>
        {prompt && (
          <Typography variant="body1">
            {prompt}
          </Typography>
        )}
      </Grid>

      {/* Button to generate a reading recommendation based on the user's books */}
      <Grid item sx={{ mt: 4 }}>
        <Button variant="contained" onClick={generateRecommendation}>
          Generate Reading Recommendation
        </Button>
      </Grid>

      {/* Display the generated recommendation */}
      <Grid item sx={{ mt: 2 }}>
        {recommendation && (
          <Typography variant="body1">
            {recommendation}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PromptGenerator;