import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';

const StreaksCalendar = ({ entryCounts, setEntryCounts }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getColor = (count) => {
    if (count === 0) return '#242424'; // Dark grey for no entries
    if (count === 1) return '#2c3440'; // Slightly lighter and more neutral grey
    if (count === 2) return '#344050'; // Darker grey with subtle blue tones
    if (count === 3) return '#3c4c60'; // Greyish-blue, continuing the transition
    if (count === 4) return '#455770'; // Dark greyish-blue, closer to the final color
    return '#54688A'; // Final color, a slightly darker blue-grey
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

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Row className="justify-content-center">
        <Col md={6} className="d-flex justify-content-center">
          <div className="calendar-container">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              calendarClassName="calendar"
              renderDayContents={renderDayContents}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StreaksCalendar;