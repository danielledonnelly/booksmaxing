import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import '../index.css';

const Library = ({ entryCounts }) => {
  const entries = Object.entries(entryCounts);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card className="card">
          <CardContent>
            <Typography variant="h6">Library</Typography>
            {entries.length > 0 ? (
              <List>
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
      </Grid>
    </Grid>
  );
};

export default Library;
