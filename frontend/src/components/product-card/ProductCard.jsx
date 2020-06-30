import React, { useState, useEffect, useContext } from 'react';
import Image from '../image-wrapper/Image';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';
// import { addItemToCart, removeItemFromCart } from '../../helper';
import { CartContext } from '../../context/CartContext';

import './style.scss';

const ProductCard = ({ product, addToCart = true, removeFromCart = false }) => {
  // const [redirect, setRedirect] = useState(false);

  const [cartItems, setCartItems] = useContext(CartContext);

  const { user } = isAuthenticated();

  const disabledForAdmin = isAuthenticated() && user.role === 1 ? `disabled` : null;

  const addToCartHandler = () => {
    if (!isAuthenticated()) {
      // console.log('add cart hanler called');
      return <Redirect to='/login' />;
    }
    setCartItems([...cartItems, product]);
  };

  const removeItemFromCartHandler = () => {
    let tempItems = [...cartItems];

    if (tempItems.indexOf(product) !== -1) {
      tempItems.splice(tempItems.indexOf(product), 1);
      setCartItems([...tempItems]);
    }
  };

  // const performRedirect = (redirect) => {
  //   if (redirect) {
  //     return <Redirect to='/cart' />;
  //   }
  // };

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

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={removeItemFromCartHandler}
          className={disabledForAdmin + ' btn btn-block btn-outline-danger'}
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className='card shadow'>
      <div className='card-header'>
        <h4 className='card-title'>{product.name}</h4>
      </div>
      <Image product={product} />
      <div className='card-body'>
        {/* {performRedirect(redirect)} */}
        <p className='card-subtitle mb-2'>{product.description}</p>
        <h5 className='card-text'>{'INR ' + product.price}</h5>
      </div>
      <div className='card-footer'>
        {showAddToCart()}
        {showRemoveFromCart()}
      </div>
    </div>
  );
};

export default ProductCard;
