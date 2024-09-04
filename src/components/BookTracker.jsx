import React, { useState } from 'react';
import { TextField, Button, FormControl, MenuItem, Select, InputLabel, Grid, Typography } from '@mui/material';
import '../index.css';

const BookTracker = ({ setEntries, entryCounts, setEntryCounts }) => {  
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pagesRead, setPagesRead] = useState('');

  const handleSave = () => {
    if (title.trim() === '') {
      return;  // Return here is to prevent saving if the title is empty.
    }

    const dateKey = new Date().toDateString();  
    const newEntry = {
      title,
      status,
      notes,
      totalPages,
      pagesRead,
      date: dateKey,
    };

    const updatedEntries = [...(JSON.parse(localStorage.getItem('entries')) || []), newEntry];

    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));  // Save entries to local storage

    setEntryCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [dateKey]: (prevCounts[dateKey] || 0) + 1,
      };
      localStorage.setItem('entryCounts', JSON.stringify(updatedCounts));  // Save entryCounts to local storage
      return updatedCounts;
    });

    // Reset the form fields after saving
    setTitle('');
    setStatus('');
    setNotes('');
    setTotalPages('');
    setPagesRead('');
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{ '& .MuiInputLabel-root': { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="currently reading">Currently Reading</MenuItem>
              <MenuItem value="want to read">Want to Read</MenuItem>
              <MenuItem value="dropped">Dropped</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} container alignItems="center">
          <Grid item xs={5}>
            <TextField
              label="Pages Read"
              value={pagesRead}
              onChange={(e) => setPagesRead(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                style: { color: 'white' },
              }}
              sx={{ '& .MuiInputLabel-root': { color: 'white' } }}
            />
          </Grid>

          <Grid item xs={1} container justifyContent="center">
            <Typography variant="h6" sx={{ color: 'white' }}>
              /
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="Total Pages"
              value={totalPages}
              onChange={(e) => setTotalPages(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                style: { color: 'white' },
              }}
              sx={{ '& .MuiInputLabel-root': { color: 'white' } }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{ '& .MuiInputLabel-root': { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookTracker;
