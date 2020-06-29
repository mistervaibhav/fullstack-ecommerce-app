import React, { useState, useEffect, useContext } from 'react';
import Image from '../image-wrapper/Image';
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../../helper';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product, addToCart = true, removeFromCart = false }) => {
  // const [redirect, setRedirect] = useState(false);

  const [cartItems, setCartItems] = useContext(CartContext);

  const { user } = isAuthenticated();

  const disabledForAdmin = isAuthenticated() && user.role === 1 ? `disabled` : null;

  const addToCartHandler = () => {
    addItemToCart(product);
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
          className={disabledForAdmin + ' btn btn-block btn-outline-success mt-2 mb-2'}
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
          onClick={() => {
            removeItemFromCart(product._id);
            // setReload(!reload);
          }}
          className={disabledForAdmin + ' btn btn-block btn-outline-danger mt-2 mb-2'}
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className='card text-white bg-dark border border-info '>
      <div className='card-header lead'> {product.name} </div>
      <div className='card-body'>
        {/* {performRedirect(redirect)} */}
        <Image product={product} />
        <p className='lead bg-success font-weight-normal text-wrap'>{product.description}</p>
        <p className='btn btn-success rounded  btn-sm px-4'>{product.price + ' $'}</p>
        <div className='row'>
          <div className='col-12'>{showAddToCart()}</div>
          <div className='col-12'>{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
