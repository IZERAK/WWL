import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: parseInt(process.env.REACT_APP_TIMEOUT, 10) || 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
