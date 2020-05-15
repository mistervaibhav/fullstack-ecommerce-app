import React from 'react';

import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className = 'bg-dark text-white p-4',
  children,
}) => {
  return (
    <div>
      <NavBar />
      <div className='container-fluid'>
        <div className='jumbotron bg-dark text-white text-center'>
          <h2 className='display-4'>{title} </h2>
          <p className='lead'>{description} </p>
        </div>
        <div className={className}> {children} </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
