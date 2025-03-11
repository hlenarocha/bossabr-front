import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL; // Sintaxe do Vite

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
