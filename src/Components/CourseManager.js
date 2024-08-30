import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCourseForm from './AddCourseForm';
import AddInstanceForm from './AddInstanceForm';
import CourseList from './CourseList';
import InstanceList from './InstanceList';

const BaseURL = process.env.REACT_APP_BASE_URL;

function CourseManager() {
    const [courses, setCourses] = useState([]);
    const [instances, setInstances] = useState([]);
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    //Get Course
    const fetchCourses = () => {
        axios.get(`${BaseURL}/api/courses`)
            .then(response => {
                const { data } = response.data; // Extract courses from the data field
                setCourses(data || []); // Update the state with the courses list
            })
            .catch(error => console.error('Error fetching courses:', error));
    };

    //Get Instance
    const fetchInstances = () => {
        if (year && semester) {
            axios.get(`${BaseURL}/api/instances/${year}/${semester}`)
                .then(response => {
                    console.log('Fetched instances:', response.data); // Log response data
                    setInstances(response.data.data || []); // Ensure `data` is an array
                })
                .catch(error => console.error('Error fetching instances:', error));
        }
    };

    //Add Course
    const handleAddCourse = (event) => {
        event.preventDefault();
        const { title, code, description } = event.target.elements;

        axios.post(`${BaseURL}/api/courses`, {
            title: title.value,
            courseCode: code.value,
            description: description.value,
        })
            .then(response => {
                // Destructure response data
                const { statusCode, statusMessage, data } = response.data;

                // Check statusCode and statusMessage for handling responses
                if (statusCode === 200) {
                    // Handle successful creation
                    if (statusMessage) {
                        toast.success(statusMessage);  // Show the success message
                        setCourses([...courses, data]);  // Update the course list
                    } else {
                        toast.success('Course created successfully.');  // Fallback message if statusMessage is not provided
                    }
                } else if (statusCode === 400) {
                    // Handle specific error messages
                    if (statusMessage) {
                        toast.error(statusMessage);  // Show the specific error message
                    } else {
                        toast.error('A bad request error occurred.');  // Fallback message if statusMessage is not provided
                    }
                } else {
                    // Handle other status codes if needed
                    toast.error('An unexpected response was received.');
                }
            })
            .catch(error => {
                // This catch block handles unexpected errors such as network issues
                toast.error('An error occurred while adding the course. Please try again.');
            });
    };

    //Delete Course
    const handleDeleteCourse = (courseId) => {
        axios.delete(`${BaseURL}/api/courses/${courseId}`)
            .then(() => {
                fetchCourses(); // Fetch the updated list of courses
                toast.success('Course Deleted Succesfully');
            })
            .catch(error => toast.error('An error occurred while deleting the course. Please try again.'));
    };

    //Show Course
    const handleShowModal = (courseId, callback) => {
        axios.get(`${BaseURL}/api/courses/${courseId}`)
            .then(response => {
                const { data } = response.data;
                const cleanedData = {
                    ...data,
                    title: data.title,
                    courseCode: data.courseCode,
                    description: data.description
                };
                callback(cleanedData);
            })
            .catch(error => console.error('Error fetching course details:', error));
    };

     //Add Instance
     const handleAddInstance = (event, courseId, year, semester) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Ensure all required values are provided
        if (!courseId || !year || !semester) {
            toast.error('Please fill in all fields.');
            return;
        }
        axios.post(`${BaseURL}/api/instances`, {
            courseId: courseId,
            year: year,
            semester: semester
        })
            .then(response => {
                toast.success('Course Instance Created Successfully');
            })
            .catch(error => toast.error('An error occurred while adding the instance. Please try again.'));
    };

    //Delete Instance
    const handleDeleteInstance = (instanceId, year, semester, courseId) => {
        axios.delete(`${BaseURL}/api/instances/${year}/${semester}/${courseId}`)
            .then(() => {
                // Remove the deleted instance from the state
                setInstances(instances.filter(instance => instance.id !== instanceId));
                toast.success('Instance deleted successfully!');
                fetchInstances();
            })
            .catch(error => {
                console.error('Error deleting instance:', error);
                toast.error('An error occurred while deleting the instance. Please try again.');
            });
    };

    //Show Instance
    const handleShowInstanceListModal = (instanceId, callback) => {
        axios.get(`${BaseURL}/api/instances/${instanceId}`)
            .then(response => {
                const { data, statusMessage } = response.data;
                if (response.data.statusCode === 200) {
                    callback(data);
                } else {
                    console.error(statusMessage);
                }
            })
            .catch(error => console.error('Error fetching instance details:', error));
    };

    //Refresh Course
    const refreshCourses = () => {
        fetchCourses();
        console.log('Courses refreshed!');
    };

    return (
        <Container fluid className='mb-5'>
            <h4 className="mt-4">Course Management</h4>

            <div className='ms-5'>
                <Row className="mt-4">
                    <Col md={5}>
                        <AddCourseForm handleSubmit={handleAddCourse} />
                    </Col>
                    <Col md={5}>
                        <AddInstanceForm
                            handleSubmit={handleAddInstance}
                            courses={courses}
                            refreshCourses={refreshCourses}
                        />
                    </Col>
                </Row>
            </div>

            <hr className="mt-4" />

            <Row className="mt-3">
                <Col md={12}>
                    <div>
                        <CourseList
                            courses={courses}
                            handleDeleteCourse={handleDeleteCourse}
                            handleShowModal={handleShowModal}
                        />
                    </div>
                </Col>
            </Row>

            <hr className="mt-4" />

            <Row className="mt-3">
                <Col md={12}>
                    <div>
                        <InstanceList
                            instances={instances}
                            setYear={setYear}
                            setSemester={setSemester}
                            fetchInstances={fetchInstances}
                            handleDeleteInstance={handleDeleteInstance}
                            handleShowInstanceListModal={handleShowInstanceListModal}
                        />
                    </div>
                </Col>
            </Row>

            <ToastContainer />
        </Container>
    );
}

export default CourseManager;
