import { BASE_URL } from '../config/apiConfig.js';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const responseText = await response.text();
  const parseJsonSafely = (text) => {
    if (!text) return null;

    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const parsedBody = parseJsonSafely(responseText);

  if (!response.ok) {
    const errorText =
      parsedBody?.message ||
      (parsedBody ? JSON.stringify(parsedBody) : responseText);

    throw new Error(
      errorText || `Request failed: ${response.status} ${response.statusText}`
    );
  }

  return parsedBody ?? responseText;
}

export function getProducts() {
  return request('/products');
}

export function getProductById(id) {
  if (!id && id !== 0) {
    return Promise.reject(new Error('Product id is required'));
  }

  return request(`/products/${id}`);
}

export function getGoldPrices() {
  return request('/gold-prices');
}

const apiService = {
  getProducts,
  getProductById,
  getGoldPrices,
};

export default apiService;