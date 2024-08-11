import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StreaksCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="mx-auto">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                calendarClassName="calendar"
              />
        </Col>
      </Row>
    </Container>
  );
};

export default StreaksCalendar;
