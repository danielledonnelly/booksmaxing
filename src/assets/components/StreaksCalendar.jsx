import React from 'react';
import { Box, Grid } from '@mui/material';

const days = Array.from({ length: 30 }, (_, i) => i + 1);

const StreaksCalendar = () => {
  return (
    <Grid container spacing={1}>
      {days.map((day) => (
        <Grid item xs={2} key={day}>
          <Box 
            sx={{
              width: 30, 
              height: 30, 
              backgroundColor: 'green', 
              borderRadius: 1 
            }} 
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StreaksCalendar;