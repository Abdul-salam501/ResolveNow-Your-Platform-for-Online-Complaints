import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Collapse, Alert } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusComplaints, setStatusComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.get(`http://localhost:8000/status/${user._id}`)
      .then((res) => setStatusComplaints(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggle = (id) => {
    setToggle((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="d-flex flex-wrap gap-3">
      {statusComplaints.length ? statusComplaints.map((comp) => {
        const open = toggle[comp._id] || false;
        return (
          <Card key={comp._id} style={{ width: '20rem' }} className="shadow">
            <Card.Body>
              <Card.Title>{comp.name}</Card.Title>
              <Card.Text><strong>City:</strong> {comp.city}</Card.Text>
              <Card.Text><strong>State:</strong> {comp.state}</Card.Text>
              <Card.Text><strong>Status:</strong> {comp.status}</Card.Text>
              <Button variant="primary" onClick={() => handleToggle(comp._id)}>
                {open ? 'Hide' : 'Message'}
              </Button>
              <Collapse in={open} className="mt-3">
                <div>
                  <ChatWindow complaintId={comp._id} name={comp.name} />
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        );
      }) : (
        <Alert variant="info">No complaints found.</Alert>
      )}
    </div>
  );
};

export default Status;
