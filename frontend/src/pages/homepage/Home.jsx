import React, { useState, useEffect, useContext } from 'react';

import { getProducts } from '../../helper';

import ProductCard from '../../components/product-card/ProductCard';

function HomePage() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      let products = await getProducts();
      // console.log('loaded from db');
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        {products.map((product, index) => (
          <div key={index} className='col-4'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
