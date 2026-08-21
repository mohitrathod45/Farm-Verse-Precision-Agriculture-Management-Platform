import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Helper to extract clean error message
  const extractErrorMessage = (error, defaultMsg) => {
    if (error.response?.data) {
      if (typeof error.response.data === 'string') {
        return error.response.data;
      }
      if (error.response.data.message) {
        return error.response.data.message;
      }
    }
    return error.message || defaultMsg;
  };

  // Login function
  const login = async (email, password) => {
    try {
      const cleanEmail = email ? email.trim().toLowerCase() : '';
      const response = await api.post('/auth/login', { email: cleanEmail, password });
      
      const { token, fullName, role } = response.data || {};
      
      if (!token) {
        throw new Error('No authentication token received from server');
      }

      const userObj = {
        fullName: fullName || 'Farmer',
        email: cleanEmail,
        role: role || 'Farmer'
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('fullName', userObj.fullName);
      localStorage.setItem('role', userObj.role);
      
      setUser(userObj);
      toast.success(`Welcome back, ${userObj.fullName}!`);
      return { success: true, user: userObj };
    } catch (error) {
      const message = extractErrorMessage(error, 'Login failed. Please check your credentials.');
      toast.error(message);
      return { success: false, message };
    }
  };

  // Register function
  const register = async (userData) => {
  try {
    const cleanUserData = {
      ...userData,
      email: userData.email
        ? userData.email.trim().toLowerCase()
        : ''
    };

    const response = await api.post('/auth/register', cleanUserData);

    if (
      typeof response.data === 'string' &&
      response.data.toLowerCase().includes('already exists')
    ) {
      throw new Error(response.data);
    }

    toast.success(
      'Registration successful! OTP has been sent to your email.'
    );

    return {
      success: true,
      data: response.data,
      email: cleanUserData.email
    };

  } catch (error) {
    const message = extractErrorMessage(
      error,
      'Registration failed. Please try again.'
    );

    toast.error(message);

    return {
      success: false,
      message
    };
  }
};

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isFarmer: user?.role === 'Farmer',
    isAdmin: user?.role === 'Admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};