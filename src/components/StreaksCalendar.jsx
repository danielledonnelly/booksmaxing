import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { eachDayOfInterval, format, startOfYear, endOfYear, startOfMonth, endOfMonth, addDays, getDay, isSameMonth } from 'date-fns';

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
  const today = new Date();
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(today);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const [entries, setEntries] = useState(days.map(() => 0));

  const incrementEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = Math.min(updatedEntries[index] + 1, 4); // Cap at 4 entries
    setEntries(updatedEntries);
  };

  const renderCalendarGrid = () => {
    const grid = [];
    const startDay = getDay(startDate); // Which day of the week the month starts
    const totalDays = days.length;
    let dayCounter = 0;

    // Render leading empty cells
    for (let i = 0; i < startDay; i++) {
      grid.push(
        <Grid item key={`empty-start-${i}`} sx={{ width: 30, height: 30 }} />
      );
    }

    // Render the actual days
    while (dayCounter < totalDays) {
      const day = days[dayCounter];
      const color = getColor(entries[dayCounter]);

      grid.push(
        <Grid item key={dayCounter}>
          <Box
            onClick={() => incrementEntry(dayCounter)}
            sx={{
              width: 30,
              height: 30,
              backgroundColor: color,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" color="textSecondary">
              {format(day, 'd')}
            </Typography>
          </Box>
        </Grid>
      );
      dayCounter++;
    }

    // Render trailing empty cells (if any)
    const endDay = getDay(endDate);
    for (let i = endDay + 1; i < 7; i++) {
      grid.push(
        <Grid item key={`empty-end-${i}`} sx={{ width: 30, height: 30 }} />
      );
    }

    return grid;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Reading Progress Calendar
      </Typography>
      <Grid container spacing={1} columns={7}>
        {renderCalendarGrid()}
      </Grid>
    </Box>
  );
};

export default StreaksCalendar;