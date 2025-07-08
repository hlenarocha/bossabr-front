import { useGoogleLogin } from "@react-oauth/google";
import { sendJwt } from "@/api/oAuthRoutes";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserInterface from "@/interfaces/UserInterface";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [unauthorizedEmail, setUnauthorizedEmail] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const { access_token } = tokenResponse;
        if (!access_token) throw new Error("Access token não encontrado");

        const googleUserInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (!googleUserInfoResponse.ok) throw new Error("Erro ao obter informações do usuário do Google");
        
        const googleUserInfo = await googleUserInfoResponse.json();
        setUnauthorizedEmail(googleUserInfo.email);

        const response = await sendJwt(access_token);
        
        if (response?.status === 401) {
          setIsModalErrorVisible(true);
          setLoading(false);
          return;
        }

        if (response?.token && response.user) {
          Cookies.set("auth_token", response.token, { expires: 5, secure: true, sameSite: "strict" });
          setUser(response.user as UserInterface);
          navigate("/area-trabalho");
        }
      } catch (error) {
        console.error("Erro no login:", error);
        alert("Falha no processo de login. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    scope: "openid email profile",
  });

  return { 
    login, 
    loading, 
    isModalErrorVisible, 
    setIsModalErrorVisible, 
    unauthorizedEmail,
  };
};