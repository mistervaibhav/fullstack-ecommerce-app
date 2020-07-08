import React, { useState, useEffect, useContext } from 'react';

import { getCategories } from '../../helper';

import Hero from '../../components/hero/Hero';
import ProductSection from '../../components/product-section/ProductSection';

function HomePage() {
  const [categories, setCategories] = useState([]);

  const loadProducts = async () => {
    try {
      let categories = await getCategories();
      // console.log('loaded from db');
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div id='home'>
      <Hero />
      <div className='container' id='section-wrapper'>
        <div>
          {categories &&
            categories.map((category, index) => (
              <ProductSection key={index} id={index} category={category} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
