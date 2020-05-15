import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';

const Register = () => {
  const registerForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Name</label>
              <input className='form-control' type='text' />
            </div>
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
    <Layout title='Signup here' description='A page for users to register themselves'>
      {registerForm()}
    </Layout>
  );
};

export default Register;
