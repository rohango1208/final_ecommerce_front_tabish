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
  return response.data.map((product) => ({
    ...product,
    images: [product.imageURL],  // Ensure images is always an array
  }));
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


export const fetchProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  const product = res.data;
  return {
    ...product,
    images: [product.imageURL], // Ensure images is always an array
  };
};
