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
import { CartProvider } from '../context/CartContext';

import './style.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <CartProvider>
          <Route exact path='/' component={Home} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/user/dashboard' component={UserDashBoard} />
          <AdminRoute exact path='/admin' component={AdminDashBoard} />
          <Redirect to='/' />
        </CartProvider>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
