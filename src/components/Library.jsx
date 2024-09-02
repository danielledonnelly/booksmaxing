import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

const Library = ({ entries }) => {
  return (
    <Grid container justifyContent="center" spacing={3}> 
      <Grid item xs={12} sm={11} md={10} lg={12}> 
        <Card sx={{ 
          minHeight: '450px', 
          p: 0, // Remove padding to make inner card fit exactly
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'stretch',  // Ensure the inner card stretches to full width
          minWidth: '375px', 
          maxWidth: '375px',
          boxSizing: 'border-box',
          boxShadow: 'none', // Remove the shadow from the outer card
        }}>  
          <Card sx={{
            flexGrow: 1,  // Make sure the inner card grows to fill the outer card
            border: 'none',  // Invisible border
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',  // Center content vertically
            alignItems: 'center',  // Center content horizontally
            boxSizing: 'border-box',  // Include padding in width/height calculations
            width: '100%',  // Match the width of the outer card
            height: '100%',  // Match the height of the outer card
            backgroundColor: 'inherit', // Match the outer card's background color
            boxShadow: 'none', // Ensure the inner card also has no shadow
          }}>
            {entries.length > 0 ? (
              <List sx={{ 
                width: '100%',  // Make sure the list takes full width
                maxHeight: '100%',  // Allow list to expand fully within the card
                overflowY: 'auto',  // Enable scrolling if content overflows
                p: 3, // Optional: Add padding inside the list
              }}> 
                {entries.map((entry, index) => (
                  <ListItem key={index} sx={{ mb: 2 }}>  
                    <ListItemText
                      primary={
                        <Typography variant="h6" color="textPrimary"> 
                          {entry.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textPrimary">
                            {`Status: ${entry.status}`}
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
                ))}
              </List>
            ) : (
              <Typography variant="body2">No entries found. Start tracking your reading!</Typography>
            )}
          </Card>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Library;