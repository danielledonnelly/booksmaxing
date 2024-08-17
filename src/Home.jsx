import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import StreaksCalendar from './components/StreaksCalendar';
import BookTracker from './components/BookTracker';
import PromptGenerator from './components/PromptGenerator';
import Library from './components/Library'; // Importing the new Library component
import './index.css'; 

const Home = () => {
  const [entryCounts, setEntryCounts] = useState({});

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Streaks + Calendar Grid Card */}
        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Streaks + Calendar</Typography>
              <StreaksCalendar entryCounts={entryCounts} setEntryCounts={setEntryCounts} />
            </CardContent>
          </Card>
        </Grid>

        {/* Book Progress + Note-taking Card */}
        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Track Your Reading</Typography>
              <BookTracker entryCounts={entryCounts} setEntryCounts={setEntryCounts} />
            </CardContent>
          </Card>
        </Grid>

        {/* Reading Prompt Generator Card */}
        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Reading Prompt Generator</Typography>
              <PromptGenerator />
            </CardContent>
          </Card>
        </Grid>

        {/* Library Card */}
        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Library</Typography>
              <Library entryCounts={entryCounts} setEntryCounts={setEntryCounts} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;