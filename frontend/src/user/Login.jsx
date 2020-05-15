import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';

const Login = () => {
  const loginForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input className='form-control' type='email' />
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input className='form-control' type='password' />
            </div>
            <button className='btn btn-primary btn-block mt-5'>Register</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Layout title='Login here' description='A page for users to Login themselves'>
      {loginForm()}
    </Layout>
  );
};

export default Login;
