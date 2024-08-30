import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Eye, Trash } from 'react-bootstrap-icons';
import './List.css';  // Import the CSS file for styling

function CourseList({ courses, handleDeleteCourse, handleShowModal }) {
  const [showModal, setShowModal] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});

  const handleShow = (courseId) => {
    handleShowModal(courseId, (details) => {
      setCourseDetails(details);
      setShowModal(true);
    });
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <Button variant="primary">
          List Courses
        </Button>
      </div>
      <Table className='mt-3 course-table'>
        <thead className="table-primary">
          <tr>
            <th>Course Title</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.title}</td>
              <td>{course.courseCode}</td>
              <td>
                <Button variant="light" className="me-2" onClick={() => handleShow(course.courseId)}>
                  <Eye />
                </Button>
                <Button variant="light" className="text-danger" onClick={() => handleDeleteCourse(course.courseId)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for course details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Title:</strong> {courseDetails.title}</p>
          <p><strong>Code:</strong> {courseDetails.courseCode}</p>
          <p><strong>Description:</strong> {courseDetails.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CourseList;
