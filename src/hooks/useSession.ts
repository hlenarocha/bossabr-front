import { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import { getUserByAuthToken } from "@/api/oAuthRoutes";

export const useSession = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    const token = Cookies.get("auth_token");
    if (token) {
      getUserByAuthToken(token, setUser)
        .then(() => {
          navigate("/area-trabalho");
        })
        .catch(() => {
          Cookies.remove("auth_token");
        });
    }
  }, []); 
};