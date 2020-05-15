import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const activeTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#888888' };
  } else {
    return { color: '#ffffff' };
  }
};

const NavBar = ({ history }) => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark  bg-dark'>
      <Link className='navbar-brand' to='/'>
        <h2>Logo</h2>
      </Link>
      <button className='navbar-toggler' data-toggle='collapse' data-target='#navbarMenu'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarMenu'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link style={activeTab(history, '/cart')} className='nav-link' to='/cart'>
              <h4>Cart</h4>
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              style={activeTab(history, '/user/dashboard')}
              className='nav-link'
              to='/user/dashboard'
            ></Link>
          </li>
          <li className='nav-item'>
            <Link
              style={activeTab(history, '/admin/dashboard')}
              className='nav-link'
              to='/admin/dashboard'
            >
              <h4>Admin</h4>
            </Link>
          </li>
          <li className='nav-item'>
            <Link style={activeTab(history, '/login')} className='nav-link' to='/login'>
              <h4>Login</h4>
            </Link>
          </li>
          <li className='nav-item'>
            <Link style={activeTab(history, '/register')} className='nav-link' to='/register'>
              <h4>Register</h4>
            </Link>
          </li>
          <li className='nav-item'>
            <Link style={activeTab(history, '/logout')} className='nav-link' to='/logout'>
              <h4>Logout</h4>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
