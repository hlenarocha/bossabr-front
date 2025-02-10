import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";

const DashboardScreen = () => {
  return (
    <BaseScreen>
      <h1 className="text-4xl text-white font-bold">Dashboard</h1>
      <div className="mt-4">
      <Box
            title="Peças Produzidas"
            subtitle="Visão geral de produtividade semanal e mensal."
            width="w-[500px]"
            height="h-[378px]"
          ></Box>      
      </div>
    </BaseScreen>
  );
};

export default DashboardScreen;
