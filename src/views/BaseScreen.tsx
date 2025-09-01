import { ReactNode, useContext } from "react";
import BackgroundImage from "@/assets/images/dark-background.png";
import HeaderFull from "@/components/header/HeaderFull";
import SideBar from "@/components/sidebar/SideBar";
import { SideBarContext } from "@/contexts/SideBarContext";
import { useSession } from "@/hooks/useSession";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingScreen from "./auth/LoadingScreen";
import { UserContext } from "@/contexts/UserContext";

const RoleSwitcher = () => {
  const { switchUserRoleForTesting, user } = useContext(UserContext);

  // Se não estivermos em modo de desenvolvimento, o componente não renderiza nada.
  if (import.meta.env.MODE !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 text-white bg-zinc-900 rounded-md p-2">
      <label htmlFor="role-switcher" className="text-md mr-2 text-yellow-400">
        Cargo (Teste):
      </label>
      <select
        id="role-switcher"
        value={user?.role || ""} // Garante que o valor selecionado seja o cargo atual do usuário
        onChange={(e) => switchUserRoleForTesting(e.target.value)}
        className="p-2 bg-zinc-800 border-2 border-yellow-500 rounded-md appearance-none"
      >
        <option value="Atendente">Atendente</option>
        <option value="Administrador">Administrador</option>
        <option value="Gerente">Gerente</option>
        <option value="Designer">Designer</option>
        <option value="Social Media">Social Media</option>

        {/* Adicione outros cargos que você precisa testar */}
      </select>
    </div>
  );
};

interface BaseScreenProps {
  children: ReactNode;
}

const BaseScreen = ({ children }: BaseScreenProps) => {
  //const token = Cookies.get("auth_token");

  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext);
  // Efeito que monitora o estado de autenticação

  const { user, isSessionLoading } = useSession();

  if (isSessionLoading) {
    return <LoadingScreen />;
  }

  if (!isSessionLoading && !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen bg-[#333333]"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sticky top-0 z-50">
        <HeaderFull
          isSideBarOpen={isSideBarOpen}
          toggleSideBar={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>

      <div className="flex flex-row overflow-hidden">
        <div>
          {/* Sidebar fixo para desktop */}
          <div className="hidden md:block fixed top-[116px] left-5 h-[calc(100%-4rem)] w-[250px] z-60">
            <SideBar />
          </div>

          {/* Sidebar para tablets e menores */}
          <div
            className={`fixed top-[116px] left-0 h-[calc(100%-4rem)] w-[250px] z-20 transition-transform duration-300 ease-in-out md:hidden
                        ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
                      `}
          >
            <SideBar />
          </div>
        </div>

        <main
          className={`
                        flex-1 transition-all duration-300 ease-in-out
                        p-5
                        md:ml-[270px]  /* 250px de largura + 20px de margem */
                      `}
        >
          {children}
        </main>
        <RoleSwitcher />
      </div>
    </div>
  );
};

export default BaseScreen;
