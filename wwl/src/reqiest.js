import api from './api';

// GET запрос
export const getData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Ошибка GET запроса:', error);
    throw error;
  }
};

// POST запрос
export const postData = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Ошибка POST запроса:', error);
    throw error;
  }
};

// PUT запрос
export const putData = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error('Ошибка PUT запроса:', error);
    throw error;
  }
};

// DELETE запрос
export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error('Ошибка DELETE запроса:', error);
    throw error;
  }
  
};
    