import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/workspace");
  }

  return (
      <button onClick={handleLogin} className="text-black hover:text-white hover:bg-[#f8bb49] hover:cursor-pointer font-alatsi font-[500] mx-auto w-[167px] mt-[20px] h-[53px] bg-[#fffffe] rounded-[10px] shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)]">Entrar</button>
  );
}

export default LoginButton;