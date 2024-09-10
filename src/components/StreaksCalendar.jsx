import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';

const StreaksCalendar = ({ entryCounts }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Determine the background color based on the number of entries for a day
  const getColor = (count) => {
    if (count === 0) return '#242424'; 
    if (count === 1) return '#2c3440';
    if (count === 2) return '#344050'; 
    if (count === 3) return '#3c4c60'; 
    if (count === 4) return '#455770'; 
    return '#54688A'; 
  };

  // Render each day with the appropriate background color based on entry count
  const renderDayContents = (day, date) => {
    const dateKey = date.toDateString();  // Convert the date to a string to match the key in entryCounts
    const count = entryCounts[dateKey] || 0;  // Get the count for that day, or default to 0 if none
    const color = getColor(count);  // Get the appropriate color based on the count

    return (
      <div
        style={{
          backgroundColor: color,
          padding: '5px',
          borderRadius: '10%',
          width: '2rem',
          height: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {day}
      </div>
    );
  };

  // Function to calculate the current streak and the longest streak
  useEffect(() => {
    let currentStreak = 0;
    let maxStreak = 0;
    let streak = 0;

    const sortedDates = Object.keys(entryCounts)
      .sort((a, b) => new Date(a) - new Date(b)) // Sort dates in ascending order
      .map(date => new Date(date));

    let lastDate = null;

    for (let i = 0; i < sortedDates.length; i++) {
      const dateKey = sortedDates[i].toDateString();

      if (entryCounts[dateKey] > 0) {
        if (lastDate && (sortedDates[i] - lastDate === 86400000)) {  // Check if it's the next consecutive day (in milliseconds)
          streak++;  // Continue the streak
        } else {
          streak = 1;  // Start a new streak
        }
        maxStreak = Math.max(maxStreak, streak);  // Update the max streak
      } else {
        streak = 0;  // Break the streak if no entries for the day
      }
      lastDate = sortedDates[i];
    }

    // To calculate the current streak, we iterate backward starting from the most recent date
    const today = new Date();
    streak = 0;
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const dateKey = sortedDates[i].toDateString();
      if (entryCounts[dateKey] > 0) {
        if (!lastDate || (today - sortedDates[i] <= 86400000)) {  // If today is included in the streak
          streak++;
        } else {
          break;  // Break the streak if we hit a day with no entries
        }
      }
      lastDate = sortedDates[i];
    }

    setCurrentStreak(streak);  // Set the current streak based on consecutive days ending today
    setLongestStreak(maxStreak);  // Set the longest streak found
  }, [entryCounts]);

  return (
    <Container className='outer-calendar-container'>
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item md={6} container justifyContent="center">
            <div className="calendar-container">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                calendarClassName="calendar"
                renderDayContents={renderDayContents}  // Use renderDayContents to customize day rendering
              />
            </div>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" mt={4}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1">Your current streak is {currentStreak} days</Typography>
            <Typography variant="body1">Your longest reading streak is {longestStreak} days</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StreaksCalendar;
