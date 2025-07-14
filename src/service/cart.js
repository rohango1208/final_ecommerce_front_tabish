import api from './api';

// ✅ Get cart for a user
export const getCartByUser = async (userId) => {
  const res = await api.get(`/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};

// ✅ Add product to cart
export const addToCart = async (userId, productData) => {
  const res = await api.post(`/cart/${userId}`, productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};

// ✅ Update product quantity in cart
export const updateCartItem = async (userId, productId, quantity) => {
  const res = await api.put(`/cart/${userId}/${productId}`, { quantity }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};

// ✅ Remove product from cart
export const removeFromCart = async (userId, productId) => {
  const res = await api.delete(`/cart/${userId}/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};
