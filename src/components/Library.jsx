import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const Library = ({ entryCounts }) => {
  // Assuming entryCounts is an object with book titles as keys and entry count as values
  const entries = Object.entries(entryCounts);

  return (
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
  );
};

export default Library;
