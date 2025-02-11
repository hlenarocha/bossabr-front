import { ReactNode, useState } from "react";
import BackgroundImage from "../assets/images/dark-background.png";
import HeaderFull from "../components/header/HeaderFull";
import SideBar from "../components/sidebar/SideBar";

interface BaseScreenProps {
  children: ReactNode;
}

const BaseScreen = (prop: BaseScreenProps) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);  

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen bg-[#333333]"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // Apenas a URL precisa ser aplicada inline
    >
      <div className="sticky top-0 z-50">
        <HeaderFull isSideBarOpen = {isSideBarOpen} toggleSideBar = {() => setIsSideBarOpen(!isSideBarOpen)}/>
      </div>

      <div className="flex flex-row p-5 overflow-hidden">
        <div className={`fixed transition-all duration-200 ease-in-out ${isSideBarOpen ? "w-[250px]" : "w-0 opacity-0"}`}>
          <SideBar />
        </div>

        <div className={`p-10  transition-all duration-500 ease-in-out ${isSideBarOpen ? "ml-[250px]" : "ml-0"}`}>{prop.children}</div>
      </div>
    </div>
  );
};

export default BaseScreen;
