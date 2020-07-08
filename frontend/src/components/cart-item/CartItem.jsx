import React, { useContext } from 'react';
import { Fade } from 'react-reveal';

import { MainContext } from '../../context/MainContext';

import Image from '../image-wrapper/Image';

import './style.scss';

const CartItem = ({ item }) => {
  const [cartItems, setCartItems] = useContext(MainContext);

  const removeItemFromCartHandler = () => {
    let tempItems = [...cartItems];

    if (tempItems.indexOf(item) !== -1) {
      tempItems.splice(tempItems.indexOf(item), 1);
      setCartItems([...tempItems]);
    }
  };

  return (
    <Fade>
      <div className='card item-card'>
        <div className='left'>
          <div className='image-wrapper card-body'>
            <Image product={item} />
          </div>
        </div>
        <div className='right'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-9'>
                <h4 className='card-title'> {item.name} </h4>
                <p className='card-text'>{item.description}</p>
                <h5 className='card-text'>{item.price}</h5>
              </div>
              <div className='col-3 my-auto'>
                <button
                  className='float-right btn btn-outline-danger '
                  onClick={removeItemFromCartHandler}
                >
                  Remove Item <i class='fa fa-trash'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default CartItem;
