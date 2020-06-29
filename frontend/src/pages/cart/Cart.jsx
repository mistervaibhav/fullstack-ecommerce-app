import React, { useState, useEffect, useContext } from 'react';

import { loadItemsFromCart } from '../../helper';
import ProductCard from '../../components/product-card/ProductCard';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [cartItems, setCartItems] = useContext(CartContext);

  useEffect(() => {
    setProducts(loadItemsFromCart());
  }, [reload]);

  const loadProducts = () => {
    return (
      <div className='row'>
        {products.map((product, index) => (
          <ProductCard
            className='col-2'
            key={index}
            product={product}
            removeFromCart={true}
            addToCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>CHeckout here</h2>
      </div>
    );
  };

  return (
    <div className='container-fluid mx-3'>
      <div className='row'>
        <div className='col-9 '>
          <h2>Cart Items</h2>
          {loadProducts()}
        </div>
        <div className='col-3'>{loadCheckout()}</div>
      </div>
    </div>
  );
};

export default Cart;
