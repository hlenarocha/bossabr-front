import React from "react";
import Logo from "../../assets/logo-bossa.svg";

const LoginCard: React.FC = () => {
  return (
    <div className="items-center absolute justify-center w-[532px] h-[534px] bg-black/10 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-[100px]" >
      <img className="mx-auto mt-20" src={Logo} alt="Logo Bossa"/>
    </div>
  )
};

export default LoginCard;