import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "@/contexts/UserContext";
import api from "@/api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export const useSession = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // O carregamento inicial só acontece se NÃO houver um usuário no contexto.
  const [isSessionLoading, setIsSessionLoading] = useState(!user);

  // Efeito para redirecionar o usuário já logado para fora da tela de login.
  useEffect(() => {
    if (!isSessionLoading && user && location.pathname === "/") {
      navigate("/area-trabalho");
    }
  }, [isSessionLoading, user, location.pathname, navigate]);

  // Efeito principal para validar o token na primeira carga.
  useEffect(() => {
    // Se já temos um usuário no contexto, a sessão está validada.
    if (user) {
      if (isSessionLoading) setIsSessionLoading(false);
      return;
    }

    const validateToken = async () => {
      const token = Cookies.get("auth_token");
      
      if (!token) {
        setUser(null);
        setIsSessionLoading(false);
        return;
      }

      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error) {
        console.error("Token de sessão inválido, removendo cookie.");
        Cookies.remove("auth_token");
        setUser(null);
      } finally {
        setIsSessionLoading(false);
      }
    };

    validateToken();
    
  }, [user, setUser]); // Reage à mudança de 'user' (ex: no logout)

  return { isSessionLoading, user };
};
