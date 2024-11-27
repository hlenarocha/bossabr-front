import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL; // Sintaxe do Vite

const api = axios.create({
  baseURL: url,
});

export const getTestMessage = async () => {
  const response = await api.get("/hello");
  return response.data;
}



export const getTestSelect = async () => {
  const response = await api.get("/teste");
  return response.data.servicosMarketing;
}


export const postNameInput = async (name: string) => {
  const response = await api.post("/test-post", { name });
  return response.data;
}