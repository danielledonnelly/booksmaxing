import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

const Library = ({ entries }) => {
  // Helper function to get the book details based on the bookId
  const getBookDetails = (bookId) => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.find(book => book.bookId === bookId);
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
                    <ListItem key={index} sx={{ mb: 2 }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="textPrimary">
                            {book ? book.title : 'Unknown Title'}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="textPrimary">
                              {`Status: ${entry.status}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                              {`Pages Read: ${entry.pagesRead} / ${book ? book.totalPages : 'Unknown'}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                              {`Notes: ${entry.notes}`}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
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