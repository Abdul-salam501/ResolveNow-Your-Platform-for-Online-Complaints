import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userComplaint, setUserComplaint] = useState({
    userId: user?._id,
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      userId: user?._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/Complaint/${user._id}`, userComplaint);
      alert('Your complaint has been submitted.');
      handleClear();
    } catch (err) {
      alert('Something went wrong.');
    }
  };

  return (
    <Card className="p-4 shadow">
      <h4 className="mb-4">Register Complaint</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control name="name" value={userComplaint.name} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Address</Form.Label><Form.Control name="address" value={userComplaint.address} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>City</Form.Label><Form.Control name="city" value={userComplaint.city} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>State</Form.Label><Form.Control name="state" value={userComplaint.state} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Pincode</Form.Label><Form.Control name="pincode" value={userComplaint.pincode} onChange={handleChange} required /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Status</Form.Label><Form.Control name="status" value={userComplaint.status} onChange={handleChange} placeholder="e.g., Pending" required /></Form.Group></Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="comment" value={userComplaint.comment} onChange={handleChange} required />
        </Form.Group>
        <div className="text-end">
          <Button variant="success" type="submit">Submit</Button>
        </div>
      </Form>
    </Card>
  );
};

export default Complaint;