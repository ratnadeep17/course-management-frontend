import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

function AddCourseForm({ handleSubmit }) {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control name="title" type="text" placeholder="Course title" required />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Control name="code" type="text" placeholder="Course code" required />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Control name="description" as="textarea" rows={3} placeholder="Course description" required />
            </Form.Group>

            <Row className="mt-3 justify-content-center">
                <Col xs="5">
                    <Button variant="primary" type="submit">
                        Add Course
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default AddCourseForm;
