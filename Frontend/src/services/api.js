import axios from 'axios';

// Your Spring Boot backend URL
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles token expiration and forbidden responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const onLoginPage = window.location.pathname === '/login';
    if ((status === 401 || status === 403) && !onLoginPage) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('fullName');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;