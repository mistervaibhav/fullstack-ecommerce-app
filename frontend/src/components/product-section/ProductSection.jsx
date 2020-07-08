import React, { useState, useEffect } from 'react';

import { getProductsByCategory } from '../../helper';

import ProductCard from '../product-card/ProductCard';

const ProductSection = ({ category }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      let products = await getProductsByCategory(category._id);
      //   console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className='product-section'>
      <h1 className='display-3 mt-3 text-white'>{category.name}</h1>
      <div className='row'>
        {products &&
          products.map((product, index) => (
            <ProductCard className='col-4' key={index} id={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductSection;
