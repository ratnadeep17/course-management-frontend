import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { Eye, Trash } from 'react-bootstrap-icons';
import './List.css'; // Import the CSS file

function InstanceList({ instances, setYear, setSemester, fetchInstances, handleDeleteInstance, handleShowInstanceListModal }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [yearSelected, setYearSelected] = useState('');
  const [semesterSelected, setSemesterSelected] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  // Trigger fetchInstances only when both year and semester are selected
  useEffect(() => {
    if (yearSelected && semesterSelected) {
      fetchInstances();
    }
  }, [yearSelected, semesterSelected]);

  const handleShowModal = (id) => {
    setLoading(true); // Set loading to true when starting to fetch data
    handleShowInstanceListModal(id, (data) => {
      setModalContent([data]); // Wrap data in an array to ensure consistency with rendering
      setLoading(false); // Set loading to false after data is fetched
      setShowModal(true);
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleYearChange = (e) => {
    setYearSelected(e.target.value);
    setYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemesterSelected(e.target.value);
    setSemester(e.target.value);
  };

  return (
    <div>
      <Form inline className="mt-3" onSubmit={e => { e.preventDefault(); fetchInstances(); }}>
        <Row className="align-items-center">
          <Col xs={2}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Year"
                onChange={handleYearChange}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={3} className='ms-2'>
            <Form.Group>
              <Form.Select
                as="select"
                onChange={handleSemesterChange}
                required
                style={{ border: 'none', outline: 'none' }}
              >
                <option value="">Select semester</option>
                {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className='ms-2'>
            <Button variant="primary">
              List Instances
            </Button>
          </Col>
        </Row>
      </Form>

      <Table className='mt-3 course-table'>
        <thead className="table-primary">
          <tr>
            <th className='course-title'>Course Title</th>
            <th className='year-sem'>Year-Sem</th>
            <th className='course-code'>Code</th>
            <th className='action'>Action</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(instances) ? instances : []).map(instance => (
            <tr key={instance.id}>
              <td className='course-title'>{instance.course.title}</td>
              <td className='year-sem'>{`${instance.year}-${instance.semester}`}</td>
              <td className='course-code'>{instance.course.courseCode}</td>
              <td className='action'>
                <Button variant="light" className="me-2" onClick={() => handleShowModal(instance.id)}>
                  <Eye />
                </Button>
                <Button variant="light" className="text-danger"
                  onClick={() => handleDeleteInstance(instance.id, instance.year, instance.semester, instance.course.courseId)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Instance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading...</p>
          ) : modalContent.length === 0 ? (
            <p>No details available.</p>
          ) : (
            modalContent.map((instance) => (
              <div key={instance.id} className="mb-3">
                <p><strong>Course Title:</strong> {instance.course.title}</p>
                <p><strong>Course Code:</strong> {instance.course.courseCode}</p>
                <p><strong>Description:</strong> {instance.course.description}</p>
                <p><strong>Year:</strong> {instance.year}</p>
                <p><strong>Semester:</strong> {instance.semester}</p>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InstanceList;
