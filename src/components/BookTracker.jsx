import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, FormControl, MenuItem, Select, InputLabel, Grid, Autocomplete } from '@mui/material';
import '../index.css'; 

const BookTracker = ({ setEntries, entryCounts, setEntryCounts, books = [], setBooks, editEntry, setEditEntry }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [totalPages, setTotalPages] = useState('');

  useEffect(() => {
    if (editEntry) {
      const book = books.find((book) => book.bookId === editEntry.bookId);
      if (book) {
        setTitle(book.title);
        setTotalPages(book.totalPages);
      }
      setStatus(editEntry.status);
      setNotes(editEntry.notes);
      setPagesRead(editEntry.pagesRead);
    }
  }, [editEntry, books]);

  const generateBookId = () => '_' + Math.random().toString(36).substr(2, 9);

  const findOrCreateBook = () => {
    const existingBook = books.find((book) => book.title === title);
    if (existingBook) return existingBook.bookId;

    const newBookId = generateBookId();
    const newBook = { bookId: newBookId, title, totalPages };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

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
    setEditEntry(null);
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={books.map((book) => book.title)}
            value={title}
            onInputChange={(event, newInputValue) => setTitle(newInputValue)}
            renderInput={(params) => (
              <TextField {...params} label="Book Title" fullWidth margin="normal" className="booktracker-field" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="Currently Reading">Currently Reading</MenuItem>
              <MenuItem value="Want to Read">Want to Read</MenuItem>
              <MenuItem value="Dropped">Dropped</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} container alignItems="center">
          <Grid item xs={5}>
            <TextField label="Pages Read" value={pagesRead} onChange={(e) => setPagesRead(e.target.value)} fullWidth margin="normal" />
          </Grid>

          <Grid item xs={1} container justifyContent="center">
            <Typography variant="h6" sx={{ marginTop: '16px' }}>
              /
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <TextField label="Total Pages" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} fullWidth margin="normal" />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} multiline rows={4} fullWidth margin="normal" />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {editEntry ? 'Update Entry' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookTracker;
