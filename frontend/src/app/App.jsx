import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//* from components
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

//* from pages
import Home from '../pages/homepage/Home';
import Cart from '../pages/cart/Cart';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import UserDashBoard from '../pages/user/UserDashBoard';
import AdminDashBoard from '../pages/admin/AdminDashBoard';

//* from auth
import AdminRoute from '../auth/AdminRoutes';
import PrivateRoute from '../auth/PrivateRoutes';
// import { isAuthenticated } from '../auth';

// //* from context
import { MainProvider } from '../context/MainContext';

import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <MainProvider>
          <Route exact path='/' component={Home} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/user' component={UserDashBoard} />
          <AdminRoute exact path='/admin' component={AdminDashBoard} />
          <Redirect to='/' />
        </MainProvider>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
