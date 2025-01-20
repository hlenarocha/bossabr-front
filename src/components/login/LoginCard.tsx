import React from "react";
import Logo from "../../assets/images/logo-bossa.svg";
import GoogleIcon from "../../assets/images/google.png";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

const LoginCard: React.FC = () => {
  return (
    <div className="items-center absolute justify-center w-[600px] flex flex-col h-[600px] bg-black/10 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-[100px]" >
      <img className="mx-auto mt-[-20px]" src={Logo} alt="Logo Bossa"/>
      <div className="w-[368px] h-[46px] text-white text-[32px] font-normal font-alatsi " >Login</div>
      <LoginInput placeholder="E-mail"></LoginInput>
      <LoginInput placeholder="Senha"></LoginInput>
      <div className="w-[368px] mt-[10px] h-[19px] text-right text-white text-base font-normal font-alatsi underline hover:cursor-pointer hover:opacity-70">Esqueci minha senha!</div>
      <LoginButton></LoginButton>
      <div className="w-[371px] mt-[20px] h-[1px] bg-white"></div>
      <div className="w-[371px] h-[38px] hover:border-[2px] hover:border-[#F23768] hover:cursor-pointer flex flex-row items-center bg-[#ffffff] rounded-[10px] shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)] mt-5 placeholder-gray-500 transform hover:scale-100">
        <div className="bg-white w-[30px] mr-[10px] ml-[10px] flex h-[30px] rounded-full items-center justify-center">
        <img src={GoogleIcon}></img>

        </div>
        <div className="text-[#000000]  font-alatsi mr-[10px] font-semibold">Continuar com o Google</div>
      </div>
    </div>
  )
};

export default LoginCard;