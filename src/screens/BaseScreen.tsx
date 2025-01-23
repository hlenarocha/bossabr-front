import React from "react";

const BaseScreen: React.FC = () => {
  return(
    <div className="h-screen flex-col w-full items-center justify-center flex bg-customGray">
      <div>
      <div className="w-full text-[32px] text-center text-white">Aqui será a tela base</div>
      <div className="w-full text-[24px] text-center text-pink-600">Teste de rotas</div>
          <div>
              <p>Icons para facilitar a procura dos Icons :)</p>
              <p><i className="fa-solid fa-chart-line"></i> - Dashboard</p>
              <p><i className="fa-solid fa-file-lines"></i> - Relatórios</p>
              <p><i className="fa-solid fa-desktop"></i> - Área de Trabalho</p>
              <p><i className="fa-solid fa-user"></i> - Clientes</p>
              <p><i className="fa-solid fa-list-check"></i> <i className="fa-solid fa-bars-progress"></i> - Demandas</p>
              <p><i className="fa-solid fa-gear"></i> - Configurações</p>
              <p>Site para encontrar mais icons (e melhores kkkk): https://fontawesome.com/search?ic=free</p>
          </div>
      </div>


    </div>
  );

}

export default BaseScreen;