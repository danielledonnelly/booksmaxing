import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Grid, Box } from '@mui/material';

const Library = ({ entryCounts }) => {
  const entries = Object.entries(entryCounts);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>  
        <Box sx={{ mt: 4, mb: 4, px: 3 }}> 
          <Card sx={{ minHeight: '450px', p: 2 }}> 
            <CardContent>
              {entries.length > 0 ? (
                <List sx={{ maxHeight: '250px', overflow: 'auto' }}>
                  {entries.map(([title, count], index) => (
                    <ListItem key={index}>
                      <ListItemText primary={title} secondary={`Entries: ${count}`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2">No entries found. Start tracking your reading!</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Library;