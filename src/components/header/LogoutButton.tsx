const LogoutButton = () => {
  return (
    <div className="sm:w-[247px] cursor-pointer hover:bg-[#757575] flex items-center justify-between flex-row bg-[#636363] px-6 py-2 rounded-[400px]">
      <div className=" text-white  text-left font-bold text-[16px]">
        Bem-vindo, [user]!
      </div>

      <div className="w-[37px] h-[37px] bg-[#e6e6e6] items-center justify-center rounded-full flex cursor-pointer hover:bg-[#F6BC0A] ">
        <div className="w-[27px] h-[27px] bg-[#e6e6e6] rounded-full flex items-center justify-center shadow-[10px_10px_25px_0px_rgba(0,0,0,1.00)]">
          <div>
          <i className="fa-solid fa-power-off"></i>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutButton;
