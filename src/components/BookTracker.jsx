import React, { useState } from 'react';
import { TextField, Button, FormControl, MenuItem, Select, InputLabel, Grid, Autocomplete } from '@mui/material';

const BookTracker = ({ setEntries, entryCounts, setEntryCounts, books = [], setBooks }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [totalPages, setTotalPages] = useState('');

  // Simple bookId generator
  const generateBookId = () => '_' + Math.random().toString(36).substr(2, 9);

  const findOrCreateBook = () => {
    const existingBook = books.find(book => book.title.toLowerCase() === title.toLowerCase());
    if (existingBook) {
      return existingBook.bookId;
    }

    const newBookId = generateBookId();
    const newBook = { bookId: newBookId, title, totalPages };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));  // Save books to local storage
    return newBookId;
  };

  const handleSave = () => {
    if (title.trim() === '' || totalPages.trim() === '') return;

    const dateKey = new Date().toDateString();
    const bookId = findOrCreateBook();

    const newEntry = {
      bookId,
      status,
      notes,
      pagesRead,
      date: dateKey,
    };

    const updatedEntries = [...(JSON.parse(localStorage.getItem('entries')) || []), newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));

    setEntryCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [dateKey]: (prevCounts[dateKey] || 0) + 1,
      };
      localStorage.setItem('entryCounts', JSON.stringify(updatedCounts));
      return updatedCounts;
    });

    setTitle('');
    setStatus('');
    setNotes('');
    setPagesRead('');
    setTotalPages('');
  };

  return (
    <form>
      <Grid container spacing={2}>
        {/* Autocomplete for Book Title */}
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={books.map((book) => book.title)}  // Map book titles if books is not empty
            value={title}
            onInputChange={(event, newInputValue) => setTitle(newInputValue)}  // Update title state
            renderInput={(params) => (
              <TextField
                {...params}
                label="Book Title"
                fullWidth
                margin="normal"
              />
            )}
          />
        </Grid>

        {/* Status Selector */}
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

        {/* Pages Read and Total Pages */}
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={5}>
            <TextField
              label="Pages Read"
              value={pagesRead}
              onChange={(e) => setPagesRead(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={1} container justifyContent="center">
            <span>/</span>
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="Total Pages"
              value={totalPages}
              onChange={(e) => setTotalPages(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        {/* Notes Input */}
        <Grid item xs={12}>
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* Save Button */}
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
