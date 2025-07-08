import { useGoogleLogin } from "@react-oauth/google";
import { getUserByAuthToken, sendJwt } from "@/api/oAuthRoutes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginButton from "@/components/login/LoginButton";
import Logo from "@/assets/images/mktflow_brand.svg";
import GoogleIcon from "@/assets/images/icon-google.png";
import LoadingScreen from "@/views/auth/LoadingScreen";
import Modal from "@/components/modal/Modal";
import IconSad from "@/assets/images/famicons_sad.png";

const LoginCard = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [unauthorizedEmail, setUnauthorizedEmail] = useState("nom");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        if (!access_token) {
          throw new Error("Access token não encontrado");
        }

        // 1. Envia o access_token para o backend e recebe JWT + dados do usuário
        const response = await sendJwt(access_token);

        // console.log(response);
        // console.log(response?.status);

        if (response?.status === 401) {
          console.log("STATUS401RESPONSE" + response);
           if(response.user?.email) {
             setUnauthorizedEmail(response.user.email);
           }
-          setIsModalErrorVisible(true);
          return;
        }

        if (response?.token && response.user) {
          setLoading(true);

          // 2. Armazena o token JWT em cookie (mais seguro que no contexto contra ataques CSRF/XSS)
          Cookies.set("auth_token", response.token, {
            expires: 5, // dias
            secure: true,
            sameSite: "strict",
          });

          // 3. Armazena dados não sensíveis no contexto do usuário
          setUser({
            id_pessoa: response.user.id_pessoa,
            first_name: response.user.first_name,
            email: response.user.email,
            role: response.user.role,
            url_avatar: response.user.url_avatar,
            tema: response.user.tema || false,
          });

          // 4. Redireciona e exibe tela de carregamento
          setTimeout(() => {
            setLoading(false); // Reseta loading state
            navigate("/area-trabalho");
          }, 2000);
        }
      } catch (error) {
        console.error("Erro no login:", error);
        // Mostrar feedback para o usuário (ex.: toast.error)
      }
    },
    scope: "openid email profile",
  });

  // Restauração de sessão na página de login
  useEffect(() => {
    const token = Cookies.get("auth_token");
    // const userDataCookie = Cookies.get("user_data");

    if (token) {
      // Se existir um token E dados em cookies, restaura o contexto
      try {
        // const userData = JSON.parse(userDataCookie);
        // setUser(userData);
        getUserByAuthToken(token, setUser);
        setLoading(true);
        setTimeout(() => {
          setLoading(false); // Reseta loading state
          navigate("/workspace");
        }, 2000);
      } catch (e) {
        console.error("Erro ao analisar user_data:", e);
        Cookies.remove("auth_token");
        // Cookies.remove("user_data");
      }
    }
  }, [setUser]);

  return loading ? (
    <LoadingScreen></LoadingScreen>
  ) : (
    /* Responsive Design in Tailwind occurs through Breakpoints, which are defined in the tailwind.config.js file:
      sm (small): minimum width of 640px
      md (medium): minimum width of 768px
      lg (large): minimum width of 1024px
      xl (extra large): minimum width of 1280px
      2xl (2x extra large): minimum width of 1536px
  */
    <>
      <Modal
        title="Usuário não autorizado!"
        description={`Entre em contato com o administrador ${unauthorizedEmail} do sistema caso isso seja um erro.`}
        onClick1={() => setIsModalErrorVisible(false)}
        isModalVisible={isModalErrorVisible}
        buttonTitle1="FECHAR"
        iconImage={IconSad}

      ></Modal>

      <div className="w-[90%] max-w-[600px] flex  absolute flex-col justify-center items-center h-auto sm:h-[600px] bg-black/10 rounded-lg sm:rounded-full p-10 shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-[30px]">
        <img className="w-72 mb-8" src={Logo} alt="Logo MKTFlow" />
       
        <div className="w-full cursor-default max-w-[368px] h-[46px] text-white text-[32px] font-normal font-alatsi text-left">
          Login
        </div>
        {/* <LoginButton></LoginButton>  */}

        {/* <LoginInput placeholder="E-mail"></LoginInput>
        <LoginInput placeholder="Senha"></LoginInput>
        <div className="w-full max-w-[368px] mt-[10px] h-[19px] text-right text-white text-base font-normal font-alatsi underline hover:cursor-pointer hover:opacity-70">
          Esqueci minha senha!
        </div>
        {/* <div className="w-full max-w-[371px] mt-[20px] h-[1px] bg-white"></div> */}
        <div
          onClick={() => login()}
          className="w-full max-w-[371px] h-[38px] hover:border-[4px] hover:border-[#F8BB49] hover:cursor-pointer flex items-center justify-center bg-[#ffffff] rounded-[10px] shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)] mt-5 placeholder-gray-500 transform hover:scale-100"
        >
          <div className="bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center mr-[10px]">
            <img src={GoogleIcon} alt="Google" />
          </div>
          <div className="text-[#000000] font-alatsi font-[500]">
            Continuar com o Google
          </div>
        </div>
        <div className="w-full max-w-[368px] mt-8 h-[19px] text-center text-white text-base font-normal font-alatsi underline hover:cursor-pointer hover:opacity-70">
          Ainda não tenho acesso ao sistema!
        </div>
      </div>
    </>
  );
};

export default LoginCard;
