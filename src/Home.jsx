import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import StreaksCalendar from './components/StreaksCalendar';
import BookTracker from './components/BookTracker';
import PromptGenerator from './components/PromptGenerator';
import './index.css'; 


const Home = () => {
  const [entryCounts, setEntryCounts] = useState({});
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        {/* Streaks + Calendar Grid Card */}
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Streaks + Calendar</Typography>
              <StreaksCalendar entryCounts={entryCounts} setEntryCounts={setEntryCounts} />
            </CardContent>
          </Card>
        </Grid>

        {/* Book Progress + Note-taking Card */}
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Track Your Reading</Typography>
              <BookTracker entryCounts={entryCounts} setEntryCounts={setEntryCounts}/>
            </CardContent>
          </Card>
        </Grid>

        {/* Prompt Generator Card */}
        <Grid item xs={12} sm={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Reading Prompt Generator</Typography>
              <PromptGenerator/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
