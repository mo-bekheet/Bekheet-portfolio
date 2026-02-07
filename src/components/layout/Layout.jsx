// Layout component
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar'; // We'll create this next
import Footer from './Footer'; // We'll create this next

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;