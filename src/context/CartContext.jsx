// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addProduct = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeProduct = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product_code !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
