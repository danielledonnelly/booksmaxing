import React, { useState } from 'react';
import { Card, Typography, List, ListItem, Grid, IconButton, Box, Autocomplete, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { LinearProgress } from '@mui/material';

const Library = ({ entries, setEntries, setEditEntry }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getBookDetails = (bookId) => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.find((book) => book.bookId === bookId);
  };

  const handleDelete = (entryToDelete) => {
    const updatedEntries = entries.filter((entry) => entry !== entryToDelete);
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
  };

  const handleEdit = (entryToEdit) => {
    setEditEntry(entryToEdit);
  };

  const filteredEntries = entries.filter((entry) => {
    const book = getBookDetails(entry.bookId);
    return book && book.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const bookTitles = filteredEntries.map((entry) => {
    const book = getBookDetails(entry.bookId);
    return book ? book.title : 'Unknown Title';
  });

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        {/* Search bar wrapped in a Card for consistency */}
        <Card sx={{ p: 2, margin: '16px 0', maxWidth: '400px', boxShadow: 3 }}>
          <Autocomplete
            freeSolo
            options={bookTitles}
            value={searchTerm}
            onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                fullWidth
                margin="normal"
                variant="outlined"
                className="library-search-field" // Using the same class as BookTracker
              />
            )}
          />
        </Card>
      </Grid>

      <Grid item xs={12} sm={11} md={10} lg={12}>
        <Card
          sx={{
            minHeight: '450px',
            maxHeight: '450px',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            minWidth: '375px',
            maxWidth: '400px',
            boxSizing: 'border-box',
            boxShadow: 3,
          }}
        >
          <Card
            sx={{
              flexGrow: 1,
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
              backgroundColor: 'inherit',
              boxShadow: 'none',
              overflowY: 'auto',
              justifyContent: 'flex-start',
              paddingTop: '16px',
              paddingBottom: '8px',
              flexGrow: 1,
            }}
          >
            {filteredEntries.length > 0 ? (
              <List
                sx={{
                  width: '100%',
                  maxHeight: '100%',
                  overflowY: 'auto',
                  p: 2,
                }}
              >
                {filteredEntries.map((entry, index) => {
                  const book = getBookDetails(entry.bookId);
                  const progress = book ? (entry.pagesRead / book.totalPages) * 100 : 0;

                  return (
                    <ListItem
                      key={index}
                      sx={{
                        mb: 2,
                        borderRadius: '8px',
                        bgcolor: '#999999',
                        p: 2,
                        boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                      }}
                      secondaryAction={
                        <>
                          <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(entry)}>
                            <EditIcon sx={{ color: '#ffffff' }} />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(entry)}>
                            <DeleteIcon sx={{ color: '#ffffff' }} />
                          </IconButton>
                        </>
                      }
                    >
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" color="#ffffff" sx={{ fontWeight: 'bold' }}>
                          {book ? book.title : 'Unknown Title'}
                        </Typography>

                        <Box display="flex" alignItems="center" mt={1}>
                          <BookmarkIcon fontSize="small" sx={{ mr: 1, color: '#cccccc' }} />
                          <Typography variant="body2" color="#dddddd">
                            {`Status: ${entry.status}`}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" mt={1}>
                          <BookIcon fontSize="small" sx={{ mr: 1, color: '#cccccc' }} />
                          <Typography variant="body2" color="#dddddd">
                            {`Pages Read: ${entry.pagesRead} / ${book ? book.totalPages : 'Unknown'}`}
                          </Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={progress} sx={{ mt: 1 }} />

                        {entry.notes && (
                          <Box display="flex" alignItems="center" mt={1}>
                            <NotesIcon fontSize="small" sx={{ mr: 1, color: '#cccccc' }} />
                            <Typography variant="body2" color="#dddddd">
                              {`Notes: ${entry.notes}`}
                            </Typography>
                          </Box>
                        )}

                        <Box display="flex" alignItems="center" mt={1}>
                          <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: '#cccccc' }} />
                          <Typography variant="body2" color="#dddddd">
                            {`Date: ${entry.date}`}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography variant="body2" sx={{ padding: '16px', color: '#dddddd' }}>
                No entries found. Start tracking your reading!
              </Typography>
            )}
          </Card>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Library;
