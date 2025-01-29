import BackgroundImage from "../assets/images/dark-background.png";
import Header from "../components/header/Header";

const BaseScreen = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen bg-[#333333]"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // Apenas a URL precisa ser aplicada inline
    >
      <Header></Header>

      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
        <div className="w-[628px] h-100 p-10 bg-opacity-50 bg-[#474747] shadow-[5px_5px_10px_0px_rgba(17,17,17,0.15)] rounded-[20px] ">
        <div className="text-[32px] ">Aqui será a tela base</div>
        <div className="text-[24px] text-pink-600">Teste de rotas</div>
        <div className="mt-4">
          <p>Icons para facilitar a procura dos Icons :)</p>
          <p>
            <i className="fa-solid fa-chart-line"></i> - Dashboard
          </p>
          <p>
            <i className="fa-solid fa-file-lines"></i> - Relatórios
          </p>
          <p>
            <i className="fa-solid fa-desktop"></i> - Área de Trabalho
          </p>
          <p>
            <i className="fa-solid fa-user"></i> - Clientes
          </p>
          <p>
            <i className="fa-solid fa-list-check"></i>{" "}
            <i className="fa-solid fa-bars-progress"></i> - Demandas
          </p>
          <p>
            <i className="fa-solid fa-gear"></i> - Configurações
          </p>
          <p>
            Site para encontrar mais icons (e melhores kkkk):{" "}
            <a href="https://fontawesome.com/search?ic=free" target="_blank" rel="noopener noreferrer">
              https://fontawesome.com/search?ic=free
            </a>
          </p>

        </div>
        
        </div>
        
      </div>
    </div>
  );
};

export default BaseScreen;
