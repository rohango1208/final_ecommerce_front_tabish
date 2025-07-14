// service/wishlist.js
import api from './api';

// ✅ Get wishlist items for a user
export const getWishlistByUser = async (userId) => {
  const res = await api.get(`/wishlist/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};

// ✅ Add product to wishlist
export const addToWishlist = async (userId, productId) => {
  const res = await api.post(
    `/wishlist/${userId}`,
    { ProductID: productId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    }
  );
  return res.data;
};

// ✅ Remove product from wishlist
export const removeFromWishlist = async (userId, productId) => {
  const res = await api.delete(`/wishlist/${userId}/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
  return res.data;
};
