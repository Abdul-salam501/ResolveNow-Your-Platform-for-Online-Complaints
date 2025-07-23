import React from 'react';
import UserInfo from '../admin/UserInfo';
import Footer from '../common/FooterC';
import { Container, Navbar } from 'react-bootstrap';

const AgentHome = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Agent Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="my-4">
        <UserInfo />
      </Container>
      <Footer />
    </>
  );
};

export default AgentHome;