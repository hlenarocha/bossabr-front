import { ReactNode } from "react";
import BackgroundImage from "../assets/images/dark-background.png";
import HeaderFull from "../components/header/HeaderFull";
import SideBar from "../components/sidebar/SideBar";

interface BaseScreenProps {
  children: ReactNode;
}

const BaseScreen = (prop: BaseScreenProps) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen bg-[#333333]"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // Apenas a URL precisa ser aplicada inline
    >
      <div className="sticky top-0 z-50">
        <HeaderFull />
      </div>

      <div className="flex flex-row p-5 overflow-hidden">
        <div className="fixed">
          <SideBar />
        </div>

        <div className="p-10 ml-[250px]">{prop.children}</div>
      </div>
    </div>
  );
};

export default BaseScreen;
