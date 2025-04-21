// services/authService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API requests
const apiRequest = async (url, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  // Add auth token to header if it exists and we're not logging in or registering
  const token = localStorage.getItem('token');
  if (token && !url.includes('login') && !url.includes('register')) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  console.log(`Making ${method} request to ${API_URL}${url}`);
  const response = await fetch(`${API_URL}${url}`, options);
  
  // Log response for debugging
  console.log(`Response status: ${response.status}`);
  
  const result = await response.json();
  console.log('Response data:', result);

  if (!response.ok) {
    throw new Error(result.error || 'Something went wrong');
  }

  return result;
};

// Login function
export const login = async (email, password) => {
  return apiRequest('/login', 'POST', { email, password });
};

// Register function
export const register = async (name, email, password) => {
  return apiRequest('/register', 'POST', { name, email, password });
};

// Forgot password function
export const forgotPassword = async (email) => {
  return apiRequest('/forgot-password', 'POST', { email });
};

// Reset password function
export const resetPassword = async (token, newPassword) => {
  return apiRequest('/reset-password', 'POST', { token, newPassword });
};