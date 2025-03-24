import api from "./axiosInstance";
import UserData from "../interfaces/UserInterface";

interface AuthResponse {
  token: string;
  user: UserData;
}

const sendJwt = async (accessToken: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await api.post<AuthResponse>("/auth/callback", { token: accessToken });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar token para o back-end: ", error);
    return undefined;
  }
}

// const getJWTToken = async (token: string) => {
//   try {
//     const response = await api.get("/auth/callback", { params: { token } });
//     return response.data;
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

export { sendJwt, type AuthResponse };