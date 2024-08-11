import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import StreaksCalendar from './components/StreaksCalendar';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {/* Streaks + Calendar Grid Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Streaks + Calendar</Typography>
              {/* Calendar grid will go here */}
            </CardContent>
          </Card>
        </Grid>

        {/* Book Progress + Note-taking Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Track Your Reading</Typography>
              {/* Book progress tracking and note-taking features go here */}
              <StreaksCalendar />
            </CardContent>
          </Card>
        </Grid>

        {/* Prompt Generator Card */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Reading Prompt Generator</Typography>
              {/* Prompt generator will go here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;