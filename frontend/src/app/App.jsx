import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//* from components
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

//* from pages
import Home from '../pages/homepage/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import UserDashBoard from '../pages/user/UserDashBoard';
import AdminDashBoard from '../pages/admin/AdminDashBoard';

//* from auth
import AdminRoute from '../auth/AdminRoutes';
import PrivateRoute from '../auth/PrivateRoutes';
// //* from admin
// import AddCategory from './admin/AddCategory';

import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/user/dashboard' component={UserDashBoard} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashBoard} />
        {/* <AdminRoute exact path='/admin/dashboard' component={AdminDashBoard} />
        <AdminRoute exact path='/admin/create/category' component={AddCategory} /> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
