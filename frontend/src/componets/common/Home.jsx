import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
import Footer from './FooterC';
import Image1 from '../../Images/Image1.png';

const Home = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>ComplaintCare</Navbar.Brand>
          <div className="d-flex">
            <Link to="/signup" className="btn btn-outline-light me-2">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </Container>
      </Navbar>

      <Container className="d-flex align-items-center justify-content-between flex-wrap py-5">
        <div className="col-md-6 text-center text-md-start">
          <h1 className="mb-4">Empower Your Team, Exceed Expectations</h1>
          <p className="lead">Streamline issue resolution with our modern complaint management system.</p>
          <Link to="/login">
            <Button variant="success" className="mt-3">Register a Complaint</Button>
          </Link>
        </div>
        <div className="col-md-5">
          <img src={Image1} alt="ComplaintCare" className="img-fluid rounded" />
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
