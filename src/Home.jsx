import React, { useState, useEffect } from 'react';
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
  const [books, setBooks] = useState([]); // State for books
  const [editEntry, setEditEntry] = useState(null); // State to track the entry being edited

  // useEffect to load data from localStorage on mount
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    const storedEntryCounts = JSON.parse(localStorage.getItem('entryCounts')) || {};
    const storedBooks = JSON.parse(localStorage.getItem('books')) || []; // Load books from localStorage

    setEntries(storedEntries);
    setEntryCounts(storedEntryCounts);
    setBooks(storedBooks); // Set books from localStorage
  }, []);  // Empty dependency array means this runs once when the component mounts

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
                books={books} // Pass books
                setBooks={setBooks} // Pass setBooks
                editEntry={editEntry} // Pass editEntry for editing
                setEditEntry={setEditEntry} // Pass setEditEntry to reset edit mode
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
          <Card className="card">
            <CardContent>
              <Typography variant="h5">Library</Typography>
              <Library 
                entries={entries} 
                setEntries={setEntries} // Pass setEntries to allow deletion
                setEditEntry={setEditEntry} // Pass setEditEntry to allow editing
              />
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
