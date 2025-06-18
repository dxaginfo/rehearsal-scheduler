import axios from 'axios';
import { store } from '../redux/store';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle expired tokens here by refreshing token or logging out
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      // store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default instance;