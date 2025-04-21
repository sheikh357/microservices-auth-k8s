const API_URL = process.env.REACT_APP_API_URL || '/api';

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

  const response = await fetch(`${API_URL}${url}`, options);
  const result = await response.json();

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