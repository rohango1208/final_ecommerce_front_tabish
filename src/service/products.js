// services/product.js
import api from './api';

// Create product
export const createProduct = async (productData) => {
  const res = await api.post('/products', productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};

// Get all products
export const fetchAllProducts = async (categoryId) => {
  const url = categoryId ? `/products/detailed?categoryId=${categoryId}` : "/products/detailed";
  const response = await api.get(url);
  return response.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const res = await api.put(`/products/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};


// Get products with category
// export const fetchProductsWithCategory = async () => {
//   const res = await api.get('/products/detailed');
//   return res.data;
// };