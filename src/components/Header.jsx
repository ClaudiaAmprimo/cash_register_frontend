// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar py-1 custom-navbar navbar-expand-lg">
      <div className="container d-flex">
        <Link className="navbar-brand" to="/">
          AMENITIZ
        </Link>

        <div className="d-flex flex-row order-lg-last align-items-center">
          <Link to="/cart" className="btn btn-outline-dark d-flex align-items-center">
            <FaShoppingCart className="me-2" />
            Cart
            <span className="badge bg-dark text-white ms-2 rounded-pill">{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
