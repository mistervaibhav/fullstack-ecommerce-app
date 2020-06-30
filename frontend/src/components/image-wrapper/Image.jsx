import React from 'react';

const Image = ({ product }) => {
  const src = product
    ? `/api/products/assets/${product._id}`
    : `http://contrapunto.cr/images/rocketlauncher/pages/offline-page/img-01.jpg`;

  // console.log(src);

  return <img src={src} alt='photo' className='img-fluid' />;
};

export default Image;
