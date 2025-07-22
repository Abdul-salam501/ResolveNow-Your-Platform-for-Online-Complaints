import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image1 from '../../Images/Image1.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from './FooterC';

const Home = () => {
   const [isDarkMode, setIsDarkMode] = useState(false);

   const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle('dark-mode');
      document.querySelector('.App')?.classList.toggle('dark-mode');
   };

   useEffect(() => {
      // Optional: load dark mode from localStorage if needed
      const savedMode = localStorage.getItem('darkMode') === 'true';
      if (savedMode) {
         setIsDarkMode(true);
         document.body.classList.add('dark-mode');
         document.querySelector('.App')?.classList.add('dark-mode');
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('darkMode', isDarkMode);
   }, [isDarkMode]);

   return (
      <>
         <Navbar style={{ backgroundColor: '#121212' }} variant="dark" className="header-bar">
            <Container>
               <Navbar.Brand>ComplaintCare</Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                     <Link to={'/'} className="nav-link text-light">Home</Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link to={'/signup'} className="nav-link text-light">SignUp</Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link to={'/login'} className="nav-link text-light">Login</Link>
                  </li>
               </ul>
            </Container>
         </Navbar>

         <div className="toggle-switch m-3">
            <label className="switch">
               <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
               <span className="slider round"></span>
            </label>
            <span className="mode-label">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
         </div>


         <Container className="home-container">
            <div className="left-side">
               <img src={Image1} alt="" />
            </div>
            <div className="right-side">
               <p>
                  <span className="f-letter">Empower Your Team,</span><br />
                  <span className="s-letter">Exceed Customer Expectations: Discover our</span><br />
                  <span className="t-letter">Complaint Management Solution</span><br />
                  <Link to={'/Login'}>
                     <Button className="mt-3 register">Register your Compliant</Button>
                  </Link>
               </p>
            </div>
         </Container>

         <Footer />
      </>
   );
};

export default Home;
