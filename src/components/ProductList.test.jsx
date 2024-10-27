import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';

jest.mock('../hooks/useProducts');
jest.mock('../hooks/useCart');

describe('ProductList Component', () => {
  test('displays loading state initially', () => {
    useProducts.mockReturnValue({ products: [], loading: true, error: null });
    useCart.mockReturnValue({ addProductToCart: jest.fn() });
    render(<ProductList />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    useProducts.mockReturnValue({ products: [], loading: false, error: 'Failed to load products.' });
    useCart.mockReturnValue({ addProductToCart: jest.fn() });
    render(<ProductList />);
    expect(screen.getByText('Failed to load products.')).toBeInTheDocument();
  });

  test('displays products and allows adding to cart', async () => {
    const mockAddProductToCart = jest.fn();
    useProducts.mockReturnValue({
      products: [
        { id: 1, code: 'GR1', name: 'Green Tea', price: 3.11 },
        { id: 2, code: 'SR1', name: 'Strawberries', price: 5.00 }
      ],
      loading: false,
      error: null
    });
    useCart.mockReturnValue({ addProductToCart: mockAddProductToCart });

    render(<ProductList />);

    expect(screen.getByText('Green Tea')).toBeInTheDocument();
    expect(screen.getByText(/3.11€/)).toBeInTheDocument();
    expect(screen.getByText('Strawberries')).toBeInTheDocument();
    expect(screen.getByText(/5(.\d{0,2})?€/)).toBeInTheDocument();

    const addToCartButtons = screen.getAllByText('Add to cart');
    addToCartButtons[0].click();

    await waitFor(() => {
      expect(mockAddProductToCart).toHaveBeenCalledWith('GR1');
    });
  });
});
