import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getMessages = async () => {
  const response = await api.get("/messages");
  return response.data;
};

export default api;
