import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";

const SettingsScreen = () => {
  const navigate = useNavigate();


  return (
    <>
      <BaseScreen>
      <PageTitle marginTop="mt-4" title="Configurações"></PageTitle>
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <Box title="Colaboradores" subtitle="Veja, altere ou exclua as informações pertinentes aos colaboradores." width="md:w-[50%]" height="h-[378px]">
            
            
            <div className="flex flex-col gap-4 items-center">
            <ColoredButton onClick={() => navigate("/settings/configure-worker")} justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR COLABORADORES"></ColoredButton>
            <ColoredButton onClick={() =>  navigate("/settings/configure-team")} justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR EQUIPES"></ColoredButton>
            <ColoredButton onClick={() =>  navigate("/settings/configure-sector")} justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR SETORES"></ColoredButton>


            </div>
          </Box>

          <Box title="Clientes" subtitle="Veja, altere ou exclua as informações pertinentes aos clientes." width="md:w-[50%]" height="h-[378px]">
            <div className="flex flex-col gap-4 items-center">
            <ColoredButton onClick={() =>  navigate("/settings/configure-client")} justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR CLIENTES"></ColoredButton>
            <ColoredButton onClick={() =>  navigate("/settings/configure-business")} justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR SETORES DE NEGÓCIO"></ColoredButton>



            </div>
          </Box>
        </div>
        <Box title="Demandas" subtitle="Veja, altere ou exclua as informações pertinentes às demandas." width="md:w-[50%]" height="h-[378px]">
            <div className="flex flex-col gap-4 items-center">
            <ColoredButton onClick={() =>  navigate("/settings/configure-task")} justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR DEMANDAS"></ColoredButton>
            <ColoredButton onClick={() =>  navigate("/settings/configure-service")} justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR TIPOS DE SERVIÇO"></ColoredButton>
            {/* <ColoredButton justify="justify-between" width="w-full" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR STATUS"></ColoredButton> */}




            </div>
          </Box>
      </BaseScreen>
    </>
  );
};

export default SettingsScreen;
