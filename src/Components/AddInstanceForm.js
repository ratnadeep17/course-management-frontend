import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

function AddInstanceForm({ handleSubmit, courses, refreshCourses }) {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    setSelectedCourseId('');
    setYear('');
    setSemester('');
  }, [courses]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleRefresh = () => {
    refreshCourses();
  };

  const resetForm = () => {
    setSelectedCourseId('');
    setYear('');
    setSemester('');
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          handleSubmit(e, selectedCourseId, year, semester);
          resetForm(); // Reset fields after submission
        }}
      >
        <Row className="align-items-end">
          <Col xs={10}>
            <Form.Group>
              <Form.Control 
                as="select" 
                value={selectedCourseId} 
                onChange={handleCourseChange} 
                required
              >
                <option value="">Select course</option>
                {courses.map(course => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="primary" onClick={handleRefresh}>
              Refresh
            </Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={6}>
            <Form.Group>
              <Form.Control 
                name="year" 
                type="text" 
                placeholder="YYYY" 
                value={year} 
                onChange={handleYearChange} 
                required 
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Control 
                name="semester" 
                type="text" 
                placeholder="Semester" 
                value={semester} 
                onChange={handleSemesterChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3 justify-content-center">
          <Col xs="5">
            <Button variant="primary" type="submit">
              Add Instance
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddInstanceForm;
