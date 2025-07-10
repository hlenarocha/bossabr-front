import { ReactNode, useContext } from "react";
import BackgroundImage from "@/assets/images/dark-background.png";
import HeaderFull from "@/components/header/HeaderFull";
import SideBar from "@/components/sidebar/SideBar";
import { SideBarContext } from "@/contexts/SideBarContext";

interface BaseScreenProps {
    children: ReactNode;
}

const BaseScreen = ({ children }: BaseScreenProps) => {
    const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext);

    return (
        <div
            className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen bg-[#333333]"
            style={{ backgroundImage: `url(${BackgroundImage})` }}>

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
                    <div className={`fixed top-[116px] left-0 h-[calc(100%-4rem)] w-[250px] z-20 transition-transform duration-300 ease-in-out md:hidden
                        ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
                      `}>
                        <SideBar />
                    </div>
                </div>

                <main
                    className={`
                        flex-1 transition-all duration-300 ease-in-out
                        p-5
                        md:ml-[270px]  /* 250px de largura + 20px de margem */
                      `}>
                    {children}
                </main>
            </div>

        </div>
    );
};

export default BaseScreen;
