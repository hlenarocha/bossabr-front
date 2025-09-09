import api from "@/api//axiosInstance";
import UserData from "@/interfaces/UserInterface";
import Cookies from "js-cookie";

interface AuthResponse {
  status?: number;
  token: string;
  user: UserData;
}

const sendJwt = async (accessToken: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      "/auth/callback",
      { token: accessToken },
      { 
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || status === 401;
        },
      }
    );
    
    return { status: response.status, ...response.data };

  } catch (error: any) {
    console.error("Erro inesperado na chamada 'sendJwt':", error.message);
    throw error; 
  }
};


const getUserByAuthToken = async (authToken: string, setUser: (user: UserData | null) => void) => {

  try {
    const response = await api.get<UserData>("/user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response) throw new Error("Não foi possível obter o usuário");

    const userData = response.data;
    // console.log(userData);
    setUser(userData);


  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    // Removendo dados do usuário caso haja erro 
    Cookies.remove("auth_token")
    setUser(null);
  }
}

export const requestAccess = async (email: string, type: 'unauthorized' | 'new_request') => {
  try {
    // Faz a chamada POST para a rota que criamos no Laravel
    const response = await api.post('/request-access', {
      email, 
      type,  
    });
    return response.data; // Retorna a resposta do backend (ex: { message: '...' })
  } catch (error: any) {
    // Se o axios der erro (ex: 4xx, 5xx), ele cairá aqui.
    // Lançamos o erro para que o componente que chamou a função possa tratá-lo.
    console.error("Erro na chamada da API para solicitar acesso:", error.response?.data || error.message);
    throw error;
  }
};


export { sendJwt, type AuthResponse, getUserByAuthToken };


