import { useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  axios.defaults.withCredentials = true;
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:3000/carts')
      .then(response => {
        setCartItems(response.data.items);
      })
      .catch(error => {
        console.error('Error al obtener el carrito:', error);
      });
  }, [setCartItems]);

  const addProductToCart = (productCode) => {
    axios.post('http://localhost:3000/carts/add_product', { product_code: productCode })
      .then(response => {
        console.log('Datos del carrito:', response.data);
        setCartItems(response.data.items);
      })
      .catch(error => {
        console.error('Error al agregar producto:', error);
      });
  };

  const removeProductFromCart = (productCode) => {
    axios.delete('http://localhost:3000/carts/remove_product', { product_code: productCode })
      .then(response => {
        setCartItems(response.data.items);
      })
      .catch(error => {
        console.error('Error al remover producto:', error);
      });
  };

  return { cartItems, addProductToCart, removeProductFromCart };
};

export default useCart;
