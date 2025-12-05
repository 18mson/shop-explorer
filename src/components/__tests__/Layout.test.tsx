import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Layout from '../Layout';
import { CartProvider } from '../../context/CartContext';

// Mock the useCart hook
vi.mock('../../context/useCart', () => ({
  useCart: () => ({
    getTotalItems: () => 3,
    items: [],
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    getTotalPrice: vi.fn(),
  }),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the header with Shop Explorer title', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Layout />
        </CartProvider>
      </BrowserRouter>
    );

    const title = screen.getByText('Shop Explorer');
    expect(title).toBeInTheDocument();
  });

  it('should display cart item count badge when items > 0', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Layout />
        </CartProvider>
      </BrowserRouter>
    );

    const badge = screen.getByText('3');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-500');
  });

  it('should render the main outlet container', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Layout />
        </CartProvider>
      </BrowserRouter>
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('container', 'mx-auto', 'px-4', 'py-8');
  });

  it('should have Store icon in header', () => {
    const { container } = render(
      <BrowserRouter>
        <CartProvider>
          <Layout />
        </CartProvider>
      </BrowserRouter>
    );

    // Check that Store icon SVG is present in header
    const header = container.querySelector('header');
    expect(header).toBeTruthy();
    expect(header?.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('should have shopping cart icon', () => {
    const { container } = render(
      <BrowserRouter>
        <CartProvider>
          <Layout />
        </CartProvider>
      </BrowserRouter>
    );

    // Check that ShoppingCart icon SVG is present
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2); // Store + ShoppingCart
  });

  it('should have correct header styling classes', () => {
    const { container } = render(
      <BrowserRouter>
        <CartProvider>
          <Layout />
        </CartProvider>
      </BrowserRouter>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-vintage-dark', 'text-white', 'shadow-md');
  });
});
