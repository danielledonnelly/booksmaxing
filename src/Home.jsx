import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import StreaksCalendar from './components/StreaksCalendar';
import BookTracker from './components/BookTracker';
import PromptGenerator from './components/PromptGenerator';
import Library from './components/Library';
import './index.css'; 

const Home = () => {
  const [entryCounts, setEntryCounts] = useState({}); // State for entry counts
  const [entries, setEntries] = useState([]); // State for book entries

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Calendar</Typography>
              <StreaksCalendar entryCounts={entryCounts} setEntryCounts={setEntryCounts} /> {/* Pass both entryCounts and setEntryCounts */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Reading Tracker</Typography>
              <BookTracker 
                entries={entries} 
                setEntries={setEntries} 
                entryCounts={entryCounts} // Pass entryCounts
                setEntryCounts={setEntryCounts} // Pass setEntryCounts
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Library</Typography>
              <Library entries={entries} /> {/* Pass entries to Library */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Reading Prompt Generator</Typography>
              <PromptGenerator />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
