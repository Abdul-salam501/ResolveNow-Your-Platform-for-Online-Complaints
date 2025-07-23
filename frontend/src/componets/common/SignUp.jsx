import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Navbar, Card, Form, Button, Dropdown } from 'react-bootstrap';
import Footer from './FooterC';

const SignUp = () => {
  const [title, setTitle] = useState('Select User');
  const [user, setUser] = useState({
    name: '', email: '', password: '', phone: '', userType: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTitle = (select) => {
    setTitle(select);
    setUser({ ...user, userType: select });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/SignUp', user);
      alert('Registered successfully');
      setUser({ name: '', email: '', password: '', phone: '', userType: '' });
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ComplaintCare</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow">
          <h3 className="mb-3 text-center">Sign Up</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={user.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={user.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" name="phone" value={user.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Type</Form.Label>
              <Dropdown onSelect={handleTitle}>
                <Dropdown.Toggle variant="secondary">{title}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="User">User</Dropdown.Item>
                  <Dropdown.Item eventKey="Agent">Agent</Dropdown.Item>
                  <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">Register</Button>
          </Form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;