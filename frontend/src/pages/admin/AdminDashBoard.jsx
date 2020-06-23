import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { isAuthenticated } from '../../auth';
import AdminRoute from '../../auth/AdminRoutes';

import AdminSideBar from '../../components/admin-side-bar/AdminSideBar';
import AddCategory from '../../components/add-category/AddCategory';

import './style.scss';

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  return (
    <div className='admin-dash-board'>
      <BrowserRouter>
        <AdminSideBar name={name} email={email} />
        <Switch>
          <AdminRoute exact path='/admin/create/category' component={AddCategory} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AdminDashBoard;
