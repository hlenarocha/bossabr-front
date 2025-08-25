import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "@/contexts/UserContext";
import api from "@/api/axiosInstance";

export const useSession = () => {
  const { user, setUser } = useContext(UserContext);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    // Se já temos um usuário no contexto, a sessão está validada.
    if (user) {
      setIsSessionLoading(false);
      return;
    }

    const validateToken = async () => {
      const token = Cookies.get("auth_token");
      
      // Se não há token, limpa o usuário e encerra o carregamento.
      if (!token) {
        setUser(null);
        setIsSessionLoading(false);
        return;
      }

      // Se há token, tenta validar no backend.
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error) {
        console.error("Token de sessão inválido, removendo cookie.");
        Cookies.remove("auth_token");
        setUser(null); // Limpa o usuário em caso de erro.
      } finally {
        setIsSessionLoading(false);
      }
    };

    validateToken();
  }, [user, setUser]);

  return { isSessionLoading, user };
};
