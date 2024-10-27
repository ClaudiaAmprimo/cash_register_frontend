import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';
import useCart from '../hooks/useCart';

jest.mock('../hooks/useCart');

describe('Cart Component', () => {
  test('displays empty cart message when cart is empty', () => {
    useCart.mockReturnValue({ cartItems: [] });
    render(<Cart />);
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('displays items in cart', () => {
    useCart.mockReturnValue({
      cartItems: [
        { product_code: 'GR1', name: 'Green Tea', quantity: 2, total_price: 6.22 },
        { product_code: 'CF1', name: 'Coffee', quantity: 1, total_price: 11.23 }
      ]
    });
    render(<Cart />);

    expect(screen.getByText('Green Tea')).toBeInTheDocument();
    expect(screen.getByText('6.22€')).toBeInTheDocument();
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('11.23€')).toBeInTheDocument();
  });

  test('allows adding and removing products from cart', () => {
    const mockAddProductToCart = jest.fn();
    const mockRemoveProductFromCart = jest.fn();

    useCart.mockReturnValue({
      cartItems: [
        { product_code: 'GR1', name: 'Green Tea', quantity: 2, total_price: 6.22 }
      ],
      addProductToCart: mockAddProductToCart,
      removeProductFromCart: mockRemoveProductFromCart
    });

    render(<Cart />);

    const [removeButton, addButton] = screen.getAllByRole('button');

    fireEvent.click(addButton);
    fireEvent.click(removeButton);

    expect(mockAddProductToCart).toHaveBeenCalledWith('GR1');
    expect(mockRemoveProductFromCart).toHaveBeenCalledWith('GR1');
  });

  test('calculates and displays total price', () => {
    useCart.mockReturnValue({
      cartItems: [
        { product_code: 'GR1', name: 'Green Tea', quantity: 2, total_price: 6.22 },
        { product_code: 'CF1', name: 'Coffee', quantity: 1, total_price: 11.23 }
      ]
    });

    render(<Cart />);
    expect(screen.getByText('17.45€')).toBeInTheDocument();
  });

});
