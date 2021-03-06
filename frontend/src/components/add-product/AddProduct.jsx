import React, { useState, useEffect } from 'react';

import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';

import { createProduct, getCategories } from '../../helper';

const AddProduct = () => {
  const [details, setDetails] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    category: '',
  });
  const [formData, setFormData] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();
  const { name, description, price, stock, category, image } = details;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        let categories = await getCategories();
        setCategories(categories);
        setFormData(new FormData());
      } catch (error) {
        setError(`Problem fetching the categories : ${error}`);
        console.log(error);
      }
    };
    loadCategories();
    // console.log(categories);
  }, []);

  const inputHandler = (name) => (event) => {
    const value = name === 'image' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setError(false);
    // todo : debug this shit here
    setDetails({ ...details, [name]: value });
    setSuccess(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log('submit handler clicked');
    setError('');
    let response = await createProduct(user._id, token, formData);

    // console.log(response);
    if (response.error) {
      setSuccess(false);
      setError(response.error);
    } else {
      setError(false);
      setSuccess(true);
      setDetails({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        category: '',
      });
    }
  };

  const successMessage = () => {
    //
    if (success) {
      return <h4 className='text-success'>Product created successfully</h4>;
    }
  };
  const warningMessage = () => {
    //
    if (error) {
      return <h4 className='text-danger'>Failed to create product : {error}</h4>;
    }
  };

  const goBack = () => (
    <Link to='/admin/dashboard' className='btn btn-outline-info my-2'>
      Close
    </Link>
  );

  const createProductForm = () => (
    <form>
      <span>Post photo</span>

      <div className='form-group'>
        <label className='btn btn-block btn-success'>
          Upload a file
          <input onChange={inputHandler('image')} type='file' name='image' accept='image' />
        </label>
      </div>

      <div className='form-group'>
        <input
          onChange={inputHandler('name')}
          name='photo'
          className='form-control'
          placeholder='Name'
          value={name}
        />
      </div>

      <div className='form-group'>
        <textarea
          onChange={inputHandler('description')}
          name='photo'
          className='form-control'
          placeholder='Description'
          value={description}
        />
      </div>

      <div className='form-group'>
        <input
          onChange={inputHandler('price')}
          type='number'
          className='form-control'
          placeholder='Price'
          value={price}
        />
      </div>

      <div className='form-group'>
        <select onChange={inputHandler('category')} className='form-control'>
          <option hidden>Select a category</option>
          {categories?.map((cat, index) => (
            <option key={index} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <input
          onChange={inputHandler('stock')}
          type='number'
          className='form-control'
          placeholder='Quantity'
          value={stock}
        />
      </div>

      <button type='submit' onClick={submitHandler} className='btn btn-outline-success'>
        Create Product
      </button>
    </form>
  );

  return (
    <div className='container bg-secondary p-4 text-dark'>
      <div className='row bg-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
          {goBack()}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
