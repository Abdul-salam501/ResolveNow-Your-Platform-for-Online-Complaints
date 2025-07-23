import React from 'react';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';
import UserInfo from './UserInfo';
import Footer from '../common/FooterC';
import { Container, Nav, Navbar } from 'react-bootstrap';

const AdminHome = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="my-4">
        <AccordionAdmin />
        <hr />
        <AgentInfo />
        <hr />
        <UserInfo />
      </Container>
      <Footer />
    </>
  );
};

export default AdminHome;
