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
      <HeaderFull></HeaderFull>
      <div className="p-5 flex flex-row">
        <SideBar></SideBar>
        <div>{prop.children}</div>
      </div>
    </div>
  );
};

export default BaseScreen;
