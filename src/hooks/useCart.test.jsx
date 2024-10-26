import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import useCart from './useCart';
import { CartProvider } from '../context/CartContext';

jest.mock('axios');

describe('useCart Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add product to cart successfully', async () => {
    const updatedCart = [{ id: 'CF1', name: 'Coffee', price: 11.23, quantity: 1 }];

    axios.post.mockResolvedValueOnce({ data: { items: updatedCart } });
    axios.get.mockResolvedValueOnce({ data: { items: [] } });

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    await act(async () => {
      result.current.addProductToCart('CF1');
    });

    expect(result.current.cartItems).toEqual(updatedCart);
  });

  test('should remove product from cart successfully', async () => {
    const updatedCart = [{ id: 'GR1', name: 'Green Tea', price: 3.11, quantity: 2 }];

    axios.delete.mockResolvedValueOnce({ data: { items: updatedCart } });
    axios.get.mockResolvedValueOnce({ data: { items: [] } });

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    await act(async () => {
      result.current.removeProductFromCart('GR1');
    });

    expect(result.current.cartItems).toEqual(updatedCart);
  });
});
