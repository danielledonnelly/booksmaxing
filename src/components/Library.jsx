import React from 'react';
import { Card, Typography, List, ListItem, Grid, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for delete action
import EditIcon from '@mui/icons-material/Edit'; // Icon for edit action
import BookIcon from '@mui/icons-material/Book';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Library = ({ entries, setEntries, setEditEntry }) => {
  // Helper function to get the book details based on the bookId
  const getBookDetails = (bookId) => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.find((book) => book.bookId === bookId);
  };

  // Function to delete an entry from the library
  const handleDelete = (entryToDelete) => {
    const updatedEntries = entries.filter((entry) => entry !== entryToDelete);
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
  };

  // Function to initiate editing an entry
  const handleEdit = (entryToEdit) => {
    setEditEntry(entryToEdit);
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
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
            maxWidth: '375px',
            boxSizing: 'border-box',
            boxShadow: 'none',
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
            {/* Check if there are any entries */}
            {entries.length > 0 ? (
              <List
                sx={{
                  width: '100%',
                  maxHeight: '100%',
                  overflowY: 'auto',
                  p: 2,
                }}
              >
                {entries.map((entry, index) => {
                  const book = getBookDetails(entry.bookId);
                  return (
                    <ListItem
                      key={index}
                      sx={{
                        mb: 2,
                        borderRadius: '8px',
                        bgcolor: '#999999', // Darker background for dark mode
                        p: 2,
                        boxShadow: '0 3px 6px rgba(0,0,0,0.3)', // Slight shadow for contrast
                      }}
                      secondaryAction={
                        <>
                          <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(entry)}>
                            <EditIcon sx={{ color: '#ffffff' }} /> {/* Icon color updated for visibility */}
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(entry)}>
                            <DeleteIcon sx={{ color: '#ffffff' }} /> {/* Icon color updated for visibility */}
                          </IconButton>
                        </>
                      }
                    >
                      {/* Display book and entry details */}
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" color="#ffffff" sx={{ fontWeight: 'bold' }}>
                          {book ? book.title : 'Unknown Title'}
                        </Typography>

                        {/* Status */}
                        <Box display="flex" alignItems="center" mt={1}>
                          <BookmarkIcon fontSize="small" sx={{ mr: 1, color: '#cccccc' }} />
                          <Typography variant="body2" color="#dddddd">
                            {`Status: ${entry.status}`}
                          </Typography>
                        </Box>

                        {/* Pages read */}
                        <Box display="flex" alignItems="center" mt={1}>
                          <BookIcon fontSize="small" sx={{ mr: 1, color: '#cccccc' }} />
                          <Typography variant="body2" color="#dddddd">
                            {`Pages Read: ${entry.pagesRead} / ${book ? book.totalPages : 'Unknown'}`}
                          </Typography>
                        </Box>

                        {/* Notes */}
                        {entry.notes && (
                          <Box display="flex" alignItems="center" mt={1}>
                            <NotesIcon fontSize="small" sx={{ mr: 1, color: '#cccccc' }} />
                            <Typography variant="body2" color="#dddddd">
                              {`Notes: ${entry.notes}`}
                            </Typography>
                          </Box>
                        )}

                        {/* Date */}
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
              // Message to display if there are no entries
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
