import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Important for cookies/sessions
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra';
    return Promise.reject(new Error(errorMessage));
  }
);

export const authAPI = {
  signUp: async (userData) => {
    const { data } = await api.post('/auth/Sign_up', {
      email: userData.email,
      password: userData.password,
      name: userData.fullName
    });
    return data;
  },

  signIn: async (credentials) => {
    const { data } = await api.post('/auth/Sign_in', {
      email: credentials.email,
      password: credentials.password
    });
    return data;
  }
};

export default api;
