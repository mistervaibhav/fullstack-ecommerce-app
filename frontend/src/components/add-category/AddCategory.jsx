import React, { useState } from 'react';

import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';

import { createCategory } from '../../pages/admin/helper';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const inputHandler = (event) => {
    //
    setError(false);
    setName(event.target.value);
    setSuccess(false);
  };

  const submitHandler = async (event) => {
    //
    event.preventDefault();
    setError('');
    let response = await createCategory(user._id, token, { name });

    if (response.category) {
      setError(false);
      setSuccess(true);
      setName(' ');
    }

    if (response.error) {
      setSuccess(false);
      setError(response.error);
    }
  };

  const successMessage = () => {
    //
    if (success) {
      return <h4 className='text-success'>Category created successfully</h4>;
    }
  };
  const warningMessage = () => {
    //
    if (error) {
      return <h4 className='text-danger'>Failed to creeate category : {error}</h4>;
    }
  };

  const goBack = () => (
    <Link to='/admin/dashboard' className='btn btn-outline-info my-2'>
      Close
    </Link>
  );

  const categoryForm = () => (
    <form>
      <div className='form-group'>
        <label htmlFor='name'>Enter the category</label>
        <input
          onChange={inputHandler}
          value={name}
          type='text'
          className='form-control'
          autoFocus
          required
        />
        <button onClick={submitHandler} className='btn btn-outline-info my-2'>
          Create category
        </button>
      </div>
    </form>
  );

  return (
    <div className='container bg-secondary p-4 text-dark'>
      <div className='row bg-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
