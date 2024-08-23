import React, { useState } from 'react';
import { TextField, Button, FormControl, MenuItem, Select, InputLabel, Grid } from '@mui/material';
import '../index.css';

const BookTracker = ({ entryCounts, setEntryCounts }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const dateKey = (new Date()).toDateString();
    setEntryCounts((prevCounts) => ({
      ...prevCounts,
      [dateKey]: (prevCounts[dateKey] || 0) + 1,
    }));
    // Save logic goes here
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