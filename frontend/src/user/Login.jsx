import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Layout from '../core/Layout';

import { login, authenticate, isAuthenticated } from '../auth/helper';

const Login = () => {
  //

  const [formData, setFormData] = useState({
    email: 'chow@test.com',
    password: 'password',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = formData;
  const { user } = isAuthenticated();

  const inputHandler = (input) => async (event) => {
    await setFormData({
      ...formData,
      error: false,
      [input]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    //
    event.preventDefault();

    await setFormData({
      ...formData,
      error: false,
    });
    login({ email, password })
      .then((data) => {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setFormData({
              ...formData,
              didRedirect: true,
            });
          }).catch((error) => console.log('login failed'));
        }
      })
      .catch((error) => console.log('error in login'));
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
        {error}
      </div>
    );
  };

  const performRedirect = () => {
    // todo continue from here
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to admin dashboard</p>;
      } else {
        return <p>Redirect to user dashboard</p>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  const loginForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                id='email'
                name='email'
                value={email}
                onChange={inputHandler('email')}
                type='email'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                id='password'
                name='password'
                value={password}
                onChange={inputHandler('password')}
                type='password'
                className='form-control'
              />
            </div>
            <button onClick={submitHandler} className='btn btn-primary btn-block mt-5'>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Layout title='Login here' description='A page for users to Login themselves'>
      {loadingMessage()}
      {errorMessage()}
      {loginForm()}
      {performRedirect()}
      <p className='text-white text-center'> {JSON.stringify(formData)} </p>
    </Layout>
  );
};

export default Login;
