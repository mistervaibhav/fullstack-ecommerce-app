import React, { useState, createContext } from 'react';

export const MainContext = createContext();

export const MainProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <MainContext.Provider value={[cartItems, setCartItems]}>{props.children}</MainContext.Provider>
  );
};
