import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL; // Sintaxe do Vite

const api = axios.create({
  baseURL: url,
});

const getTestMessage = async () => {
  const response = await api.get("/hello");
  return response.data;
}

export default getTestMessage;

