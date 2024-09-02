import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

const Library = ({ entries }) => {
  return (
    <Grid container justifyContent="center" spacing={3}> 
      <Grid item xs={12} sm={11} md={10} lg={12}> {/* Increase lg size to 12 to make it full width */}
        <Card sx={{ minHeight: '450px', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>  
          <CardContent sx={{ flexGrow: 1 }}> {/* Ensure CardContent takes up all available space */}
            {entries.length > 0 ? (
              <List sx={{ maxHeight: '350px', overflow: 'auto', minHeight: '350px' }}> 
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Library;