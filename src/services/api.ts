import type { Product, Category } from '../types';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const api = {
  async getProducts(limit = 100, offset = 0): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return response.json();
  },

  async addToCart(productId: number): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (Math.random() > 0.95) {
      throw new Error(`${productId} Failed to add to cart`);
    }

    return { success: true };
  },
};
