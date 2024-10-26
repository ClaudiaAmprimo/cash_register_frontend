// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/header';
import { CartContext } from '../context/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header Component', () => {
  test('show the total quantity of products when cart is empty', () => {
    const cartItems = [];

    render(
      <CartContext.Provider value={{ cartItems }}>
        <Router>
          <Header />
        </Router>
      </CartContext.Provider>
    );

    const cartBadge = screen.getByText('0');
    expect(cartBadge).toBeInTheDocument();
  });

  test('show the total quantity of various products', () => {
    const cartItems = [
      { product_code: 'GR1', quantity: 2 },
      { product_code: 'CF1', quantity: 3 }
    ];

    render(
      <CartContext.Provider value={{ cartItems }}>
        <Router>
          <Header />
        </Router>
      </CartContext.Provider>
    );

    const cartBadge = screen.getByText('5');
    expect(cartBadge).toBeInTheDocument();
  });
});
