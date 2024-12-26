import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: parseInt(process.env.REACT_APP_TIMEOUT, 10) || 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await api.post(process.env.REACT_APP_REFRESH, {
            refreshToken,
          });
          const { accessToken } = response.data;
          localStorage.setItem("access_token", accessToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);  
        } catch (refreshError) {
          console.error("Ошибка при обновлении токена:", refreshError);

          window.location.href = "/";  
        }
      } else {
        window.location.href = "/";  
      }
    }

    return Promise.reject(error);
  }
);

export default api;
