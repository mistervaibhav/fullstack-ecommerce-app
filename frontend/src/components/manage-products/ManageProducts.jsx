import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import { getProducts, deleteProduct } from '../../helper';

const ManageProducts = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      let products = await getProducts();
      setProducts(products);
      // console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteThisProduct = async (productId) => {
    await deleteProduct(productId, user._id, token);
    await loadProducts();
  };

  return (
    <div className='container bg-secondary p-4 text-dark'>
      <div className='row bg-white rounded'>
        <div className='col-md-8 offset-md-2'>
          <h2 className='mb-4'>All products:</h2>
          <Link className='btn btn-info' to={`/admin`}>
            <span className=''>Admin Home</span>
          </Link>
          <div className='row'>
            <div className='col-12'>
              <h2 className='text-center text-white my-3'>{`We have ${products.size} products`}</h2>

              {products.map((product, index) => (
                <div key={index} className='row text-center mb-2 '>
                  <div className='col-4'>
                    <h3 className='text-dark text-left'>{`${product.name}`}</h3>
                  </div>
                  <div className='col-4'>
                    <Link className='btn btn-success' to={`/admin/update/products/${product._id}`}>
                      <span className=''>Update</span>
                    </Link>
                  </div>
                  <div className='col-4'>
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
                      }}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
