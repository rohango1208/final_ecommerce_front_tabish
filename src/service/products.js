// services/product.js
import api from './api';

export const createProduct = async (productData) => {
  const res = await api.post('/products', productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // if auth required
    },
  });
  return res.data;
};

// get products
export const fetchAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const res = await api.put(`/products/${id}`, productData);
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};