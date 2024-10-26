import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  axios.defaults.withCredentials = true;
  const { cartItems, setCartItems } = useContext(CartContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/carts')
      .then(response => {
        setCartItems(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        setError('Could not load cart.');
      });
  }, [setCartItems]);

  const addProductToCart = (productCode) => {
    axios.post('http://localhost:3000/carts/add_product', { product_code: productCode })
      .then(response => {
        setCartItems(response.data.items);
      })
      .catch(error => {
        console.error('Error adding product:', error);
        setError('Could not add product to cart.');
      });
  };

  const removeProductFromCart = (productCode) => {
    axios.delete('http://localhost:3000/carts/remove_product', { data: { product_code: productCode } })
      .then(response => {
        setCartItems(response.data.items);
      })
      .catch(error => {
        console.error('Error removing product:', error);
        setError('Could not remove product from cart');
      });
  };

  return { cartItems, addProductToCart, removeProductFromCart, error };
};

export default useCart;
