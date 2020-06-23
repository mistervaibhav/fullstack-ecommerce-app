import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { isAuthenticated } from '../../auth';
import AdminRoute from '../../auth/AdminRoutes';

import AdminSideBar from '../../components/admin-side-bar/AdminSideBar';
import AddCategory from '../../components/add-category/AddCategory';
import AddProduct from '../../components/add-product/AddProduct';
import ManageCategories from '../../components/manage-categories/ManageCategories';
import ManageOrders from '../../components/manage-orders/ManageOrders';
import ManageProducts from '../../components/manage-products/ManageProducts';

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
          <AdminRoute exact path='/admin/create/product' component={AddProduct} />
          <AdminRoute exact path='/admin/manage/categories' component={ManageCategories} />
          <AdminRoute exact path='/admin/manage/products' component={ManageProducts} />
          <AdminRoute exact path='/admin/manage/orders' component={ManageOrders} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AdminDashBoard;
