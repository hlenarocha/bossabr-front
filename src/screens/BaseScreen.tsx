import React from "react";

const BaseScreen: React.FC = () => {
  return(
    <div className="h-screen flex-col w-full items-center justify-center flex bg-customGray">
      <div>
      <div className="w-full text-[32px] text-center text-white">Aqui será a tela base</div>
      <div className="w-full text-[24px] text-center text-pink-600">Teste de rotas</div>

      </div>
      

    </div>
  );
  
}

export default BaseScreen;