import React, { useState } from 'react';
import { Table, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { Eye, Trash } from 'react-bootstrap-icons';
import './List.css';  // Import the CSS file

function InstanceList({ instances, setYear, setSemester, fetchInstances, handleDeleteInstance, handleShowInstanceListModal }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const handleShowModal = (courseId) => {
    handleShowInstanceListModal(courseId, (data) => {
      setModalContent(data);
      setShowModal(true);
    });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h5 className="mt-3">Course Instances</h5>
      <Form inline className="mb-3" onSubmit={e => { e.preventDefault(); fetchInstances(); }}>
        <Row className="align-items-center">
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Year"
                onChange={e => setYear(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                as="select"
                onChange={e => setSemester(e.target.value)}
                required
              >
                <option value="">Select semester</option>
                {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit" variant="primary">
              List Instances
            </Button>
          </Col>
        </Row>
      </Form>

      <Table bordered hover className='course-table'>
        <thead className="table-primary">
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Year-Sem</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(instances) ? instances : []).map(instance => (
            <tr key={instance.id}>
              <td>{instance.course.title}</td>
              <td>{instance.course.courseCode}</td>
              <td>{`${instance.year}-${instance.semester}`}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal(instance.course.courseId)}>
                  <Eye />
                </Button>
                <Button
                  variant="light"
                  className="text-danger"
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
          {modalContent.length === 0 ? (
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
