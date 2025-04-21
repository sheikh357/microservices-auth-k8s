 
// services/userService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API requests with authentication
const authApiRequest = async (url, method = 'GET', data = null) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  console.log(`Making authenticated ${method} request to ${API_URL}${url}`);
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

// Get user profile
export const getUserProfile = async () => {
  return authApiRequest('/profile');
};

// Update user profile
export const updateUserProfile = async (userData) => {
  return authApiRequest('/profile', 'PUT', userData);
};