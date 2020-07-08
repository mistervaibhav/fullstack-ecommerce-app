import React, { useContext } from 'react';
import { Zoom } from 'react-reveal';
import Image from '../image-wrapper/Image';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';

import './style.scss';

const ProductCard = ({ product, addToCart = true }) => {
  const [cartItems, setCartItems] = useContext(MainContext);

  const { user } = isAuthenticated();

  const disabledForAdmin = isAuthenticated() && user.role === 1 ? `disabled` : null;

  const addToCartHandler = () => {
    if (!isAuthenticated()) {
      return <Redirect to='/login' />;
    }
    setCartItems([...cartItems, product]);
  };

  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={addToCartHandler}
          className={disabledForAdmin + ' btn btn-block btn-outline-success'}
        >
          Add to Cart
        </button>
      )
    );
  };

  return (
    <Zoom>
      <div className='card shadow product-card'>
        <div className='card-header'>
          <h4 className='card-title'>{product.name}</h4>
        </div>
        <Image product={product} />
        <div className='card-body'>
          {/* {performRedirect(redirect)} */}
          <p className='card-subtitle mb-2'>{product.description}</p>
          <h5 className='card-text'>{'INR ' + product.price}</h5>
        </div>
        <div className='card-footer'>{showAddToCart()}</div>
      </div>
    </Zoom>
  );
};

export default ProductCard;
