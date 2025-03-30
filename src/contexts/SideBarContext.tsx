import { createContext, ReactNode, useState } from "react";


// Contexto do SideBar para o usuário não precisar fechá-lo a cada página que ele entra
// O contexto permite saber se o usuário fechou anteriormente ou não
interface SideBarContextInterface {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isSideBarOpen: boolean) => void;
}

export const SideBarContext = createContext<SideBarContextInterface>({
  isSideBarOpen: true,
  setIsSideBarOpen: (isSideBarOpen: boolean) => console.log(isSideBarOpen)
})

export function SideBarProvider({ children } : { children: ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}

    </SideBarContext.Provider>
  );
}