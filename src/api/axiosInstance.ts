import axios from "axios";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_BACK_END_URL; // Sintaxe do Vite

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// requisições vão executar o código abaixo antes de serem enviadas
api.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("auth_token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config;
  },

  (error) => { Promise.reject(error); }

);


// pode ser configurado para response também, para tratar respostas de erro com base nos status

export default api;
