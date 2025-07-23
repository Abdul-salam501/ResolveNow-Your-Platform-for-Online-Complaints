import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Navbar, Card, Form, Button } from 'react-bootstrap';
import Footer from './FooterC';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/Login', user);
      alert('Successfully logged in');
      localStorage.setItem('user', JSON.stringify(res.data));

      const { userType } = res.data;

      // 🧠 Explicit navigation based on user type
      switch (userType) {
        case "Admin":
          navigate("/AdminHome");
          break;
        case "Agent":
          navigate("/AgentHome");
          break;
        case "User":
          navigate("/HomePage");  // ✅ This is the user dashboard
          break;
        default:
          alert("Unknown user type. Redirecting to login.");
          navigate("/Login");
      }

    } catch (err) {
      alert('Invalid credentials');
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
          <h3 className="mb-3 text-center">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
