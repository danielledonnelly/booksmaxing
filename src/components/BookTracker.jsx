import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, FormControl, MenuItem, Select, InputLabel, Grid, Autocomplete } from '@mui/material';

const BookTracker = ({ setEntries, entryCounts, setEntryCounts, books = [], setBooks, editEntry, setEditEntry }) => {
  const [title, setTitle] = useState(''); // Book title
  const [status, setStatus] = useState(''); // Book status
  const [notes, setNotes] = useState(''); // User notes
  const [pagesRead, setPagesRead] = useState(''); // Pages read
  const [totalPages, setTotalPages] = useState(''); // Total pages of the book

  useEffect(() => {
    if (editEntry) { // If there is an entry to edit
      const book = books.find(book => book.bookId === editEntry.bookId); // Find the corresponding book
      if (book) {
        setTitle(book.title); // Set the book title in the form
        setTotalPages(book.totalPages); // Set the total pages in the form
      }
      setStatus(editEntry.status); // Set other form fields based on the entry being edited
      setNotes(editEntry.notes);
      setPagesRead(editEntry.pagesRead);
    }
  }, [editEntry, books]); // Run effect when editEntry or books change

  const generateBookId = () => '_' + Math.random().toString(36).substr(2, 9);

  const findOrCreateBook = () => {
    const existingBook = books.find(book => book.title === title); // Find a book by title
    if (existingBook) return existingBook.bookId;

    // Create a new book
    const newBookId = generateBookId();
    const newBook = { bookId: newBookId, title, totalPages };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks); // Update the books array
    localStorage.setItem('books', JSON.stringify(updatedBooks)); // Save the updated books list to local storage

    return newBookId; // Return the new book ID
  };

  const handleSave = () => {
    if (title.trim() === '' || totalPages.trim() === '') return; // Ensure that required fields are filled

    const dateKey = new Date().toDateString();
    const bookId = findOrCreateBook(); // Find or create a book

    const newEntry = {
      bookId, // Only store the book ID in the entry
      status,
      notes,
      pagesRead,
      date: dateKey,
    };

    const updatedEntries = [...(JSON.parse(localStorage.getItem('entries')) || []), newEntry];
    setEntries(updatedEntries); // Update the entries array
    localStorage.setItem('entries', JSON.stringify(updatedEntries)); // Save the updated entries to local storage

    setEntryCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [dateKey]: (prevCounts[dateKey] || 0) + 1,
      };
      localStorage.setItem('entryCounts', JSON.stringify(updatedCounts)); // Save the updated entry counts to local storage
      return updatedCounts;
    });

    // Reset the form fields after saving
    setTitle('');
    setStatus('');
    setNotes('');
    setPagesRead('');
    setTotalPages('');
    setEditEntry(null); // Clear the edit state
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={books.map((book) => book.title)} // Provide book titles for autocomplete
            value={title}
            onInputChange={(event, newInputValue) => setTitle(newInputValue)}
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

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              {/* Updated the status options to be capitalized */}
              <MenuItem value="Currently Reading">Currently Reading</MenuItem>
              <MenuItem value="Want to Read">Want to Read</MenuItem>
              <MenuItem value="Dropped">Dropped</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
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
            />
          </Grid>

          <Grid item xs={1} container justifyContent="center">
            <Typography variant="h6" sx={{ marginTop: '16px' }}>
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
          />
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
