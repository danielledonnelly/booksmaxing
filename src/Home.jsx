import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import StreaksCalendar from './components/StreaksCalendar';
import './index.css'; // Make sure to import your CSS file

const Home = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {/* Streaks + Calendar Grid Card */}
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Streaks + Calendar</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Book Progress + Note-taking Card */}
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Track Your Reading</Typography>
              <StreaksCalendar />
            </CardContent>
          </Card>
        </Grid>

        {/* Prompt Generator Card */}
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Reading Prompt Generator</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
