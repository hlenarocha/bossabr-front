import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";

const DashboardScreen = () => {
  return (
    <BaseScreen>
      <PageTitle title="Dashboard"></PageTitle>
      <div className="mt-4">
        <Box
          title="Peças Produzidas"
          subtitle="Visão geral de produtividade semanal e mensal."
          width="w-[500px]"
          height="h-[378px]"
        >
          <div>TESTE</div>
        </Box>
      </div>
    </BaseScreen>
  );
};

export default DashboardScreen;
