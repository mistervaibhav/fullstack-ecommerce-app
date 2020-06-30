import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { isAuthenticated, logout } from '../../auth';

const activeTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#888888' };
  } else {
    return { color: '#ffffff' };
  }
};

const Header = ({ history }) => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark  bg-dark shadow'>
      <Link className='navbar-brand' to='/'>
        <h2>Logo</h2>
      </Link>
      <button className='navbar-toggler' data-toggle='collapse' data-target='#navbarMenu'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarMenu'>
        <ul className='navbar-nav ml-auto'>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className='nav-item'>
              <Link style={activeTab(history, '/cart')} className='nav-link' to='/cart'>
                <h4>Cart</h4>
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className='nav-item'>
              <Link
                style={activeTab(history, '/user/dashboard')}
                className='nav-link'
                to='/user/dashboard'
              >
                <h4>U. dashboard</h4>
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className='nav-item'>
              <Link style={activeTab(history, '/admin')} className='nav-link' to='/admin'>
                <h4>A. dashboard</h4>
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <Fragment>
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
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className='nav-item'>
              <span
                style={{ cursor: 'pointer' }}
                className='nav-link text-warning'
                onClick={() => {
                  logout(() => {
                    history.push('/');
                  });
                }}
              >
                <h4>Logout</h4>
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
