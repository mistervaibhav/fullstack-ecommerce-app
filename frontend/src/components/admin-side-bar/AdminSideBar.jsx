import React from 'react';
import { Link } from 'react-router-dom';

const AdminSideBar = ({ name, email }) => {
  return (
    <div>
      <div className='card'>
        <h4 className='card-header'>Admin Info</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span className='badge badge-info mr-2'>Name:</span> {name}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-info mr-2'>Email:</span> {email}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-danger mr-2'>Admin with privilages</span>
          </li>
        </ul>
      </div>
      <div className='card'>
        <h4 className='card-header bg-dark text-white'>Admin Navigation</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/admin/create/category' className='nav-link'>
              Create Categories
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/create/product' className='nav-link'>
              Create Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/orders' className='nav-link'>
              Manage Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/products' className='nav-link'>
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
