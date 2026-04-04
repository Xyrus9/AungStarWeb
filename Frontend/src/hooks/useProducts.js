import { useState, useEffect } from 'react';
import { adaptProducts } from '../services/productService.js';
import { getProducts } from '../services/api.js';

/**
 * Custom hook for managing product state
 * Centralizes product data fetching and state management
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts();
      setProducts(adaptProducts(data));
    } catch (err) {
      setError(err?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const toggleShowMore = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        String(product.id) === String(id)
          ? { ...product, showMore: !product.showMore }
          : product
      )
    );
  };

  const refreshProducts = async () => {
    await loadProducts();
  };

  return {
    products,
    loading,
    error,
    toggleShowMore,
    refreshProducts,
  };
};

export default useProducts;
