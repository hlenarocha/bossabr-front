import axios from "axios";

// Obtendo a URL do back-end a partir das variáveis de ambiente
const url = import.meta.env.VITE_BACK_END_URL; // Sintaxe do Vite

// Recuperando o token CSRF do HTML
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

// Criando uma instância do axios com a configuração do back-end e CSRF
const api = axios.create({
  baseURL: url,
  headers: {
    'X-CSRF-TOKEN': csrfToken || '',  // Adicionando o CSRF token ao cabeçalho
  },
});

export default api;
