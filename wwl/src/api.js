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
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) {
      localStorage.clear("access_token");
      const currentPath = window.location.pathname;
      if (currentPath !== "/" && currentPath !== "/register") {
        window.location.href = "/";
      }
    }
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token) {
        try {
          const response = await api.post(process.env.REACT_APP_REFRESH, {
            refresh_token,
          });

          const { access_token } = response.data;

          localStorage.setItem("access_token", access_token);

          // Обновляем токен в заголовках и повторяем запрос
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка при обновлении токена:", refreshError);

          const currentPath = window.location.pathname;
          if (currentPath !== "/" && currentPath !== "/register") {
            window.location.href = "/";
          }
        }
      } else {
        const currentPath = window.location.pathname;
        if (currentPath !== "/" && currentPath !== "/register") {
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
