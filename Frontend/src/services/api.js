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

export const askAI = async (question) => {
  try {
    const response = await api.get('/ai/ask', {
      params: {
        question: question,
      },
      timeout: 30000, // 30-second timeout
    });

    const data = response.data;
    if (typeof data === 'string' && data.trim()) return data.trim();
    if (data && typeof data === 'object') {
      return data.answer || data.response || data.message || data.content || JSON.stringify(data);
    }
    return String(data || "I couldn't generate a response. Please try again.");
  } catch (error) {
    console.error("AI request failed:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);

    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (typeof error.response?.data === 'string' ? error.response.data : null) ||
      error.message ||
      "Sorry, I couldn't get a response right now. Please try again.";
    throw new Error(errorMsg);
  }
};

export const getMandiPrices = async ({
  commodity = "",
  state = "",
  district = "",
  market = "",
  limit = 50,
} = {}) => {
  const params = new URLSearchParams();

  if (commodity) params.append("commodity", commodity);
  if (state) params.append("state", state);
  if (district) params.append("district", district);
  if (market) params.append("market", market);

  params.append("limit", limit);

  const response = await api.get(`/mandi/prices?${params.toString()}`);

  return response.data;
};

export default api;