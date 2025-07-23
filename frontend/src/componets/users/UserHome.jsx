import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Complaint from './Complaint';
import Status from './Status';
import Footer from '../common/FooterC';
import { Navbar, Container, Button } from 'react-bootstrap';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return navigate('/');
    setUserName(user.name);
  }, [navigate]);

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Welcome, {userName}</Navbar.Brand>
          <div className="d-flex">
            <NavLink className="btn btn-outline-light me-2" onClick={() => setActiveComponent('Complaint')}>Complaint</NavLink>
            <NavLink className="btn btn-outline-light me-2" onClick={() => setActiveComponent('Status')}>Status</NavLink>
            <Button variant="danger" onClick={Logout}>Logout</Button>
          </div>
        </Container>
      </Navbar>
      <Container className="my-4">
        {activeComponent === 'Complaint' && <Complaint />}
        {activeComponent === 'Status' && <Status />}
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;