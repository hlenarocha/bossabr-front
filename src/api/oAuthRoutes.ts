import api from "@/api//axiosInstance";
import UserData from "@/interfaces/UserInterface";

interface AuthResponse {
  status?: number;
  token: string;
  user: UserData;
}

const sendJwt = async (accessToken: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await api.post<AuthResponse>("/auth/callback", { token: accessToken });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        return { status: 401, token: "", user: {} as UserData };
      }
      console.error("Erro no login ao enviar JWT:", error.response.data);
    } else {
      console.error("Erro inesperado ao enviar JWT:", error);
    }
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