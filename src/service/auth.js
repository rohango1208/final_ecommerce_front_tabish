// services/auth.js
import api from './api';

export const register = async (formData) => {
  const res = await api.post('/users/register', formData); // fixed route
  return res.data;
};


export const login = async (credentials) => {
  const res = await api.post('/users/login', credentials);
  localStorage.setItem('token', res.data.token); // store JWT
  return res.data;
};

export const getMe = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};