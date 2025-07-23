import React from 'react';

const FooterC = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', background: '#212529', color: 'white' }}>
      <p>ComplaintCare &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default FooterC;
