import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { login, authenticate, isAuthenticated } from '../../auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false,
  });
  // ! for testing only
  // const [formData, setFormData] = useState({
  //   email: 'chow@test.com',
  //   password: 'password',
  //   error: '',
  //   loading: false,
  //   didRedirect: false,
  // });

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

    const response = await login({ email, password });

    const { data, status } = response;

    // console.log(data);

    if (status === 200) {
      // console.log(status);
      authenticate(data);
      setFormData({
        ...formData,
        didRedirect: true,
      });
    } else {
      setFormData({
        ...formData,
        error: data.message,
        loading: false,
      });
    }
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
        return <Redirect to='/' />;
      } else {
        return <Redirect to='/' />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  const loginForm = () => {
    return (
      <div className='row p-5'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <h1 className='text-white'>Login to continue</h1>
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

  // console.log('Login rendered');

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      {loginForm()}
      {performRedirect()}
      {/* <p className='text-white text-center'> {JSON.stringify(formData)} </p> */}
    </div>
  );
};

export default Login;
