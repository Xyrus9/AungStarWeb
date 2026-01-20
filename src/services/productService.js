import { data as mockProducts, accessoryTypes, goldTypes, jewelryTypes } from '../data';

/**
 * Product Service - Backend-ready API abstraction layer
 * Replace these mock functions with real API calls when backend is ready
 */

const API_DELAY = 300; // Simulate network delay

// Helper to simulate async API calls
const simulateApiCall = (data, delay = API_DELAY) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

/**
 * Fetch all products
 * Future: GET /api/products
 */
export const getAllProducts = async () => {
  try {
    const products = await simulateApiCall([...mockProducts]);
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Fetch single product by ID
 * Future: GET /api/products/:id
 */
export const getProductById = async (id) => {
  try {
    const product = await simulateApiCall(
      mockProducts.find((p) => p.id === parseInt(id))
    );
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Filter products by category and/or accessory type
 * Future: GET /api/products?category=gold&type=ring
 */
export const filterProducts = async (filters = {}) => {
  try {
    let filtered = [...mockProducts];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.accessoriesType && filters.accessoriesType !== 'all') {
      filtered = filtered.filter((p) => p.accessoriesType === filters.accessoriesType);
    }

    if (filters.goldType) {
      filtered = filtered.filter((p) => p.goldType === filters.goldType);
    }

    if (filters.jewelryType) {
      filtered = filtered.filter((p) => p.jewelryType === filters.jewelryType);
    }

    const result = await simulateApiCall(filtered);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Create new product (Admin only)
 * Future: POST /api/products
 */
export const createProduct = async (productData) => {
  try {
    const newProduct = {
      id: mockProducts.length + 1,
      ...productData,
      showMore: false,
    };
    mockProducts.push(newProduct);
    await simulateApiCall(newProduct);
    return { success: true, data: newProduct };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update existing product (Admin only)
 * Future: PUT /api/products/:id
 */
export const updateProduct = async (id, updates) => {
  try {
    const index = mockProducts.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      return { success: false, error: 'Product not found' };
    }
    mockProducts[index] = { ...mockProducts[index], ...updates };
    await simulateApiCall(mockProducts[index]);
    return { success: true, data: mockProducts[index] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Delete product (Admin only)
 * Future: DELETE /api/products/:id
 */
export const deleteProduct = async (id) => {
  try {
    const index = mockProducts.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      return { success: false, error: 'Product not found' };
    }
    mockProducts.splice(index, 1);
    await simulateApiCall({ id });
    return { success: true, data: { id } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get metadata (types, categories, etc.)
 * Future: GET /api/metadata
 */
export const getMetadata = () => {
  return {
    accessoryTypes,
    goldTypes,
    jewelryTypes,
    categories: [
      { key: 'all', labelEn: 'All', labelMm: 'အားလုံး' },
      { key: 'gold', labelEn: 'Gold', labelMm: 'ရွှေထည်' },
      { key: 'jewelry', labelEn: 'Jewelry', labelMm: 'ကျောက်ထည်' },
      { key: 'diamond', labelEn: 'Diamonds', labelMm: 'စိန်ထည်' },
    ],
  };
};

export default {
  getAllProducts,
  getProductById,
  filterProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getMetadata,
};
