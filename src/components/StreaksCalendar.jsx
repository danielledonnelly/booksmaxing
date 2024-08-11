import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { eachDayOfInterval, format, startOfYear, endOfYear, getDay, addDays } from 'date-fns';

const colors = {
  0: '#2b2b2c', // No entry
  1: '#073f55', // One entry
  2: '#047597', // A few entries
  3: '#029ac3', // Several entries
  4: '#00beef'  // A LOT of entries
};

const getColor = (count) => {
  if (count >= 4) return colors[4];
  if (count >= 3) return colors[3];
  if (count >= 2) return colors[2];
  if (count >= 1) return colors[1];
  return colors[0];
};

const StreaksCalendar = () => {
  const startDate = startOfYear(new Date());
  const endDate = endOfYear(new Date());
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const [entries, setEntries] = useState(days.map(() => 0));

  const incrementEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = Math.min(updatedEntries[index] + 1, 4); // Cap at 4 entries
    setEntries(updatedEntries);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Reading Progress Calendar
      </Typography>
      <Grid container spacing={1} wrap="nowrap">
        {days.map((day, index) => {
          const dayOfWeek = getDay(day);
          const color = getColor(entries[index]);

          return (
            <Grid item key={index}>
              <Box
                onClick={() => incrementEntry(index)}
                sx={{
                  width: 15,
                  height: 15,
                  backgroundColor: color,
                  marginBottom: dayOfWeek === 6 ? 3 : 1,
                  cursor: 'pointer',
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default StreaksCalendar;
