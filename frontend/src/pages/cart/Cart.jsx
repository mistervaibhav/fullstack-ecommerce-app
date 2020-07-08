import React, { useState, useEffect, useContext } from 'react';

import CartItem from '../../components/cart-item/CartItem';
import { MainContext } from '../../context/MainContext';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useContext(MainContext);

  // console.log(cartItems);

  useEffect(() => {
    setProducts(cartItems);
  }, [cartItems]);

  return (
    <div className='container-fluid'>
      <h2>Cart Items</h2>
      <div className='container'>
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
