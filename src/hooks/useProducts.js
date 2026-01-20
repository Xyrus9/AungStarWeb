import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';

/**
 * Custom hook for managing product state
 * Centralizes product data fetching and state management
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      const result = await getAllProducts();
      
      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const toggleShowMore = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, showMore: !product.showMore }
          : product
      )
    );
  };

  const refreshProducts = async () => {
    setLoading(true);
    const result = await getAllProducts();
    if (result.success) {
      setProducts(result.data);
    }
    setLoading(false);
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
