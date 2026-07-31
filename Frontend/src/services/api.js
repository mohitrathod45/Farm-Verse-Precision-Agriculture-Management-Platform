import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every outgoing request only if valid token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null' && token.trim().length > 10) {
      const cleanToken = token.trim();
      const bearer = `Bearer ${cleanToken}`;
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', bearer);
      }
      config.headers.Authorization = bearer;
      config.headers['Authorization'] = bearer;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 Unauthorized gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;
      if (path !== '/login' && path !== '/register' && path !== '/') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('fullName');
        localStorage.removeItem('role');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;