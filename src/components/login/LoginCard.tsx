import Logo from "../../assets/images/logo-bossa.svg";
import GoogleIcon from "../../assets/images/icon-google.png";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { useGoogleLogin } from '@react-oauth/google';
import { sendJWTTOken } from "../../api/oAuthRoutes";

const LoginCard = () => {

  // mandando JWT Token da conta Google para o back-end
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse.access_token);
      const jwtToken = tokenResponse.access_token;
      if (jwtToken) {
        const response = await sendJWTTOken(jwtToken);
        console.log(response);
      }
    },
  });

  return (
    /* Responsive Design in Tailwind occcurs through Breakpoints, which are defined in the tailwind.config.js file:
        sm (small): minimum width of 640px
        md (medium): minimum width of 768px
        lg (large): minimum width of 1024px
        xl (extra large): minimum width of 1280px
        2xl (2x extra large): minimum width of 1536px
    */

 

    <div className="w-[90%] max-w-[600px] flex absolute flex-col justify-center items-center h-auto sm:h-[600px] bg-black/10 rounded-lg sm:rounded-full p-10 shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-[30px]">
      <img className="mx-auto mt-[-20px]" src={Logo} alt="Logo Bossa" />
      <div className="w-full cursor-default max-w-[368px] h-[46px] text-white text-[32px] font-normal font-alatsi text-left">
        Login
      </div>
        <LoginInput placeholder="E-mail"></LoginInput>
        <LoginInput placeholder="Senha"></LoginInput>
      <div className="w-full max-w-[368px] mt-[10px] h-[19px] text-right text-white text-base font-normal font-alatsi underline hover:cursor-pointer hover:opacity-70">
        Esqueci minha senha!
      </div>
      <LoginButton></LoginButton>
      <div className="w-full max-w-[371px] mt-[20px] h-[1px] bg-white"></div>
      <div onClick={() => login()} className="w-full max-w-[371px] h-[38px] hover:border-[4px] hover:border-[#F8BB49] hover:cursor-pointer flex items-center justify-center bg-[#ffffff] rounded-[10px] shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)] mt-5 placeholder-gray-500 transform hover:scale-100">
        <div className="bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center mr-[10px]">
          <img src={GoogleIcon} alt="Google" />
        </div>
        <div className="text-[#000000] font-alatsi font-[500]">
          Continuar com o Google
        </div>

      </div>

    </div>
  );
};

export default LoginCard;
