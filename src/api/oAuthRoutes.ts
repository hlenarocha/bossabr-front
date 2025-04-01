import api from "@/api//axiosInstance";
import UserData from "@/interfaces/UserInterface";
import Cookies from "js-cookie";

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

const getUserByAuthToken = async (authToken: string, setUser: (user: UserData | null) => void) => {

  try {
    const response = await api.get<UserData>("/user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response) throw new Error("Não foi possível obter o usuário");

    const userData = response.data;
    console.log(userData);
    setUser(userData);


  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    // Removendo dados do usuário caso haja erro 
    Cookies.remove("auth_token")
    setUser(null);
  }
}

export { sendJwt, type AuthResponse, getUserByAuthToken };