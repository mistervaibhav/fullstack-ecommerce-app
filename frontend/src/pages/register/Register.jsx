import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { register } from '../../auth';

const Register = () => {
  //

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = formData;

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
    register({ name, email, password })
      .then((data) => {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            success: false,
          });
        } else {
          setFormData({
            ...formData,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch((error) => console.log('error in register'));
  };

  const successMessage = () => {
    return (
      <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
        New account was succesfully created .<Link to='login'>Please login here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
        {error}
      </div>
    );
  };

  const registerForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          {successMessage()}
          {errorMessage()}
          <form>
            <div className='form-group'>
              <label className='text-light'>Name</label>
              <input
                className='form-control'
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={inputHandler('name')}
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                className='form-control'
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={inputHandler('email')}
              />
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                className='form-control'
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={inputHandler('password')}
              />
            </div>
            <button onClick={submitHandler} className='btn btn-primary btn-block mt-5'>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };

  return <div>{registerForm()}</div>;
};

export default Register;
