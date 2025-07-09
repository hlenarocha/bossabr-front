import { ReactNode, useContext } from "react";
import BackgroundImage from "@/assets/images/dark-background.png";
import HeaderFull from "@/components/header/HeaderFull";
import SideBar from "@/components/sidebar/SideBar";
import { SideBarContext } from "@/contexts/SideBarContext";

interface BaseScreenProps {
  children: ReactNode;
}

const BaseScreen = (prop: BaseScreenProps) => {
  // const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen bg-[#333333]"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // Apenas a URL precisa ser aplicada inline
    >
      <div className="sticky top-0 z-50">
        <HeaderFull
          isSideBarOpen={isSideBarOpen}
          toggleSideBar={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>

      <div className="flex flex-row p-5 min-h-[calc(100vh-5rem)] transition-all duration-300">
        {/* Sidebar: nunca sobrepõe o conteúdo, fica sempre ao lado */}
        {isSideBarOpen && (
          <div className="flex-shrink-0 w-[250px] mr-6 transition-all duration-300">
            <SideBar />
          </div>
        )}
        {/* Conteúdo: centralizado quando sidebar fechado */}
        <div className={`flex-1 flex transition-all duration-300 ${
            isSideBarOpen
              ? "justify-start"
              : "justify-center"
          }`}>
          <div className="p-5 w-full max-w-6xl">
            {prop.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseScreen;
