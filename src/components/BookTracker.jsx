import React, { useState } from 'react';
import { TextField, Button, FormControl, MenuItem, Select, InputLabel } from '@mui/material';

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
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="currently reading">Currently Reading</MenuItem>
          <MenuItem value="want to read">Want to Read</MenuItem>
          <MenuItem value="dropped">Dropped</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
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
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </form>
  );
};

export default BookTracker;