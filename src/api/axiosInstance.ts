import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL; // Sintaxe do Vite

const api = axios.create({
  baseURL: url,
});

export default api;