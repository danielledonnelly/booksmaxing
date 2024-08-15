import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';

const StreaksCalendar = ({ entryCounts, setEntryCounts }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const dateKey = date.toDateString();

    setEntryCounts((prevCounts) => ({
      ...prevCounts,
      [dateKey]: (prevCounts[dateKey] || 0) + 1,
    }));
  };

  const getColor = (count) => {
    if (count === 0) return '#e0f7fa'; // White for no entries
    if (count === 1) return '#b3e6f8'; // Light blue for one entry
    if (count === 2) return '#80d3f1'; // Slightly darker blue
    if (count === 3) return '#4dc0ea'; // Medium blue
    if (count === 4) return '#1aacdf'; // Darker blue
    return '#00beef'; // Maximum entries
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