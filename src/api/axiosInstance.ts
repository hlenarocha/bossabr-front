import axios from "axios";

// Obtendo a URL do back-end a partir das variáveis de ambiente
const url = import.meta.env.VITE_BACK_END_URL; // Sintaxe do Vite

// Criando uma instância do axios com a configuração do back-end e CSRF
const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
