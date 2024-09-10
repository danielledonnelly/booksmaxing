import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for delete action
import EditIcon from '@mui/icons-material/Edit'; // Icon for edit action

const Library = ({ entries, setEntries, setEditEntry, books }) => {
  // Helper function to get the book details based on the bookId
  const getBookDetails = (bookId) => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.find(book => book.bookId === bookId);
  };

  // Function to delete an entry from the library
  const handleDelete = (entryToDelete) => {
    const updatedEntries = entries.filter(entry => entry !== entryToDelete);
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
        <Card sx={{
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
        }}>
          <Card sx={{
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
          }}>
            {/* Check if there are any entries */}
            {entries.length > 0 ? (
              <List sx={{
                width: '100%',
                maxHeight: '100%',
                overflowY: 'auto',
                p: 2,
              }}>
                {entries.map((entry, index) => {
                  const book = getBookDetails(entry.bookId);
                  return (
                    <ListItem key={index} sx={{ mb: 2 }} secondaryAction={
                      <>
                        {/* Edit Button */}
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(entry)}>
                          <EditIcon /> {/* Icon for editing */}
                        </IconButton>
                        {/* Delete Button */}
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(entry)}>
                          <DeleteIcon /> {/* Icon for deleting */}
                        </IconButton>
                      </>
                    }>
                      {/* Display book and entry details */}
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="span" color="textPrimary">
                            {book ? book.title : 'Unknown Title'} {/* Display the book title or 'Unknown Title' if not found */}
                          </Typography>
                        }
                        secondary={
                          <>
                            {/* Display the status of the book (e.g., Currently Reading, Completed) */}
                            <Typography variant="body2" component="span" color="textPrimary">
                              {`Status: ${entry.status}`}
                            </Typography>
                            {/* Display the progress of pages read out of total pages */}
                            <Typography variant="body2" component="span" color="textSecondary" sx={{ mt: 1 }}>
                              {`Pages Read: ${entry.pagesRead} / ${book ? book.totalPages : 'Unknown'}`}
                            </Typography>
                            {/* Display any notes the user has written */}
                            <Typography variant="body2" component="span" color="textSecondary" sx={{ mt: 1 }}>
                              {`Notes: ${entry.notes}`}
                            </Typography>
                            {/* Display the date the entry was created */}
                            <Typography variant="caption" component="span" color="textSecondary" sx={{ mt: 1 }}>
                              {`Date: ${entry.date}`}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              // Message to display if there are no entries
              <Typography variant="body2" sx={{ padding: '16px' }}>
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
