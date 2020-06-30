import React from 'react';

const Image = ({ product }) => {
  const src = product
    ? `/api/products/assets/${product._id}`
    : `http://contrapunto.cr/images/rocketlauncher/pages/offline-page/img-01.jpg`;

  // console.log(src);

  return (
    <div className='rounded border border-success p-2'>
      <img
        src={src}
        alt='photo'
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        className='mb-3 rounded'
      />
    </div>
  );
};

export default Image;
