import React, { useState, useEffect } from 'react';

import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';

import { getProductById, updateProduct, getCategories } from '../../helper';

const UpdateProduct = ({ match, history }) => {
  const [product, setProduct] = useState({
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
  const { productId } = match.params;
  const { name, description, price, stock, category, image } = product;

  useEffect(() => {
    const loadProduct = async (productId) => {
      try {
        let product = await getProductById(productId);
        let categories = await getCategories();
        // console.log(product);
        setCategories(categories);
        setProduct({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: product.image,
          category: product.category._id,
        });
        setFormData(new FormData());
      } catch (error) {
        setError(`Problem fetching the product : ${error}`);
        console.log(error);
      }
    };
    loadProduct(productId);
    // console.log(categories);
  }, []);

  const inputHandler = (name) => (event) => {
    const value = name === 'image' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setError(false);
    // todo : debug this shit here
    setProduct({ ...product, [name]: value });
    setSuccess(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log('submit handler clicked');
    setError('');
    let response = await updateProduct(productId, user._id, token, formData);
    console.log(response);
    if (response.error) {
      setSuccess(false);
      setError(response.error);
    } else {
      setError(false);
      setSuccess(true);
      setProduct({
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
      setTimeout(() => history.push('/admin/manage/products'), 1000);
      return <h4 className='text-success'>Product updated successfully</h4>;
    }
  };
  const warningMessage = () => {
    //
    if (error) {
      return <h4 className='text-danger'>Failed to update product : {error}</h4>;
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
        <select
          onChange={inputHandler('category')}
          className='form-control'
          defaultValue={category}
        >
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
        Update Product
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

export default UpdateProduct;
