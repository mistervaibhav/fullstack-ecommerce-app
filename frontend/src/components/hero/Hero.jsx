import React from 'react';

import FallingArrow from '../falling-arrow/FallingArrow';
import './style.scss';

const Hero = () => {
  return (
    <div id='hero' className='jumbotron-fluid shadow'>
      <div id='hero-carousel' className='carousel slide' data-interval='2500' data-ride='carousel'>
        <ol class='carousel-indicators'>
          <li data-target='#hero-carousel' data-slide-to='0' class='active'></li>
          <li data-target='#hero-carousel' data-slide-to='1'></li>
          <li data-target='#hero-carousel' data-slide-to='2'></li>
        </ol>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img
              className='carousel-img'
              src='https://images.unsplash.com/photo-1536593998369-f0d25ed0fb1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            />
          </div>
          <div className='carousel-item'>
            <img
              className='carousel-img'
              src='https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            />
          </div>
          <div className='carousel-item'>
            <img
              className='carousel-img'
              src='https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            />
          </div>
        </div>
      </div>
      <FallingArrow />
    </div>
  );
};

export default Hero;
