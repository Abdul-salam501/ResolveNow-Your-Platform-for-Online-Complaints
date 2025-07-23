import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Collapse, Form, Alert } from 'react-bootstrap';
import Footer from '../common/FooterC';

const UserInfo = () => {
  const [userList, setUserList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateData, setUpdateData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/OrdinaryUsers')
      .then((res) => setUserList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggle = (id) => {
    setToggle(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:8000/user/${id}`, updateData);
      alert('User updated successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${id}`);
      setUserList(userList.filter(user => user._id !== id));
    }
  };

  return (
    <Container className="my-4">
      <h4 className="mb-3">User Records</h4>
      {userList.length ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleToggle(user._id)}>Update</Button>
                  <Collapse in={toggle[user._id] || false}>
                    <Form className="p-3" onSubmit={() => handleSubmit(user._id)}>
                      <Form.Group className="mb-2"><Form.Control placeholder="Name" name="name" value={updateData.name} onChange={handleChange} /></Form.Group>
                      <Form.Group className="mb-2"><Form.Control placeholder="Email" name="email" value={updateData.email} onChange={handleChange} /></Form.Group>
                      <Form.Group className="mb-2"><Form.Control placeholder="Phone" name="phone" value={updateData.phone} onChange={handleChange} /></Form.Group>
                      <Button size="sm" type="submit" variant="success">Save</Button>
                    </Form>
                  </Collapse>
                  <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : <Alert variant="info">No users found.</Alert>}
    </Container>
  );
};

export default UserInfo;