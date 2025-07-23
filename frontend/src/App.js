import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/common/Login';
import SignUp from './components/common/SignUp';
import Home from './components/common/Home';
import AdminHome from './components/admin/AdminHome';
import HomePage from './components/user/UserHome';
import AgentHome from './components/agent/AgentHome';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AgentHome" element={<AgentHome />} />
      </Routes>
    </Router>
  );
}

export default App;