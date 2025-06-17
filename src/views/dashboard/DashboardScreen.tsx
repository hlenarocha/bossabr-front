import BaseScreen from "../BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { Component } from "@/components/charts/PieChart";
import { Motion } from "@/components/animation/Motion";

const DashboardScreen = () => {
  return (
    <BaseScreen>
      <PageTitle marginTop="mt-4" title="Dashboard"></PageTitle>
      <div className="mt-4">
        <Motion>
          <Box
            title="Peças Produzidas"
            subtitle="Visão geral de produtividade semanal e mensal."
            width="w-full md:w-[700px] lg:w-[900px]"
            height="h-[700px]"
          >
            <Component />
          </Box>
        </Motion>
      </div>
    </BaseScreen>
  );
};

export default DashboardScreen;
