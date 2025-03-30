import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { greetingFunction } from "@/utils/greetingFunction";

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButton = (props: LogoutButtonProps ) => {
  const greeting = greetingFunction();
  const { user } = useContext(UserContext);

  return (
    <>
    <div  onClick={props.onClick} className="sm:w-[247px] hidden w-[200px] cursor-pointer hover:bg-[#757575] sm:flex items-center justify-between flex-row bg-[#636363] px-2 sm:px-6 py-2 rounded-[400px]">
      <div className=" text-white  text-left font-bold text-[12px] sm:text-[16px]">
        {greeting}, {user?.first_name || "Usuário"}!
      </div>

      <div className="w-[37px] h-[37px] bg-[#e6e6e6] items-center justify-center rounded-full flex cursor-pointer hover:bg-[#F6BC0A] ">
        <div className="w-[27px] h-[27px] bg-[#e6e6e6] rounded-full flex items-center justify-center shadow-[10px_10px_25px_0px_rgba(0,0,0,1.00)]">
          <div>
          <i className="fa-solid fa-power-off"></i>

          </div>
        </div>
      </div>
    </div>
    
    <div onClick={props.onClick} className="w-[37px] sm:hidden h-[37px] bg-[#e6e6e6] items-center justify-center rounded-full flex cursor-pointer hover:bg-[#F6BC0A] ">
        <div className="w-[27px] h-[27px] bg-[#e6e6e6] rounded-full flex items-center justify-center shadow-[10px_10px_25px_0px_rgba(0,0,0,1.00)]">
          <div>
          <i className="fa-solid fa-power-off"></i>

          </div>
        </div>
    </div>
    </>
  );
};

export default LogoutButton;
