import api from "./api";

// Функция для обработки ошибок
const handleApiError = (error) => {
  console.error("Ошибка API запроса:", error.response || error.message);
  throw error.response?.data || error; // Бросаем понятный объект ошибки
};

// GET запрос
export const getData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POST запрос
export const postData = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// PUT запрос
export const putData = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// DELETE запрос
export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
