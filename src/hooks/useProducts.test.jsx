import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import axios from 'axios';

jest.mock('axios');

const mockProducts = [
  { id: 1, code: 'GR1', name: 'Green Tea', price: 3.11 },
  { id: 2, code: 'SR1', name: 'Strawberries', price: 5.00 },
  { id: 3, code: 'CF1', name: 'Coffee', price: 11.23 }
];

describe('useProducts Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch and return products correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  test('should handle errors when fetching products', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Failed to load products.');
  });
});
