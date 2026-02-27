import axios from 'axios';
import router from '../router';
import { useAuthStore } from '../stores/auth';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      const authStore = useAuthStore();
      authStore.clearToken();

      if (router.currentRoute.value.path !== '/login') {
        await router.push('/login');
      }
    }

    return Promise.reject(error);
  },
);

export default http;
