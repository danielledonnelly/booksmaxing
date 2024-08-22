import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';

const StreaksCalendar = ({ entryCounts, setEntryCounts }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // add looping
  const getColor = (count) => {
    if (count === 0) return '#242424'; 
    if (count === 1) return '#2c3440';
    if (count === 2) return '#344050'; 
    if (count === 3) return '#3c4c60'; 
    if (count === 4) return '#455770'; 
    return '#54688A'; 
  };

  const renderDayContents = (day, date) => {
    const dateKey = date.toDateString();
    const count = entryCounts[dateKey] || 0;
    const color = getColor(count);

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

  useEffect(() => {
    let streak = 0;
    let maxStreak = 0;
    let currentStreak = 0;
    const sortedDates = Object.keys(entryCounts)
      .sort((a, b) => new Date(a) - new Date(b))
      .map(date => new Date(date));

    for (let i = 0; i < sortedDates.length; i++) {
      if (entryCounts[sortedDates[i].toDateString()] > 0) {
        currentStreak++;
        streak = Math.max(streak, currentStreak);
      } else {
        currentStreak = 0;
      }
      maxStreak = Math.max(maxStreak, streak);
    }

    setCurrentStreak(currentStreak);
    setLongestStreak(maxStreak);
  }, [entryCounts]);

  return (
    <Container>
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item md={6} container justifyContent="center">
            <div className="calendar-container">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                calendarClassName="calendar"
                renderDayContents={renderDayContents}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" mt={4}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1">Your current streak is {currentStreak}</Typography>
            <Typography variant="body1">Your longest reading streak is {longestStreak}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StreaksCalendar;