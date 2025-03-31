import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { greetingFunction } from "@/utils/greetingFunction";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const WorkspaceScreen = () => {
  const greeting = greetingFunction();
  const { user } = useContext(UserContext); // desconstruindo objeto {}

  return (
    <>
      <BaseScreen>
        <div className="flex items-center cursor-default  mt-4 gap-4">
          <div className="w-12 h-12  flex justify-center items-center bg-white bg-opacity-50 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255, 255, 255, 0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)]">
            <img className="rounded-full w-10 h-10" src={user?.avatar}></img>
          </div>
          <p className="text-white font-bold text-xl">{user?.first_name}</p>
        </div>
        <PageTitle marginTop="mt-6" title="Área de Trabalho"></PageTitle>

        <Box
          title={`${greeting}, ${user?.first_name}!`}
          subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
          width="w-[500px] md:w-[700px] lg:w-[900px]"
          height="h-[700px]"
        >
          <div>TESTE</div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
